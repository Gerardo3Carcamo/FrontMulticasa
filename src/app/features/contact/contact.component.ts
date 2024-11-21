import { Component } from '@angular/core';
import { CardUserComponent } from '../../share/card-user/card-user.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CardUserComponent
  ],
  template: `
  <div class="p-fluid p-formgrid grid p-3">
    @for (user of users; track $index) {
      <div class="field col-3 sm:col-12 md:col-6 lg:col-6 xl:col-3">
        <div class="card shadow-4">
          <app-card-user
            [mail]="user.mail"
            [name]="user.name"
            [phone]="user.phone"
            [position]="user.position"
            [imagePath]="user.imagePath"/>
        </div>
      </div>
    }
  </div>
  `,
  styles: ``
})
export class ContactComponent {

  users = [
    {
      name: 'Nahomi Tovar',
      position: 'Gerente',
      imagePath: 'NahomiTarea.jpeg',
      phone: '8441563547',
      mail: 'nahomi.tovar@multicasa.com'
    },
    {
      name: 'Danna Vigil',
      position: 'Supervisora',
      imagePath: 'DannaTarea.jpg',
      phone: '8445986324',
      mail: 'dannna.vigil@multicasa.com'
    },
    {
      name: 'Ramiro Hernandez',
      position: 'Supervisor',
      imagePath: 'RamiroTarea.jpg',
      phone: '8449566324',
      mail: 'ramiro.hernandez@multicasa.com'
    },
    {
      name: 'Alejandra López',
      position: 'Gerente de Ventas',
      imagePath: 'XimenaTarea.jpg',
      phone: '8441234567',
      mail: 'alejandra.lopez@multicasa.com'
    },
    {
      name: 'Carlos Pérez',
      position: 'Analista de Datos',
      imagePath: 'JavierTarea.jpg',
      phone: '8447654321',
      mail: 'carlos.perez@multicasa.com'
    },
    {
      name: 'Martha Jiménez',
      position: 'Asistente Administrativo',
      imagePath: 'LilianaTarea.jpg',
      phone: '8449876543',
      mail: 'martha.jimenez@multicasa.com'
    },
    {
      name: 'Luis García',
      position: 'Ingeniero de Proyectos',
      imagePath: 'MiguelTarea.jpg',
      phone: '8448765432',
      mail: 'luis.garcia@multicasa.com'
    },
    {
      name: 'Sofía Martínez',
      position: 'Coordinadora de Marketing',
      imagePath: 'MariaTarea.jpg',
      phone: '8442345678',
      mail: 'sofia.martinez@multicasa.com'
    }
  ]

}
