import { TranslateService } from '@ngx-translate/core';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Communication } from './../../models/communication.model';
import { CarePlanService } from './../../services/careplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CareActivity } from 'src/app/models/careActivity.model';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-communication',
    templateUrl: './add-communication.page.html',
    styleUrls: ['./add-communication.page.scss'],
    standalone: false
})
export class AddCommunicationPage implements OnInit {
  addCommunicationForm: FormGroup;
  name = '';
  careActivity: CareActivity = new CareActivity();
  public idScenario: number = 0;
  idNewCummunication: number = 0;
  idCareactivityForAdd: number = 0;
  idCummunicationForAdd: number = 0;
  textAlertSuccess: string = '';
  constructor(
    public navCtrl: NavController,
    private carePlanService: CarePlanService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private storage: Storage,
    private translateService: TranslateService,
    public toastController: ToastController
  ) {

    this.addCommunicationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    scenario_oid: new FormControl(Number, [
      Validators.required
    ]),
    timeAct: new FormControl('', [
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
      this.addCommunicationForm.get('scenario_oid')?.setValue(val);
    });
    this.storage.get('careActivityIdForAdd').then((val) => {
      this.idCareactivityForAdd = val;
    });
    this.storage.get('communicationIdForAdd').then((val) => {
      this.idCummunicationForAdd = val;
    });
  }

  onSubmit(){
    this.carePlanService.createNutritionOrder(this.addCommunicationForm.value)
    .subscribe( (res: Communication) => {
      this.name = res.name ?? '';
      this.idNewCummunication = res.id ?? 0;
      this.assignNutritionTemplate();
      console.log("id new Communication: " + this.idNewCummunication);
      window.history.back();
    }, ( err ) => {

    });

  }
  assignNutritionTemplate(){
    this.carePlanService.assignTemplateNutritionOrder(this.idNewCummunication,this.idCareactivityForAdd,this.idCummunicationForAdd)
    .subscribe( (res: any) => {
      this.carePlanService.setTemporalAddActivity = this.idCareactivityForAdd;
      console.log(this.carePlanService.getTemporalAddedActivity);
      this.storage.set('careActivityIdForAdd',null);
      this.storage.set('communicationIdForAdd',null);
      //this.presentAlert();
      this.presentToast('success',this.name);
    }, ( err ) => {
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `${this.name} ${this.textAlertSuccess}`,
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
  onDateChange(event: any) {
  this.addCommunicationForm.get('timeAct')?.setValue(event.detail.value);

}

}
