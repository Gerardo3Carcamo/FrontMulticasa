import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ApiService } from '../../share/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import jsPDF from 'jspdf';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../share/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy',
  standalone: true,
  providers: [ApiService],
  imports: [
    HttpClientModule,
    ButtonModule,
    InputTextareaModule,
    FormsModule
  ],
  template: `
  <div class="p-fluid p-formgrid grid p-3">
    <div class="field col-4 sm:col-12 md:col-12 lg:col-4 xl:col-4">
      <p-button
        icon="pi pi-download"
        label="Reporte general"
        (onClick)="MultiPdf(houses)"/>
    </div>
  </div>
  <div class="p-fluid p-formgrid grid mb-0 p-3">
    @for (house of houses; track $index) {
      <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
        <div class="card shadow-4 relative">
          <div class="absolute top-0 right-0 mr-1 mt-1">
            <div class="flex ">
              <p-button
                (onClick)="generarReporteCasa(house)"
                icon="pi pi-download"
                size="small"
                [text]="true"/>
              @if(!house.isEditing){
                <p-button
                  (onClick)="init(house)"
                  icon="pi pi-pencil"
                  size="small"
                  [text]="true"/>
              }@else {
                <p-button
                  (onClick)="cancel(house)"
                  icon="pi pi-times"
                  size="small"
                  [text]="true"/>
              }
            </div>
          </div>
          <div class="absolute top-0 left-0 mt-2 ml-2">
            <span style="color: #c8c8c9; font-size: 0.9rem;">2024-11-01</span>
          </div>
          <div class="p-fluid p-formgrid grid">
            <div class="field col-12">
              <h2 class="text-center">{{house.ciudad}}, {{house.estado}}</h2>
            </div>
            @if (!house.isEditing) {
              <div class="field col-12">
                <label>{{house.descripcion}}</label>
              </div>
            }@else {
              <div class="field col-12">
                <textarea 
                  rows="5"
                  cols="30" 
                  pInputTextarea 
                  [(ngModel)]="house.descripcion">
                </textarea>
              </div>
            }
            <div class="field col-12 flex justify-content-between">
              <label><b>$ {{house.precio}}</b></label>
              <label>{{house.cp}}</label>
            </div>
            @if(!house.isEditing){
              <div class="field col-6 sm:col-12 md:col-12 lg:col-6 xl:col-6 my-0">
                <p-button
                  label="Ver en maps"
                  icon="pi pi-map"
                  (onClick)="openMaps(house.lat, house.lon)"/>
              </div>
              <div class="field col-6 sm:col-12 md:col-12 lg:col-6 xl:col-6 my-0">
                <p-button
                  label="Vender"
                  icon="pi pi-dollar"
                  (onClick)="vender(house)"/>
              </div>
            }@else {
              <div class="field col-12 my-0">
                <p-button
                  icon="pi pi-save"
                  label="Actualizar"
                  (onClick)="update(house)"/>
              </div>
            }
          </div>
        </div>
      </div>
    }
  </div>
  `,
  styles: ``
})
export class BuyComponent {

  constructor(private sanitizer: DomSanitizer, private api: ApiService, private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.get()
  }

  Sanitaze(lat: number, lon: number){
    const bbox = `${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}`; // Ajustar el BBox para que se vea un área alrededor del marcador
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lon}%2C${lat}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  houses: any = [];

  get(){
    this.api.GetMethod<any>('vivienda/viviendas').subscribe({
      next: response =>{
        this.houses = response;
        this.route.queryParams.subscribe((params: any) => {
          if(params.cp){
            this.houses = this.houses.filter((x: any) => x.cp.includes(params.cp));
          }
          if(params.banos){
            this.houses = this.houses.filter((x: any) => x.banos == (params.banos));
          }
          if(params.rec){
            this.houses = this.houses.filter((x: any) => x.recamaras == (params.rec));
          }
          console.log(this.houses)
        });
      },
      error: err => {

      }, complete: () =>{

      }
    });
  }
  cancel(house: any){
    house.isEditing = false;
  }
  init(house: any){
    house.isEditing = true;
  }
  update(house: any){
    this.api.put(`vivienda/update?id=${house.id}&descripcion=${house.descripcion}`, {}).subscribe({
      next: response => {
        house.isEditing = false;
      }
    })
  }
  vender(house: any){
    const params = {
      id: 0,
      house: {
        id: house.id
      },
      user: {
        id: this.auth.getUser()?.id
      }
    };
    this.api.post(`vender/new`, params).subscribe({
      next: response => {
        this.get()
      }
    })
  }
  openMaps(lat: string, lon: string){
    window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank')
  }

  MultiPdf(data: any[]){
    const doc = new jsPDF();
    data.forEach(x => {
      doc.setFontSize(18);
      doc.text('Reporte de Propiedad', 105, 10, { align: 'center' });
      doc.setFontSize(14);
      doc.text(`ID: ${x.id}`, 10, 30);
      doc.setFontSize(12);
      doc.text(`Ciudad: ${x.ciudad}, ${x.estado}`, 10, 40);
      doc.text(`Precio: $${x.precio.toLocaleString('es-MX')}`, 10, 50);
      doc.text(`Código Postal: ${x.cp}`, 10, 60);
      doc.text(`Recámaras: ${x.recamaras}`, 10, 70);
      doc.text(`Baños: ${x.banos}`, 10, 80);
      doc.text(`Vendida: ${x.vendida ? 'Sí' : 'No'}`, 10, 90);
      doc.text(`Fecha de Venta: ${x.tsSold}`, 10, 100);
      doc.text(`Coordenadas: (${x.lat}, ${x.lon})`, 10, 110);
      doc.setFontSize(14);
      doc.text('Descripción:', 10, 120);
      doc.setFontSize(12);
      const descripcion = doc.splitTextToSize(x.descripcion, 180);
      doc.text(descripcion, 10, 130);
      doc.addPage()
    });
    doc.save('ReporteCompleto.pdf');
  }

  generarReporteCasa(data: any): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Reporte de Propiedad', 105, 10, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`ID: ${data.id}`, 10, 30);
    doc.setFontSize(12);
    doc.text(`Ciudad: ${data.ciudad}, ${data.estado}`, 10, 40);
    doc.text(`Precio: $${data.precio.toLocaleString('es-MX')}`, 10, 50);
    doc.text(`Código Postal: ${data.cp}`, 10, 60);
    doc.text(`Recámaras: ${data.recamaras}`, 10, 70);
    doc.text(`Baños: ${data.banos}`, 10, 80);
    doc.text(`Vendida: ${data.vendida ? 'Sí' : 'No'}`, 10, 90);
    doc.text(`Fecha de Venta: ${data.tsSold}`, 10, 100);
    doc.text(`Coordenadas: (${data.lat}, ${data.lon})`, 10, 110);
    doc.setFontSize(14);
    doc.text('Descripción:', 10, 120);
    doc.setFontSize(12);
    const descripcion = doc.splitTextToSize(data.descripcion, 180);
    doc.text(descripcion, 10, 130);
    doc.save('reporte_propiedad.pdf');
  }

}
