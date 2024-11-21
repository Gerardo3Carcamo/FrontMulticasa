import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'
import { PasswordModule } from 'primeng/password'
import { CheckboxModule } from 'primeng/checkbox'
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../share/services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RedirectService } from '../../share/services/redirect.service';
import { AuthService, user } from '../../share/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [MessageService, ApiService],
  imports: [
    HttpClientModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule
  ],
  template: `
  <p-toast />
    <div
      class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <div class="flex flex-column align-items-center justify-content-center">
        <div
          style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);">
          <div
            class="w-full surface-card py-8 px-5 sm:px-8"
            style="border-radius:53px">
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-0">
                Bienvenido a
              </div>
              <div class="text-900 text-3xl font-medium mb-3">
                Bienes Raices Multicasa
              </div>
              <span class="text-600 font-medium">Inicie sesión para continuar</span>
            </div>
            <div>
              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <label for="user" class="block text-900 text-xl font-medium mb-2">Nombre de usuario</label>
                <input
                  formControlName="user"
                  id="email1"
                  type="text"
                  placeholder="UserAdmin1"
                  pInputText
                  class="w-full md:w-30rem mb-5"
                  style="padding:1rem" />
                <label
                  for="password"
                  class="block text-900 font-medium text-xl mb-2"
                  >Contraseña</label
                >
                <p-password
                  id="password"
                  formControlName="password"
                  placeholder="********"
                  [toggleMask]="true"
                  styleClass="mb-5"
                  inputStyleClass="w-full p-3 md:w-30rem"
                  [feedback]="false"></p-password>
                <div class="flex align-items-center justify-content-between mb-5 gap-5">
                </div>
                <p-button
                  label="Iniciar sesión"
                  icon="pi pi-sign-in"
                  styleClass="w-full p-3 text-xl"
                  type="submit"
                  [loading]="isLoading"
                  [disabled]="!loginForm.valid"></p-button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private api: ApiService, 
    private router: RedirectService, private auth: AuthService) {
    this.loginForm = fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, [Validators.required]]
    });
    this.onSubmit();
  }

  isLoading: boolean = false;
  loginForm: FormGroup;

  onSubmit() {
    this.api.GetMethod<user>(`users/login?username=${this.loginForm.get('user')?.value}&password=${this.loginForm.get('password')?.value}`).subscribe({
      next: value =>{
        console.log(value)
        this.auth.setUser(value);
        console.log(this.auth.getUser())
        this.router.redirectTo('/dashboard')
      },
      error: err =>{

      },
      complete: () =>{

      }
    })
  }

}
