import { TranslateService } from '@ngx-translate/core';
/* eslint-disable max-len */
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.page.html',
  styleUrls: ['./blood-pressure.page.scss'],
})
export class BloodPressurePage implements OnInit {

  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  public systolic: any;
  public diastolic: any;
  lineChart: any;
  textSystolic: string;
  textDiastolic: string;
  label: any [] =[ '2022/5/22', '2022/5/23', '2022/5/26', '2022/5/27', '2022/6/1','2022/6/2'];
  public syst: any[]=[115, 118, 121, 119, 125, 111];
  public dias: any[]=[ 65, 78, 68, 75, 78, 69];
  date= new Date();

  constructor(  public router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private translateService: TranslateService) {
      Chart.register(...registerables);
      translateService.get('BLOODPRESSURE.systolic').subscribe(value => {
        this.textSystolic = value;
      });
      translateService.get('BLOODPRESSURE.diastolic').subscribe(value => {
        this.textDiastolic = value;
      });
    }

  ngOnInit() {

  }

  doRefresh(event) {
    console.log('Begin async operation');

 setTimeout(() => {
   this.systolic= this.randomNumber(112,120);
   this.diastolic= this.randomNumber(60,80);
   this.syst.push(this.systolic);
   this.dias.push(this.diastolic);
   this.label.push(this.date.getFullYear()+'/'+this.date.getUTCMonth()+'/'+this.date.getDate());
   this.lineChart.update();
   console.log('Async operation has ended');
   event.target.complete();
 }, 4000);
}

randomNumber(min, max) {
 return Math.floor(Math.random() * (max - min )) + min;
}

ionViewWillEnter() {
    this.systolic = this.route.snapshot.params.systolic;
    this.diastolic = this.route.snapshot.params.diastolic;
    this.syst.push(this.systolic);
    this.dias.push(this.diastolic);
    this.label.push(this.date.getFullYear()+'/'+this.date.getUTCMonth()+'/'+this.date.getDate());
    this.lineChartMethod();
}

   //chart test
   lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.label,
        datasets: [
          {
            label: `${this.textSystolic}`,
            fill: false,
            backgroundColor: 'rgb(255,0,0)',
            borderColor: 'rgb(255,0,0)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255,0,0,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255,0,0,1)',
            pointHoverBorderColor: 'rgba(255,0,0,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.syst,
            spanGaps: false,
          },
          {
            label: `${this.textDiastolic}`,
            fill: false,
            backgroundColor: 'rgb(0,128,128)',
            borderColor: 'rgb(0,128,128)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(0,128,128,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0,128,128,1)',
            pointHoverBorderColor: 'rgba(0,128,128,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.dias,
            spanGaps: false,
          }
        ]
      }
    });
  }
}
