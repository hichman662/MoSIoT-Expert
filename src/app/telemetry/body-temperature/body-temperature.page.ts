import { TranslateService } from '@ngx-translate/core';
/* eslint-disable max-len */
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-body-temperature',
  templateUrl: './body-temperature.page.html',
  styleUrls: ['./body-temperature.page.scss'],
})
export class BodyTemperaturePage implements OnInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  public bodyTemperature: any;
  barChart: any;
  textCelsius: string;
  label: any [] =[' 2022/5/22', '2022/5/23', '2022/5/26', '2022/5/27', '2022/6/01','2022/6/2'];
  data: any[]=[37, 37.5, 36, 37.5, 36.5, 37,5 ];
  date= new Date();
  constructor(  public router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private translateService: TranslateService
    ) { Chart.register(...registerables);
      translateService.get('BODYTEMPERATURE.celsius').subscribe(value => {
        this.textCelsius = value;
      });}

  ngOnInit() {

  }
  doRefresh(event) {
    console.log('Begin async operation');

 setTimeout(() => {
   this.bodyTemperature= this.randomNumber(35,37);
   this.data.push(this.bodyTemperature);
   this.label.push(this.date.getFullYear()+'/'+this.date.getUTCMonth()+'/'+this.date.getDate());
   this.barChart.update();
   console.log('Async operation has ended');
   event.target.complete();
 }, 4000);
}


randomNumber(min, max) {
 return Math.floor(Math.random() * (max - min )) + min;
}

  ionViewWillEnter() {
    this.bodyTemperature = this.route.snapshot.params.bodyTemperature;
    this.data.push(this.bodyTemperature);
    this.label.push(this.date.getFullYear()+'/'+this.date.getUTCMonth()+'/'+this.date.getDate());
    this.barChartMethod();
  }
   //chart test
   barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: '#' + `${this.textCelsius}`,
          data: this.data,
          backgroundColor: [
            'rgba(81, 119, 223, 1)',

          ],
          borderColor: [
            'rgba(81, 119, 223, 1)',
          ],
          borderWidth: 1
        }]
      },
     /*  options: {
        scaleShowValues: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
        }
      } */
    });
  }
}
