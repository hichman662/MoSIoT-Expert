import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/quotes */
import { DeviceTemplate } from './../../models/deviceTemplate.model';
import { AccessMode } from './../../models/accessMode.model';
import { PatientService } from './../../services/patient.service';
/* eslint-disable @typescript-eslint/naming-convention */

import { DeviceService } from './../../services/device.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CarePlan } from 'src/app/models/carePlan.model';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {

  deviceForm: FormGroup;
  accessModeForm: FormGroup;
  deviceTemplateForm: FormGroup;
  name = '';
  carePlan: CarePlan;
  patientProfileId: number;
  public idScenario: number;
  public allProfileAccessMods: AccessMode[];
  public allDeviceTemplates: DeviceTemplate[];
  assignDeviceTemplateDone = false;
  deviceAddDone = false;
  assignAccessModeDone = false;
  allOkey = false;
  idDevice: number;
  idDeviceTemplateChoosen: number;
  idAccessModeChoosen: number;
  idAccessModeFromStorage: number;
  weHaveAccessModeId = false;
  textAlertSuccess: string;
  constructor(
    public navCtrl: NavController,
    private deviceService: DeviceService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private patientService: PatientService,
    public toastController: ToastController,
    private translateService: TranslateService

  ) {

    this.deviceForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Tag: new FormControl('', [
      Validators.required
    ]),
    SerialNumber: new FormControl('', [
      Validators.required
    ]),
    FirmVersion: new FormControl('', [
      Validators.required
    ]),
    Trademark: new FormControl('', [
      Validators.required
    ]),
    IsSimulated: new FormControl(Boolean, [
      Validators.required
    ]),
    DeviceSwitch: new FormControl(Boolean, [
      Validators.required
    ]),
    Scenario_oid: new FormControl(Number, [
      Validators.required
    ])
  });

  this.accessModeForm = new FormGroup({
    idAccessMode: new FormControl(Number, [
      Validators.required
    ])
  });

  this.deviceTemplateForm = new FormGroup({
    p_devicetemplate_oid: new FormControl(Number, [
      Validators.required
    ])
  });

  translateService.get('TOASTALERT.addSuccessfully').subscribe(value => {
    this.textAlertSuccess = value;
  });
}

ngOnInit() {
  }

ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.deviceForm.get('Scenario_oid').setValue(val);
    });

    this.storage.get('idPatientProfile').then((val) => {
        this.patientProfileId = val;
        if(this.patientProfileId !== null){
          this.callAllProfileAccessMode();
        }
    });
    this.storage.get('idAccessMode').then((val) => {
      if(val !== null ){
        this.idAccessModeFromStorage = val;
        this.weHaveAccessModeId = true;
        this.CallAccessModeWithPatientOidStorage(this.idAccessModeFromStorage);
      }
  });
  }


  onSubmit(){

    this.deviceService.createDevice(this.deviceForm.value)
    .subscribe( (res: any) => {
      this.name = res.Name;
      this.idDevice = res.Id;
      this.deviceAddDone = true;
      //this.presentAlert();
      this.presentToast('success',this.name);

    }, ( err ) => {

    });

  }

  async presentToast(color: string, message: string) {
    const toast = await this.toastController.create({
      color: `${color}`,
      message: ` ${message} ${this.textAlertSuccess}`,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The ${this.name} has been added successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
         // this.router.navigateByUrl('tabs/tab3/device');
        }
      }
      ]
    });

    await alert.present();
  }

//FIRST
 callAllProfileAccessMode(){
  this.patientService.getAccessModeByIdPatientprofile(this.patientProfileId)
  .subscribe( (res: AccessMode[]) => {
    this.allProfileAccessMods = res;
    console.log(this.allProfileAccessMods);
  }, ( err ) => {

  });
 }


//Second
 callAccessMode(){
  this.idAccessModeChoosen = this.accessModeForm.get('idAccessMode').value;
  this.deviceService.getDeviceTemplateByIdAccessMode(this.idAccessModeChoosen)
  .subscribe( (res: DeviceTemplate[]) => {
    this.allDeviceTemplates = res;
    this.assignAccessModeDone = true;
    console.log(this.allDeviceTemplates);
  }, ( err ) => {

  });

 }

 CallAccessModeWithPatientOidStorage(idAccessModeStorage: number){
  this.deviceService.getDeviceTemplateByIdAccessMode(idAccessModeStorage)
  .subscribe( (res: DeviceTemplate[]) => {
    this.allDeviceTemplates = res;
    console.log(this.allDeviceTemplates);
  }, ( err ) => {

  });
 }

 assignDeviceTemplate(){
  this.idDeviceTemplateChoosen = this.deviceTemplateForm.get('p_devicetemplate_oid').value;
  this.deviceService.assignDeviceTemplate( this.idDevice, this.idDeviceTemplateChoosen)
  .subscribe( (res: any) => {
    console.log(res);
    this.assignDeviceTemplateDone = true;
    this.allOkey = true;
//    this.presentAlert();
    this.presentToast('success',this.name);

  }, ( err ) => {

  });

 }

 goToInicio(){
  this.router.navigateByUrl("tabs", { skipLocationChange: false });
}

}
