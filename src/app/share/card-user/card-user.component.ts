import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AvatarModule } from 'primeng/avatar'
@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [
    AvatarModule
  ],
  template: `
  <div class="p-fluid p-formgrid grid">
    <div class="field col-12 text-center">
      <h2>{{name}} ({{position}})</h2>
    </div>
    <div class="field col-12 flex justify-content-center align-items-center">
      <p-avatar
        class="p-avatar-xl-custom"
        shape="circle"
        image="../../../assets/imgs/{{imagePath}}"/>
    </div>
    <div class="field col-12 flex justify-content-center align-items-center my-1">
      <i class="pi pi-phone" style="font-size: 1.5rem;"></i>
      <label class="ml-2">{{phone}}</label>
    </div>
    <div class="field col-12 flex justify-content-center align-items-center my-1">
      <i class="pi pi-at" style="font-size: 1.5rem;"></i>
      <label class="ml-2">{{mail}}</label>
    </div>
  </div>
  `,
  styles: [`
  .p-avatar-xl-custom > * {
    cursor: pointer;
    width: 8rem !important;
    height: 8rem !important;
    font-size: 5rem !important;
  }  
  `],
  encapsulation: ViewEncapsulation.None,
})
export class CardUserComponent {

  @Input() name: string = '';
  @Input() imagePath: string = '';
  @Input() phone: string = '';
  @Input() mail: string = '';
  @Input() position: string = '';
}
