/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/dot-notation */

import { DeviceService } from './../services/device.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.page.html',
  styleUrls: ['./telemetry.page.scss'],
})
export class TelemetryPage implements OnInit {


  public imTelemetry: any[] = [];
  public idScenario: number;
  public heartRate: any;
  public bodyTemperature: any;
  public bloodPressure: any;
  public respiratoryRate: number;
  public systolic: any;
  public diastolic: any;
  arraySystolic: number[]=[];
  arrayDistolic: number[]=[];

  constructor(
    private deviceService: DeviceService,
    public router: Router,
    private storage: Storage

  ) { }

  ionViewWillEnter() {
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callImTelemetry();
      }
    }); this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callImTelemetry();
      }
    });
  }

  ngOnInit() {}

  callImTelemetry(){
    this.deviceService.getImTelemetryByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
        this.imTelemetry = res;
        console.log(this.imTelemetry[0].TeleValues[0].Valu);
        for (let i = 0; i <= res.length;i++){

          if(this.imTelemetry[i]?.['Name'] === 'HeartRate'){
              this.heartRate = Number(this.imTelemetry[i].TeleValues[0].Valu);
              console.log('heartRate: ', this.heartRate);

          }else if(this.imTelemetry[i]?.['Name'] === 'BodyTemperature'){

            this.bodyTemperature = parseFloat(this.imTelemetry[i].TeleValues[0].Valu);
            console.log('bodyTemperature: ', this.bodyTemperature);

          }else if(this.imTelemetry[i]?.['Name'] === 'RespiratoryRate'){

            this.respiratoryRate = parseFloat(this.imTelemetry[i].TeleValues[0].Valu);
            console.log('respiratoryRate: ', this.respiratoryRate);

          }else if(this.imTelemetry[i]?.['Name'] === 'BloodPressure'){

            this.bloodPressure = this.imTelemetry[i].TeleValues[0].Valu;
            this.systolic = Number(this.bloodPressure.split(',')[2].split(':')[1]);
            this.diastolic = Number(this.bloodPressure.split(',')[3].split(':')[1].slice(0,-1));

            console.log(this.systolic);
            console.log(this.diastolic);
          }
        }
        console.log(this.imTelemetry);
    }, ( err) => {
        console.log(err);
    });
  }


  //chart test

}
