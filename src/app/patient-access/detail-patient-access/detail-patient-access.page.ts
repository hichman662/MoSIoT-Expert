/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { AccessMode } from './../../models/accessMode.model';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-detail-patient-access',
  templateUrl: './detail-patient-access.page.html',
  styleUrls: ['./detail-patient-access.page.scss'],
})
export class DetailPatientAccessPage implements OnInit {


  public patientAccessName: '';
  public patientAccessDescrip: '';
  public accessMode: AccessMode;
  patientProfileId: number;
  idScenario: number;
  segmentModel = 'details';
  public allAccessMode: AccessMode []= [];
  patientAccessDetailNull = false;
  private idPassedByURL: number = null;
  patientAccessForm: FormGroup;
  idAccessMode: number;
  name = '';
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController

  ) {
    this.patientAccessForm = new FormGroup({
      idPatientProfile: new FormControl(Number, [
        Validators.required
      ])
    });
  }


  ngOnInit() {
    this.storage.get('idScenario').then((val) => {
      if(val != null){
        this.idScenario= val;
      }
    });
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.callingAccessdatil();
  }

  callingAccessdatil(){
    this.patientService.getPatientAccessById(this.idPassedByURL)
    .subscribe((res: any ) => {
      console.log(res);
      this.patientAccessDetailNull = false;
      this.patientAccessDescrip = res.Description;
      this.patientAccessName = res.Name;
       if(res.AccessMode != null){
       this.accessMode = res.AccessMode;
       this.patientAccessDetailNull = false;

    }else{
      this.patientAccessDetailNull = true;
      this.accessMode= null;
    }
    }, (err) => {
      console.log(err);
    });

    this.storage.get('idPatientProfile').then((val) => {
      if(val != null){
        this.patientProfileId= val;
        this.accessModeId();
      }
    });

  }
accessModeId() {
  this.patientService.getAccessModeByIdPatientprofile(this.patientProfileId)
    .subscribe((res: any ) => {
      this.allAccessMode = res;
    }, (err) => {
      console.log(err);
    });
  }

  onSubmit(){

    this.idAccessMode = this.patientAccessForm.get('idPatientProfile').value;
    this.patientService.assignAccessModeTemplateToPatientAccess(this.idPassedByURL, this.idAccessMode)
    .subscribe( (res: any) => {
      this.presentAlert();
        }, ( err ) => {
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The Access Profile has been assigned successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          this.callingAccessdatil();
        }
      }
      ]
    });

    await alert.present();
  }

}

