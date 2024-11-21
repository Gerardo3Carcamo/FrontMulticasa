import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartComponent } from "../../share/chart/chart.component";
import { CalendarModule } from 'primeng/calendar'
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../share/services/auth.service';
import { RedirectService } from '../../share/services/redirect.service';
import { ApiService } from '../../share/services/api.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [ApiService],
  imports: [
    HttpClientModule,
    ChartModule,
    ChartComponent,
    CalendarModule,
    ButtonModule,
    FormsModule
],
  template: `
  <div class="p-fluid p-formgrid grid p-3">
    <div class="field col-12 text-center">
      <h1>Dashboard</h1>
    </div>
    <div class="field col-4 sm:col-12 md:col-12 lg:col-6 xl:col-4">
      <app-chart
        chartHeight="29rem"
        title="Estado de las casas"
        [dataChart]="charts[0]"
        [isLoadingData]="isLoading"/>
    </div>
    <div class="field col-4 sm:col-12 md:col-12 lg:col-6 xl:col-4">
      <app-chart
        chartHeight="29rem"
        title="Viviendas por estado"
        [dataChart]="charts[1]"
        [isLoadingData]="isLoading"/>
    </div>
    <div class="field col-4 sm:col-12 md:col-12 lg:col-12 xl:col-4">
      <app-chart
        chartHeight="29rem"
        title="Viviendas por recamaras"
        [dataChart]="charts[2]"
        [isLoadingData]="isLoading"/>
    </div>
    <div class="field col-12">
      <app-chart
        chartHeight="29rem"
        title="Viviendas por rango de precio"
        [dataChart]="charts[3]"
        [isLoadingData]="isLoading"/>
    </div>
  </div>
  `,
  styles: ``
})
export class DashboardComponent {

  datesRange: any = undefined;
  constructor(private router: RedirectService, private api: ApiService){
    this.datesRange = [new Date(), new Date()];
    this.get();
  }

  isLoading: boolean = false;
  charts: any = [];
  get(){
    this.isLoading = true;
    this.api.GetMethod<any>('vivienda/dashboard').subscribe({
      next: response => {
        this.charts = response;
        this.isLoading = false;
      }
    })
  }

  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue('--text-color-secondary');
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: this.documentStyle.getPropertyValue('--blue-500'),
        borderColor: this.documentStyle.getPropertyValue('--blue-500'),
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: this.documentStyle.getPropertyValue('--pink-500'),
        borderColor: this.documentStyle.getPropertyValue('--pink-500'),
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

}
