import { TranslateService } from '@ngx-translate/core';
/* eslint-disable @typescript-eslint/quotes */
import { CarePlanTemplate } from './../../models/carePlanTemplate.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { NavController, AlertController } from '@ionic/angular';
import { Practitioner } from 'src/app/models/practitioner.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { CarePlan } from 'src/app/models/carePlan.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-care-plan',
  templateUrl: './add-care-plan.page.html',
  styleUrls: ['./add-care-plan.page.scss'],
})
export class AddCarePlanPage implements OnInit {

  carePlanForm: FormGroup;
  carePlantemplateForm: FormGroup;
  name = '';
  carePlan: CarePlan;
  public idScenario: number;
  patientProfileId: number;
  carePlanTemplateList: CarePlanTemplate[] =[];
  carePlanAddDone = false;
  idcarePlanTemplate: number;
  idCarePlan: number;
  idPatientProfileNull = false;
  idPatient = false;
  assignCarePlanTemplateDone= false;
  textAlertSuccess: string;
  constructor(
    public navCtrl: NavController,
    private carePlanService: CarePlanService,
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private translateService: TranslateService
  ) {

    this.carePlanForm = new FormGroup({
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
  this.carePlantemplateForm = new FormGroup({
    idCarePlanTemplate: new FormControl(Number, [
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
      this.carePlanForm.get('Scenario_oid').setValue(val);
    });

    this.storage.get('idPatientProfile').then((val) => {
      if(val != null){
        this.patientProfileId= val;
        this.callCarePlanTemplate();
      }
    });
  }


  onSubmit(){

    this.carePlanService.createCarePlan(this.carePlanForm.value)
    .subscribe( (res: any) => {
      this.name = res.Name;
      this.idCarePlan = res.Id;
      this.carePlanAddDone = true;
      //this.presentAlert();
      this.presentToast('success',this.name);
    }, ( err ) => {

    });

  }

  callCarePlanTemplate(){
    this.carePlanService.getCarePlantemplateByIdPatientProfile(this.patientProfileId)
    .subscribe((res: any ) => {
    this.carePlanTemplateList= res;
    }, (err) => {
      console.log(err);
    });
  }

  assignCarePlanTemplate(){
  this.idcarePlanTemplate = this.carePlantemplateForm.get('idCarePlanTemplate').value;

  this.carePlanService.assignCarePlanTemplateToCarePlan(this.idCarePlan, this.idcarePlanTemplate)
  .subscribe( (res: any) => {
    this.assignCarePlanTemplateDone = true;
    this.storage.set('idcarePlanTemplate', this.idcarePlanTemplate);
   // this.presentAlert();
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
         // this.router.navigateByUrl('tabs/tab2/carePlan');
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

  goToInicio(){
    this.router.navigateByUrl("tabs", { skipLocationChange: false });
  }

}
