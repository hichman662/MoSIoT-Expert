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
    standalone: false
})
export class AddPatientAccessPage implements OnInit {

  patientProfileId: number = 0;
  patientAccessForm: FormGroup;
  patientAccessProfileForm: FormGroup;
  name = '';
  patientAccess: PatientAccess = new PatientAccess();
  public idScenario: any;
  public allAccessMode: AccessMode []= [];
  idAccessMode: number = 0;
  accessModeAddDone = false;
  accessModeProfileAddDone = false;
  idPatientAcess: number = 0;
  idPassedByURL = '';
  textAlertSuccess: string = '';
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
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    scenario_oid: new FormControl(Number, [
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
    this.idPassedByURL = this.route.snapshot.params['Id'];

    console.log("here Id pass By Id of user " + this.idPassedByURL);
    this.storage.get('idScenario').then((val) => {
      this.patientAccessForm.get('scenario_oid')?.setValue(val);
    });

  }

  ionViewWillEnter(){
  }

  onSubmit(){

    this.patientService.createPatientAccess(this.patientAccessForm.value)
    .subscribe( (res: any) => {
      this.name = res.name;
      this.idPatientAcess = res.id;
      console.log ("inja Id patient access: " + this.idPatientAcess)
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
    console.log("Here we have all access mode's Id by Patient profile Id " + res[0].id)
  }, (err) => {
    console.log(err);
  });
}

assignAccessMode(){

  this.idAccessMode = this.patientAccessProfileForm.get('idPatientProfile')?.value;
  console.log ("here we have the Id access mode which has chosen by user " + this.idAccessMode);
  console.log ("here we have id Patient access from the previous control form " + this.idPatientAcess);
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
