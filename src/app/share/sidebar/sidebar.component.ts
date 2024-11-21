import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { faComputer, faHouse, faLock, faRightFromBracket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule, 
    FontAwesomeModule
  ],
  template: `
  <p-sidebar styleClass="w-30rem" position="right" [(visible)]="_visible" (onHide)="hide(false)">
    <ng-template pTemplate="header">
        <div style="display: flex; align-items: center;" >
            <fa-icon [icon]="_appIcon" style="font-size: 4rem;"></fa-icon>
            <h1 class="text-center ml-2 pl-0">{{_appTitle}}</h1>
        </div>
    </ng-template>
    <ul class="menu">
        @for(item of _items; track $index){
          <li>
              @if(hasPermissions(item)){
                <div style="border-radius: 10px; overflow-y: hidden; align-content: center; 
                width: 100%; max-width: 100%; max-height: 3.8rem;" 
                class="container" (click)="redirect(item.Url)">
                    <span [class]="_hoverEffect === true ? 'hover-effect' : 'span'" style="width: 100%;">
                        <fa-icon [icon]="item.Icon"></fa-icon>
                        <li style="padding-left: .5rem;">{{item.Title}}</li>
                    </span>
                </div>
              }@else {
                <div style="border-radius: 10px; overflow-y: hidden; align-content: center; 
                width: 100%; max-width: 100%; max-height: 3.8rem;" 
                pTooltip="No cuenta con los permisos suficientes para ver este apartado, favor de solicitarlos al administrador del sistema"
                class="container hover-effect-disabled">
                    <span  style="width: 100%;">
                        <fa-icon [icon]="item.Icon"></fa-icon>
                        <li style="padding-left: .5rem;">{{item.Title}}</li>
                        
                    </span>
                    <div class="justify-content-end">
                        <fa-icon style="color: #f44336; font-size: 1.1rem" class="pl-2" [icon]="lock"></fa-icon>
                    </div>
                </div>
              }
              
          </li>
        }
        <li>
            <div style="border-radius: 10px; overflow-y: hidden; align-content: center; 
            width: 100%; max-width: 100%; max-height: 3.8rem;" 
            class="container" (click)="logout()">
                <span class="hover-effect-logout" style="width: 100%;">
                    <fa-icon [icon]="logoutIcon"></fa-icon>
                    <li style="padding-left: .5rem;">Cerrar sesión</li>
                </span>
            </div>
            
        </li>
    </ul>
  </p-sidebar>
  `,
  styles: [`
    ul {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    list-style: none;
    padding: 0;
}
.menu div {
    display: flex;
    align-items: center;
    cursor: pointer;
    overflow-x: hidden;
}
.container span {
    display: flex;
    align-items: center;
    overflow-x: hidden;
    font-size: 1.4rem;
}
fa-icon {
    margin-right: 0.5rem;
    font-size: 1.4rem;
}
.container span fa-icon {
    margin-right: 0.2rem;
}
.container span li {
    padding-left: 0.5rem;
}

.hover-effect::before {
    background: red;
    content: "";
    inset: 0;
    position: absolute;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.5s ease-in-out;
    z-index: -1;
}
.hover-effect:hover::before {
    transform: scaleY(1);
    transform-origin: top;
    color: var(--primary-color-text);
}
.hover-effect:hover {
    color: var(--primary-color-text);
    transition: color 0.3s ease-in-out;
    transform-origin: top;
}
.hover-effect {
    position: relative;
    text-decoration: none;
    cursor: pointer;
    padding: 1.5rem;
    width: 100%;
    transition: color 0.4s ease-in-out;
    transform-origin: left;
    color: var(--text-color);
}

.hover-effect-disabled::before {
    background: #c8c8c9;
    content: "";
    inset: 0;
    position: absolute;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.5s ease-in-out;
    z-index: -1;
}
.hover-effect-disabled:hover::before {
    transform: scaleY(1);
    transform-origin: top;
    color: black;
}
.hover-effect-disabled:hover {
    color: black;
    transition: color 0.3s ease-in-out;
    transform-origin: top;
}
.hover-effect-disabled {
    position: relative;
    text-decoration: none;
    cursor: pointer;
    padding: 1.5rem;
    width: 100%;
    transition: color 0.4s ease-in-out;
    transform-origin: left;
}
.span {
    position: relative;
    text-decoration: none;
    cursor: pointer;
    padding: 1.5rem;
    width: 100%;
}

.hover-effect-logout::before {
    background: #dc2626;
    content: "";
    inset: 0;
    position: absolute;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.5s ease-in-out;
    z-index: -1;
}
.hover-effect-logout:hover::before {
    transform: scaleY(1);
    transform-origin: top;
    color: #dc2626;
}
.hover-effect-logout:hover {
    color: var(--primary-color-text);
    transition: color 0.3s ease-in-out;
    transform-origin: top;
}
.hover-effect-logout {
    position: relative;
    text-decoration: none;
    cursor: pointer;
    padding: 1.5rem;
    width: 100%;
    transition: color 0.4s ease-in-out;
    transform-origin: left;
    color: var(--text-color);
  }`],
})
export class SidebarComponent {
  constructor(private router: Router, private auth: AuthService) {}

  lock = faLock;
  logoutIcon = faRightFromBracket;
  
  protected _hoverEffect: boolean = false;
  @Input() set hoverEffect(flag: boolean) {
    this._hoverEffect = flag;
  }
  protected _appTitle: string = 'Menú';
  @Input() set appTitle(title: string) {
    this._appTitle = title;
  }
  protected _appIcon: any = faHouse;
  @Input() set appIcon(icon: any) {
    this._appIcon = icon;
  } 
  protected _visible: boolean = false;
  @Input() set visible(v: boolean) {
    this._visible = v;
  }
  protected _items: MenuItem[] = [];
  @Input() set items(i: MenuItem[]) {
    this._items = i;
  } 
  @Output() hideMenu = new EventEmitter<boolean>();
  hide(flag: boolean) {
    this.hideMenu.emit(flag);
  } 
  redirect(url: string) {
    const navigationDetails: string[] = [url];
    this.router.navigate(navigationDetails);
  } 
  hasPermissions(item: any) {
    try {
      return item.Role.includes(item.UserMainRole);
    } catch (exception) {
      return true;
    }
  }
  logout() {
    this.auth.removeUser();
  }
}
export interface MenuItem {
  Url: string;
  Icon: IconDefinition;
  Title: string;
  Role?: number[];
  UserMainRole?: number;
}