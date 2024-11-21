import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ApiService } from '../../share/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sell',
  standalone: true,
  providers: [ApiService],
  imports: [
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule
  ],
  template: `
  <div class="p-fluid p-formgrid grid p-3">
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Código Postal</label>
      <input type="text" pInputText [(ngModel)]="cp" />
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Ciudad</label>
      <input type="text" pInputText [(ngModel)]="ciudad" />
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Estado</label>
      <input type="text" pInputText [(ngModel)]="estado" />
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Recamaras</label>
      <p-inputNumber 
        [(ngModel)]="recamaras"
        [showButtons]="true" 
        inputId="minmax-buttons" 
        [min]="0" 
        [max]="100" /> 
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
    <label>Baños</label>
      <p-inputNumber 
        [(ngModel)]="banos"
        [showButtons]="true" 
        inputId="minmax-buttons" 
        [min]="0" 
        [max]="100" /> 
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Precio</label>
      <p-inputNumber 
        [(ngModel)]="precio" 
        inputId="currency-us" 
        mode="currency" 
        currency="USD" 
        locale="en-US" /> 
    </div>
    <div class="field col-12">
      <label>Descripción</label>
      <textarea 
        rows="5"
        cols="30" 
        pInputTextarea 
        [(ngModel)]="desc">
      </textarea>
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Latitud</label>
      <input type="text" pInputText [(ngModel)]="lat" />
    </div>
    <div class="field col-4 sm:col-12 md:col-6 lg:col-4 xl:col-4">
      <label>Latitud</label>
      <input type="text" pInputText [(ngModel)]="lon" />
    </div>
    <div class="field col-12">
      <p-button
        label="Guardar propiedad"
        icon="pi pi-save"
        severity="success"
        (onClick)="save()"/>
    </div>
  </div>
  `,
  styles: ``
})
export class SellComponent {

  constructor(private api: ApiService){}
  
  cp: string = '';
  precio: number = 0;
  ciudad: string = '';
  estado: string = '';
  recamaras: number = 1;
  banos: number = 1;
  lat: string = '';
  lon: string = '';
  desc: string = '';

  save(){
    const body = {
      id: 0,
      cp: this.cp,
      precio: this.precio,
      ciudad: this.ciudad,
      estado: this.estado,
      recamaras: this.recamaras,
      banos: this.banos,
      vendida: false,
      tsSold: new Date().toISOString().split('T')[0],
      lat: this.lat,
      lon: this.lon,
      descripcion: this.desc
    };
    this.api.post<any>('vivienda/new', body).subscribe({
      next: response => {
        
      },
      error: err => {

      },
      complete: () => {

      }
    })
  }

}
