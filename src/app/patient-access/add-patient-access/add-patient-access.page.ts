import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { PatientAccess } from './../../models/patientAccess.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AccessMode } from './../../models/accessMode.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-patient-access',
  templateUrl: './add-patient-access.page.html',
  styleUrls: ['./add-patient-access.page.scss'],
})
export class AddPatientAccessPage implements OnInit {

  patientProfileId: number;
  patientAccessForm: FormGroup;
  patientAccessProfileForm: FormGroup;
  name = '';
  patientAccess: PatientAccess;
  public idScenario: any;
  public allAccessMode: AccessMode []= [];
  idAccessMode: number;
  accessModeAddDone = false;
  accessModeProfileAddDone = false;
  idPatientAcess: number;
  idPassedByURL = '';
  textAlertSuccess: string;
  constructor(
    public navCtrl: NavController,
    private patientService: PatientService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private route: ActivatedRoute,
    private translateService: TranslateService

  ) {

    this.patientAccessForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Scenario_oid: new FormControl(Number, [
      Validators.required
    ])
  });

  this.patientAccessProfileForm = new FormGroup({
    idPatientProfile: new FormControl(Number, [
      Validators.required
    ])
  });

  translateService.get('TOASTALERT.addSuccessfully').subscribe(value => {
    this.textAlertSuccess = value;
  });
}


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params.Id;
    console.log(this.idPassedByURL);
    this.storage.get('idScenario').then((val) => {
      this.patientAccessForm.get('Scenario_oid').setValue(val);
    });

  }

  ionViewWillEnter(){
  }

  onSubmit(){

    this.patientService.createPatientAccess(this.patientAccessForm.value)
    .subscribe( (res: any) => {
      this.name = res.Name;
      this.idPatientAcess = res.Id;
      this.storage.get('idPatientProfile').then((val) => {
        if(val != null){
          this.patientProfileId= val;
          this.accessModeId();
        }else{
          //errorrrr tiene que salir que no hay Patient profile para el paciente
        }
      });
     // this.presentAlert(this.name);
     this.presentToast('success',this.name);
    }, ( err ) => {

    });

  }

  async presentToast(color: string, message: string) {
    const toast = await this.toastController.create({
      color: `${color}`,
      message: `${message} ${this.textAlertSuccess}`,
      duration: 1500,
      position: 'bottom'
    });
    this.accessModeAddDone = true;
    await toast.present();
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The ${message} has been added successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
        //  this.router.navigateByUrl('tabs/tab1/patientAccess');
        this.accessModeAddDone = true;
        }
      }
      ]
    });

    await alert.present();
  }


accessModeId() {
this.patientService.getAccessModeByIdPatientprofile(this.patientProfileId)
  .subscribe((res: any ) => {
    this.allAccessMode = res;
  }, (err) => {
    console.log(err);
  });
}

assignAccessMode(){

  this.idAccessMode = this.patientAccessProfileForm.get('idPatientProfile').value;
  this.patientService.assignAccessModeTemplateToPatientAccess(this.idPatientAcess, this.idAccessMode)
  .subscribe( (res: any) => {
//    this.presentAlert('access mode');
    this.presentToast('success','access mode');

    this.accessModeProfileAddDone = true;
    if (this.idPassedByURL === 'noWizard'){
      this.router.navigateByUrl("tabs/tab1/patientAccess", { skipLocationChange: false });
    }
    this.storage.set('idAccessMode', this.idAccessMode);
      }, ( err ) => {
  });
}

goToInicio(){
  this.router.navigateByUrl("tabs", { skipLocationChange: false });
}
}
