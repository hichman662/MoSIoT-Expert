import { TranslateService } from '@ngx-translate/core';
import { Nutrition } from './../../models/nutrition.model';
import { Medication } from './../../models/medication.model';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { CarePlanService } from './../../services/careplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CareActivity } from 'src/app/models/careActivity.model';

@Component({
  selector: 'app-add-nutrition',
  templateUrl: './add-nutrition.page.html',
  styleUrls: ['./add-nutrition.page.scss'],
})
export class AddNutritionPage implements OnInit {
  addNutritionForm: FormGroup;
  name = '';
  careActivity: CareActivity;
  public idScenario: number;
  idNewNutrition: number;
  idCareactivityForAdd: number;
  idNutritionForAdd: number;
  textAlertSuccess: string;
  constructor(
    public navCtrl: NavController,
    private carePlanService: CarePlanService,
    public alertController: AlertController,
    private route: ActivatedRoute,
    private storage: Storage,
    public toastController: ToastController,
    private translateService: TranslateService
  ) {

    this.addNutritionForm = new FormGroup({
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
      this.addNutritionForm.get('Scenario_oid').setValue(val);
    });
    this.storage.get('careActivityIdForAdd').then((val) => {
      this.idCareactivityForAdd = val;
    });
    this.storage.get('nutritionIdForAdd').then((val) => {
      this.idNutritionForAdd = val;
    });
  }

  onSubmit(){
    this.carePlanService.createNutritionOrder(this.addNutritionForm.value)
    .subscribe( (res: Nutrition) => {
      this.name = res.Name;
      this.idNewNutrition = res.Id;
      this.assignNutritionTemplate();
      console.log("id new nutrition: " + this.idNewNutrition);
      window.history.back();
    }, ( err ) => {

    });

  }
  assignNutritionTemplate(){
    this.carePlanService.assignTemplateNutritionOrder(this.idNewNutrition,this.idCareactivityForAdd,this.idNutritionForAdd)
    .subscribe( (res: any) => {
      this.carePlanService.setTemporalAddActivity = this.idCareactivityForAdd;
      console.log(this.carePlanService.getTemporalAddedActivity);
      this.storage.set('careActivityIdForAdd',null);
      this.storage.set('nutritionIdForAdd',null);
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
      message: ` ${message} ${this.textAlertSuccess}`,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

}
