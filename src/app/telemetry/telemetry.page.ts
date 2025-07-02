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
    standalone: false
})
export class TelemetryPage implements OnInit {


  public imTelemetry: any[] = [];
  public idScenario: number = 0;
  public heartRate: any;
  public bodyTemperature: any;
  public bloodPressure: any;
  public respiratoryRate: number = 0;
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
    }); 
  }

  ngOnInit() {}

  /*callImTelemetry(){
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
  }*/

    callImTelemetry() {
  const simulatedResponse = [
    {
      "id": 0,
      "name": "HeartRate",
      "description": "Heart rate measurement",
      "telemetry": {
        "id": 0,
        "frecuency": 1,
        "schema": 1,
        "unit": 1,
        "name": "HeartRate",
        "type": 1
      },
      "teleValues": [
        {
          "id": 0,
          "timeStamp": "2025-07-02T11:50:27.931Z",
          "valu": "75"
        }
      ]
    },
    {
      "id": 1,
      "name": "BodyTemperature",
      "description": "Body temperature measurement",
      "telemetry": {
        "id": 1,
        "frecuency": 1,
        "schema": 1,
        "unit": 1,
        "name": "BodyTemperature",
        "type": 1
      },
      "teleValues": [
        {
          "id": 1,
          "timeStamp": "2025-07-02T11:50:27.931Z",
          "valu": "36.5"
        }
      ]
    },
    {
      "id": 2,
      "name": "RespiratoryRate",
      "description": "Respiratory rate measurement",
      "telemetry": {
        "id": 2,
        "frecuency": 1,
        "schema": 1,
        "unit": 1,
        "name": "RespiratoryRate",
        "type": 1
      },
      "teleValues": [
        {
          "id": 2,
          "timeStamp": "2025-07-02T11:50:27.931Z",
          "valu": "16"
        }
      ]
    },
    {
      "id": 3,
      "name": "BloodPressure",
      "description": "Blood pressure measurement",
      "telemetry": {
        "id": 3,
        "frecuency": 1,
        "schema": 1,
        "unit": 1,
        "name": "BloodPressure",
        "type": 1
      },
      "teleValues": [
        {
          "id": 3,
          "timeStamp": "2025-07-02T11:50:27.931Z",
          "valu": "120/80"
        }
      ]
    }
  ];

  this.imTelemetry = simulatedResponse;

  // Process telemetry data
  for (let i = 0; i < this.imTelemetry.length; i++) {
    const telemetry = this.imTelemetry[i];

    // Assign values based on the name
    if (telemetry['name'] === 'HeartRate') {
      this.heartRate = Number(telemetry.teleValues[0].valu);
      console.log('HeartRate:', this.heartRate);
    } else if (telemetry['name'] === 'BodyTemperature') {
      this.bodyTemperature = parseFloat(telemetry.teleValues[0].valu);
      console.log('BodyTemperature:', this.bodyTemperature);
    } else if (telemetry['name'] === 'RespiratoryRate') {
      this.respiratoryRate = parseFloat(telemetry.teleValues[0].valu);
      console.log('RespiratoryRate:', this.respiratoryRate);
    } else if (telemetry['name'] === 'BloodPressure') {
      this.bloodPressure = telemetry.teleValues[0].valu;
      const [systolic, diastolic] = this.bloodPressure.split('/');
      this.systolic = Number(systolic);
      this.diastolic = Number(diastolic);
      console.log('Systolic:', this.systolic);
      console.log('Diastolic:', this.diastolic);
    }
  }

  console.log('Telemetry Data:', this.imTelemetry);
}



  //chart test

}
