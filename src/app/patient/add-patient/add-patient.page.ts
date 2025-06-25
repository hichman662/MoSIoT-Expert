import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { UserService } from './../../services/user.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Patient } from './../../models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {

  patientForm: FormGroup;
  email = '';
  patient: Patient;
  public idScenario: number;
  invitedUserName: string;
  invitedUserId: number;
  findNotAlreadyPatient: any [] = [];
  patientAddDone = false;
  patientProfileAddDone = false;
  patientProfileForm: FormGroup;
  public patientProfileNull = false;
  public allPatientProfile: any [] = [];
  patientprofileId: number;
  patientId: number;
  data: any;
  textSuccess: string;
  textAlertSuccess: string;

  constructor(
    public navCtrl: NavController,
    private patientService: PatientService,
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private translateService: TranslateService
  ) {

    this.patientForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    Pass: new FormControl('', [
      Validators.required
    ]),
    UserPatient_oid: new FormControl(Number, [
      Validators.required
    ])
  });

  this.patientProfileForm = new FormGroup({
    p_patientprofile_oid: new FormControl(Number, [
      Validators.required
    ])
  });

  translateService.get('TOASTALERT.success').subscribe(value => {
    this.textSuccess = value;
  });
  translateService.get('TOASTALERT.addSuccessfully').subscribe(value => {
    this.textAlertSuccess = value;
  });
}

  ngOnInit() {
  }

  ionViewWillEnter(){
    /* this.storage.get('idScenario').then((val) => {
      this.patientForm.get('Scenario_oid').setValue(val);
    }); */

    this.userService.getAllUsers()
    .subscribe( (res: any) => {
      console.log(res);
      this.findNotAlreadyPatient = res.filter( obj =>  obj.Patient === null);
      console.log(this.findNotAlreadyPatient);
        }, ( err ) => {
    });

    this.invitedUserName = this.userService.nameNewUser;
    this.invitedUserId = this.userService.idNewUser;

  }
  onSubmit(){
    this.patientService.createPatient(this.patientForm.value)
    .subscribe( (res: any) => {
      this.email = res.Email;
      this.patientId = res.Id;
      this.storage.set('idPatient',res.Id);
      this.patientProfileNull = true;
      /* this.userService.removeUserId();
      this.userService.removeUserName(); */
      this.presentToast('success',this.email);
     // this.presentAlert(this.email);
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
    this.patientAddDone = true;
    this.callingPatientProfile();
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
          this.patientAddDone = true;
          this.callingPatientProfile();
         // this.router.navigateByUrl('/tabs/tab1');
        }
      }
      ]
    });

    await alert.present();
  }

  callingPatientProfile(){
    this.patientService.getAllPatientProfile()
   .subscribe( (res2: any) => {
     this.allPatientProfile = res2;
       }, ( err ) => {
   });
 }

 AssignPatientProfile(){

  this.patientprofileId = this.patientProfileForm.get('p_patientprofile_oid').value;
  this.patientService.assignPatientProfileTemplate(this.patientId, this.patientprofileId)
  .subscribe( (res: any) => {
    this.storage.set('idPatientProfile', this.patientprofileId);
    this.patientProfileNull = false;
    this.patientProfileAddDone = true;
    //this.presentAlert('patient profile');
    this.presentToast('success','patient profile');
      }, ( err ) => {
  });
}


goToInicio(){
  this.router.navigateByUrl("tabs", { skipLocationChange: false });
}



}
