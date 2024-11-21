import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SearchPropertyFormComponent } from "../search-property-form/search-property-form.component";
import { ImageModule } from 'primeng/image';
import { RedirectService } from '../../share/services/redirect.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule, 
    SearchPropertyFormComponent,
    ImageModule
  ],
  template: `
  <div class="p-fluid p-formgrid grid">
    <div class="field col-9 sm:col-12 md:col-12 lg:col-9 xl:col-8">
      <div class="p-fluid p-formgrid grid" style="height: 93vh;">
        <div class="field col-12 flex justify-content-center ">
        <div class="container text-center">
          <h1 class="title text-4xl">BIENVENIDO</h1>
          <p class="subtitle">¡A nuestro sitio web de MultiCasa!</p>
          <p class="text text-lg">
              Bienvenido a nuestro sitio web. En <strong>MultiCasa</strong>, te ofrecemos una amplia gama de opciones para encontrar la casa de tus sueños. Nuestro sitio web está diseñado para ayudarte a explorar nuestras propiedades y encontrar la que mejor se adapte a tus necesidades. Aquí podrás descubrir casas, apartamentos, oficinas y mucho más.
          </p>
          <p class="text text-lg">
              Nuestro objetivo es brindarte una experiencia de búsqueda cómoda, con un diseño limpio y fácil de navegar. Puedes utilizar este sitio tanto para consultar propiedades residenciales como comerciales, y estamos siempre aquí para ayudarte a lo largo del proceso de compra o renta.
          </p>
          <h2 class="section-title">SERVICIOS DESTACADOS</h2>
          <p class="text text-lg">
              <strong>Asesoría Personalizada</strong>: Nuestro equipo de expertos está disponible para guiarte en cada paso, desde la búsqueda hasta el cierre de la compra.
          </p>
          <p class="text text-lg">
              <strong>Amplia Variedad de Propiedades</strong>: Contamos con una gran selección de propiedades en diferentes ubicaciones y precios, adaptadas a todo tipo de presupuesto.
          </p>
          <p class="text text-lg">
              <strong>Facilidad de Búsqueda</strong>: Nuestra página te permite explorar opciones de manera rápida y eficiente, con herramientas de búsqueda avanzadas.
          </p>  
          <p class="text text-lg">
              ¿Quieres saber más? <a href="buy" class="cta-link">Explora nuestras propiedades</a> y encuentra el lugar perfecto para ti y tu familia.
          </p>
        </div>
        </div>
      </div>
    </div>
    <div class="field col-3 sm:col-12 md:col-12 lg:col-3 xl:col-4 flex flex-column mt-2" 
    style="background-color: #11476b; border-radius: 10px; height: auto; padding: 1rem">
      <div class="w-full flex flex-column">
        <p-button
          label="Compra"
          styleClass="mb-2"
          icon="pi pi-money-bill"
          (onClick)="router.redirectTo('/buy')"/>
        <p-button
          label="Venta"
          styleClass="mb-2"
          icon="pi pi-dollar"
          (onClick)="router.redirectTo('/sell')"/>
        <p-button
          (onClick)="router.redirectTo('/contact')"
          label="Contactos"
          icon="pi pi-users"
          styleClass="mb-2"/>
      </div>
      <app-search-property-form/>
    </div>
  </div>
  `,
  styles: [`
  .container {
      max-width: 100%;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 2rem;
  }
  .title {
      color: #4CAF50;
  }
  .text {
      color: #333;
      line-height: 1.6;
      margin-bottom: 1rem;
  }
  .cta-button {
      color: #ffffff;
      background-color: #4CAF50;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.3s;
  }
  .cta-button:hover {
      background-color: #45a049;
  }
  `]
})
export class HomeComponent {

  constructor(public router: RedirectService){}

}
