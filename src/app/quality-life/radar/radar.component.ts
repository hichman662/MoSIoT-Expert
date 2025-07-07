import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-radar',
  standalone: true,
  imports: [NgChartsModule, IonicModule],
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnChanges {
  @Input() initialValues: number[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: [
      ['Physical', 'Well-being'],
      ['Interpersonal', 'Relationships'],
      ['Emotional', 'Well-being'],
      ['Material', 'Well-being'],
      ['Personal', 'Development'],
      ['Self-', 'Determination'],
      ['Social', 'Inclusion'],
      ['Rights']
    ],
    datasets: [
      {
        label: 'Initial Values',
        data: [],
        fill: true,
        backgroundColor: 'rgba(0, 60, 136, 0.4)',
        borderColor: 'rgba(0, 60, 136, 0.4)',
        pointBackgroundColor: 'rgba(0, 60, 136, 1)'
      },
      {
        label: 'Patient Value Improvement',
        data: [0.64, 0.75, 0.54, 0.43, 0.45, 0.66, 0.26, 0.53],
        fill: true,
        backgroundColor: 'rgba(173, 216, 230, 0.6)',
        borderColor: 'rgba(173, 216, 230, 1)',
        pointBackgroundColor: 'rgba(173, 216, 230, 1)'
      }
    ]
  };

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 1,
        ticks: {
          stepSize: 0.1,
          display: true,
          font: {
            size: 8
          }
        },
        pointLabels: {
          font: {
            size: 8
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValues'] && Array.isArray(this.initialValues)) {
      this.radarChartData.datasets[0].data = [...this.initialValues];

      
      if (this.chart) {
        this.chart.update();
      }
    }
  }
}
