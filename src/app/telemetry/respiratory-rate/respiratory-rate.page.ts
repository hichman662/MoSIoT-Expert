import { TranslateService } from '@ngx-translate/core';
/* eslint-disable max-len */
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-respiratory-rate',
  templateUrl: './respiratory-rate.page.html',
  styleUrls: ['./respiratory-rate.page.scss'],
})
export class RespiratoryRatePage implements OnInit {

  @ViewChild('barCanvas') private barCanvas: ElementRef;

  public respiratoryRate: any;
  barChart: any;
  label: any [] =['2022/5/22', '2022/5/23', '2022/5/26', '2022/5/27', '2022/6/1','2022/6/2'];
  data: any[]=[15, 24, 18, 22, 17, 27];
  date= new Date();
  textPerMinute: string;
  constructor(  public router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private translateService: TranslateService
    ) { Chart.register(...registerables);
      translateService.get('RESPIRATORYRATE.perMinute').subscribe(value => {
        this.textPerMinute = value;
      });}

  ngOnInit() {

  }
  doRefresh(event) {
       console.log('Begin async operation');

    setTimeout(() => {
      this.respiratoryRate= this.randomNumber(15,30);
      this.data.push(this.respiratoryRate);
      this.label.push(this.date.getFullYear()+'/'+this.date.getUTCMonth()+'/'+this.date.getDate());
      this.barChart.update();
      console.log('Async operation has ended');
      event.target.complete();
    }, 4000);
  }
  ionViewWillEnter() {
    this.respiratoryRate = this.route.snapshot.params.respiratoryRate;
    this.data.push(this.respiratoryRate);
    this.label.push(this.date.getFullYear()+'/'+this.date.getUTCMonth()+'/'+this.date.getDate());
    this.barChartMethod();
    console.log(this.date);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min )) + min;
  }

   //chart test
   barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: `${this.textPerMinute}`,
          data: this.data,
          backgroundColor: [
            'rgba(86, 196, 69, 1)',

          ],
          borderColor: [
            'rgba(86, 196, 69, 1)',
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
