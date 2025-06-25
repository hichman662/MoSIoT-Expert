import { Router } from '@angular/router';
import { PatientAccess } from './../models/patientAccess.model';
import { PatientService } from './../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-patient-access',
  templateUrl: './patient-access.page.html',
  styleUrls: ['./patient-access.page.scss'],
})
export class PatientAccessPage implements OnInit {
  public idScenario: number;
  public patientAccess: PatientAccess[] = [];
  public patientAccessNull = false;
  public patientNull = false;
  public patientProfileNull = false;
  public idPatient: number;
  public idPatientProfile: number;


  constructor(
    private patientService: PatientService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }


  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.idPatient = await this.storage.get('idPatient');
    if(this.idPatient == null){
      this.patientNull = true;
    }else{
      this.patientNull = false;
    }
    this.idPatientProfile = await this.storage.get('idPatientProfile');
    if(this.idPatientProfile == null){
      this.patientProfileNull = true;
    }else{
      this.patientProfileNull = false;
    }
   console.log('I´m carrying Patient Id', this.idPatient);
   console.log('Patient not existe', this.patientNull);
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callPatientAccess();
      }
    });

  }

  callPatientAccess(){
    this.patientService.getPatientAccessByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res != null){
        this.patientAccess = res;
        this.patientAccessNull = false;
      }else{
        this.patientAccess = null;
        this.patientAccessNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deletePatientAccess(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Patient Access',
      message: `Are you sure you want remove ${name}?`,
      buttons: [  {
        text: 'Cancel',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.patientService.deletePatientAccess(id)
          // tslint:disable-next-line: deprecation
          .subscribe( (res: any) => {
            this.ionViewWillEnter();
          }, ( err) => {
              console.log(err);
          });
        }
      }]
    });

    await alert.present();

  }

}
