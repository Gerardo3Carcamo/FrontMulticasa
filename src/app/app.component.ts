import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button'
import { MenuItem, SidebarComponent } from "./share/sidebar/sidebar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAddressBook, faBars, faChartBar, faClipboard, faHouse, faIndustry, faScrewdriver, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, SidebarComponent, FontAwesomeModule],
  template: `  
    <app-sidebar 
      [visible]="showMenu" 
      (hideMenu)="hide($event)" 
      style="z-index: 9999;"
      [items]="items"/>
    <div class="layout-config-button" style="z-index: 1000;" (click)="show()" pTooltip="Abrir menú">
      <fa-icon style="font-size: 1.2rem;" [icon]="bars"></fa-icon>
    </div>
    <div class="topbar flex align-items-center justify-content-between"  >
      <label style="color: white; font-size: 2rem; width: auto;">Bienes Raices Multicasa</label>
      <div class="flex align-items-center">
        <i class="pi pi-mobile mr-2" style="color: white; font-size: 2rem"></i>
        <label style="color: white;">Llama al: 844xxxxxxx</label>
      </div>
    </div>
    <div style="margin-top: 5.5rem;">
      <router-outlet/>
    </div> 
  `,
  styles: [`
    .topbar{
      position: fixed; 
      z-index: 1; 
      left: 0; 
      top: 0; 
      width: 100%;
      height: 5rem; 
      background-color: #11476b;
      padding: 0 2rem;
    }  
  `],
})
export class AppComponent {
  bars = faBars;
  showMenu: boolean = false;
  show() {
    this.showMenu = true;
  } 
  hide(event: any) {
    this.showMenu = event;
  }
  items: MenuItem[] = [
    {
      Icon: faHouse,
      Title: 'Inicio',
      Url: '',
    },
    {
      Icon: faIndustry,
      Title: 'Compañia',
      Url: ''
    },
    {
      Icon: faScrewdriverWrench,
      Title: 'Servicios',
      Url: '' 
    },
    {
      Icon: faChartBar,
      Title: 'Dashboard',
      Url: 'dashboard'
    },
    {
      Icon: faClipboard,
      Title: 'Requisitos',
      Url: ''
    },
    {
      Icon: faAddressBook,
      Title: 'Contactos',
      Url: ''
    }
  ]
  title = 'multicasa';
}
