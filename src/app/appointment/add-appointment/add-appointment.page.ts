import { TranslateService } from '@ngx-translate/core';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */

import { Appointment } from './../../models/appointment.model';
import { CarePlanService } from './../../services/careplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CareActivity } from 'src/app/models/careActivity.model';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.page.html',
  styleUrls: ['./add-appointment.page.scss'],
})
export class AddAppointmentPage implements OnInit {

  addAppointmentForm: FormGroup;
  name = '';
  careActivity: CareActivity;
  public idScenario: number;
  idNewAppointment: number;
  idCareactivityForAdd: number;
  idAppointmentForAdd: number;
  textAlertSuccess: string;
  constructor(
    public navCtrl: NavController,
    private carePlanService: CarePlanService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private translateService: TranslateService,
    public toastController: ToastController
  ) {

    this.addAppointmentForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Scenario_oid: new FormControl(Number, [
      Validators.required
    ]),
    TimeAct: new FormControl(Date, [
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
      this.addAppointmentForm.get('Scenario_oid').setValue(val);
    });

    this.storage.get('careActivityIdForAdd').then((val) => {
      this.idCareactivityForAdd = val;
    });
    this.storage.get('appointmentIdForAdd').then((val) => {
      this.idAppointmentForAdd = val;
    });
  }

  onSubmit(){
    this.carePlanService.createAppointment(this.addAppointmentForm.value)
    .subscribe( (res: Appointment) => {
      this.name = res.Name;
      this.idNewAppointment = res.Id;
      this.assignAppointmentTemplate();
      console.log("id new appointment: " + this.idNewAppointment);
      window.history.back();
    }, ( err ) => {

    });

  }


  assignAppointmentTemplate(){
    this.carePlanService.assignTemplateAppointment(this.idNewAppointment,this.idCareactivityForAdd,this.idAppointmentForAdd)
    .subscribe( (res: any) => {
      this.carePlanService.setTemporalAddActivity = this.idCareactivityForAdd;
      console.log(this.carePlanService.getTemporalAddedActivity);
      this.storage.set('careActivityIdForAdd',null);
      this.storage.set('appointmentIdForAdd',null);
      //this.presentAlert();
      this.presentToast('success',this.name);
    }, ( err ) => {
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: ` ${this.name} ${this.textAlertSuccess}`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          //this.router.navigateByUrl('/tabs/tab2');
        }
      }
      ]
    });

    await alert.present();
  }

  async presentToast(color: string, message: string) {
    const toast = await this.toastController.create({
      color: `${color}`,
      message: `The ${message} ${this.textAlertSuccess}`,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

}

