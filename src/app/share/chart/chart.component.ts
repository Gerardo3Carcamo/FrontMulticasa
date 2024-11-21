import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    ChartModule,
    ButtonModule,
    TooltipModule,
    ProgressSpinnerModule
  ],
  template: `
    <div class="p-fluid p-formgrid grid mt-0">
      <div class="field col-12 p-2">
        @if (dataChart !== undefined || this.dataChart?.labels.length > 0) {
          <div class="card shadow-4 w-full relative">
            @if (isLoadingData) {
              <div class="flex flex-column w-full justify-content-center align-items-center">
                <p-progressSpinner 
                  styleClass="w-4rem h-4rem" 
                  strokeWidth="8" 
                  fill="var(--surface-ground)" 
                  animationDuration=".5s" />
                <h2>Cargando...</h2>
              </div>
            }@else {
              <div class="absolute top-0 right-0 mr-1 mt-1"
                  pTooltip="Descargar excel"
                  tooltipPosition="top">
                <p-button
                  (onClick)="generatePdfReport()"
                  size="small"
                  [text]="true"
                  icon="pi pi-download"/>
              </div>
              <h1 class="mt-0 text-center mb-1">{{title}}</h1>
              <p-chart
                [type]="chartType"
                [data]="dataChart"
                [height]="chartHeight"/>
            }
          </div>
        }@else {
          <div class="card w-full">
            <h1 class="text-center">No se encontró información para esta grafica</h1>
          </div>
        }
      </div>
    </div>
  `,
  styles: ``
})
export class ChartComponent {

  @Input() isLoadingData: boolean = false;
  @Input() title: string = '';
  @Input() dataChart: any = undefined;
  @Input() chartType: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined = 'bar';
  @Input() chartHeight: string = '20rem';

  generatePdfReport() {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Reporte de Datos', 14, 15);
    const dataLabels = this.dataChart.labels;
    const datasets = this.dataChart.datasets;
    const tableData = dataLabels.map((label: any, index: string | number) => {
      const row: any[] = [label];
      datasets.forEach((dataset: { data: { [x: string]: any; }; }) => {
        row.push(dataset.data[index]);
      });
      return row;
    });
    const tableHeaders = ['Mes'].concat(datasets.map((dataset: { label: any; }) => dataset.label));
    autoTable(pdf, {
      head: [tableHeaders],
      body: tableData,
      startY: 25,
    });
    pdf.save('reporte.pdf');
  }
}
