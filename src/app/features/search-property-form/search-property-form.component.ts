import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown'
import { RedirectService } from '../../share/services/redirect.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-property-form',
  standalone: true,
  imports: [
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule
  ],
  template: `
  <div class="p-fluid p-formgrid grid">
    <div class="field col-12 mt-2">
      <h3 class="text-center">Encuentra tu futura propiedad</h3>
    </div>
    <div class="field col-12">
      <label>Buscar por Codigo Postal</label>
      <input type="text" pInputText [(ngModel)]="cp" />
    </div>
    <div class="field col-12">
      <label>Recamaras</label>
      <input type="number" pInputText [(ngModel)]="rec" />
    </div>
    <div class="field col-12">
      <label>Baños</label>
      <input type="number" pInputText [(ngModel)]="rec" />
    </div>
    <div class="field col-12 mb-0">
      <p-button
        label="Buscar"
        icon="pi pi-search"
        (onClick)="router.redirectToWithParams('/buy', { cp: cp, banos: banos, rec: rec })"
        [disabled]="!cp && !banos && !rec"/>
    </div>
  </div>
  `,
  styles: [`
  label{
    color: white !important;
  }  
  h3{
    color: white !important;
  }
  `]
})
export class SearchPropertyFormComponent {
cp: any;
banos: any;
rec: any;

  constructor(public router: RedirectService){}

}
