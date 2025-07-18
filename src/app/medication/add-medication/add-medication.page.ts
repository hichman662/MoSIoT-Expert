import { TranslateService } from '@ngx-translate/core';
import { Medication } from './../../models/medication.model';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { CarePlanService } from './../../services/careplan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CareActivity } from 'src/app/models/careActivity.model';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-add-medication',
    templateUrl: './add-medication.page.html',
    styleUrls: ['./add-medication.page.scss'],
    standalone: false
})
export class AddMedicationPage implements OnInit {

  addMedicationForm: FormGroup;
  name = '';
  careActivity: CareActivity = new CareActivity();
  public idScenario: number = 0;
  idNewMedication: number = 0;
  idCareactivityForAdd: number = 0;
  idMedicationForAdd: number = 0;
  textAlertSuccess: string = '';
  constructor(
    public navCtrl: NavController,
    private carePlanService: CarePlanService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private translateService: TranslateService
  ) {

    this.addMedicationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    scenario_oid: new FormControl(Number, [
      Validators.required
    ]),
    timeAct: new FormControl(Date, [
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
      this.addMedicationForm.get('scenario_oid')?.setValue(val);
    });
    this.storage.get('careActivityIdForAdd').then((val) => {
      this.idCareactivityForAdd = val;
    });
    this.storage.get('medicationIdForAdd').then((val) => {
      this.idMedicationForAdd = val;
    });
  }

  onSubmit(){
    this.carePlanService.createMedication(this.addMedicationForm.value)
    .subscribe( (res: Medication) => {
      this.name = res.name ?? '';
      this.idNewMedication = res.id ?? 0;
      this.assignMedicationTemplate();
      console.log("id new mediction: " + this.idNewMedication);
      window.history.back();
    }, ( err ) => {

    });

  }

  assignMedicationTemplate(){
    this.carePlanService.assignTemplateMedication(this.idNewMedication,this.idCareactivityForAdd,this.idMedicationForAdd)
    .subscribe( (res: any) => {
      this.carePlanService.setTemporalAddActivity = this.idCareactivityForAdd;
      console.log(this.carePlanService.getTemporalAddedActivity);
      this.storage.set('careActivityIdForAdd',null);
      this.storage.set('medicationIdForAdd',null);
      //this.presentAlert();
      this.presentToast('success',this.name);
    }, ( err ) => {
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: ` ${this.name}  ${this.textAlertSuccess}`,
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
      message: `${message} ${this.textAlertSuccess}`,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }


}
