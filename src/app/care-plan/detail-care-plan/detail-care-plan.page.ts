import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Target } from './../../models/target.model';
import { Goal } from './../../models/goal.model';
import { CarePlanTemplate } from './../../models/carePlanTemplate.model';
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarePlan } from 'src/app/models/carePlan.model';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonItemSliding, AlertController, ToastController, NavController } from '@ionic/angular';
import { Attribute } from './../../models/attribute.model';
import { Entity } from './../../models/entity.model';
@Component({
    selector: 'app-detail-care-plan',
    templateUrl: './detail-care-plan.page.html',
    styleUrls: ['./detail-care-plan.page.scss'],
    standalone: false
})
export class DetailCarePlanPage implements OnInit {

  public carePlanTemplate: CarePlanTemplate = new CarePlanTemplate();
  public carePlan: CarePlan = new CarePlan();
  public carePlanName: string = '';
  public carePlanDescription: string = '';
  public goals: Goal[] = [];  
  public targets: Target[] = []; 
  carePlanDetailNull = false;
  segmentModel = 'details';
  patientProfileId: number = 0;
  carePlanTemplateList: CarePlanTemplate[] =[];
  carePlantemplateForm: FormGroup;
  idcarePlantemplate: number = 0;
  public attriubute: Attribute[] = [];
  private idPassedByURL: number = 0;
  constructor(
    private carePlanService: CarePlanService,
    private entityService: EntityService,
    private route: ActivatedRoute,
    private storage: Storage,
    public alertController: AlertController,
    public toastController: ToastController

  ) {
      this.carePlantemplateForm = new FormGroup({
      idCarePlanTemplate: new FormControl(Number, [
        Validators.required
      ])
    });
  }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params['Id'];
    this.callCarePlanDetail();

   /*  this.carePlanService.getGoalByIdCarePlan(this.idPassedByURL)
    .subscribe((res: any ) => {
    if(res != null){
       this.goals = res;
       console.log(this.goals);
    }
    }, (err) => {
      console.log(err);
    }); */

    /* this.carePlanService.getTargetByIdCarePlan(this.idPassedByURL)
    .subscribe((res: any ) => {
    if(res != null){
       this.targets = res;
       console.log(this.targets);
    }
    }, (err) => {
      console.log(err);
    }); */
  }

  callCarePlanDetail(){
      //la parte de los detalles de Care plan
    this.entityService.getEntitynById(this.idPassedByURL)
    .subscribe((res: Entity ) => {
      this.attriubute = res.attributes ?? [];
    }, (err) => {
      console.log(err);
    });


    this.storage.get('idPatientProfile').then((val) => {
      if(val != null){
        this.patientProfileId= val;
        this.callCarePlanTemplate();
      }
    });

    this.carePlanService.getCarePlanById(this.idPassedByURL)
  .subscribe((res: CarePlan) => {
    if (res.carePlanTemplate != null) {
      this.carePlanDetailNull = false;
      this.carePlanName = res.name ?? '';
      this.carePlanDescription = res.description ?? '';
      // this.carePlanTemplate = res.carePlanTemplate;

      this.goals = res.carePlanTemplate.goals ?? [];
      this.targets = this.goals.length > 0 ? this.goals[0].targets ?? [] : [];

      console.log(this.targets);
    } else {
      this.carePlanDetailNull = true;
      this.carePlanTemplate = new CarePlanTemplate(); 
    }
  }, (err) => {
    console.log(err);
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

  onSubmit(){

    this.idcarePlantemplate = this.carePlantemplateForm.get('idCarePlanTemplate')?.value;
    console.log("Id Care plan template " + this.idcarePlantemplate);
    console.log("pass by Url " +this.idPassedByURL);
    this.carePlanService.assignCarePlanTemplateToCarePlan(this.idPassedByURL, this.idcarePlantemplate)
    .subscribe( (res: any) => {
      this.presentAlert();
        }, ( err ) => {
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The Care Plan Template has been assigned successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          this.callCarePlanDetail();
        }
      }
      ]
    });

    await alert.present();
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async presentToast(color: string , message: string) {
    const toast = await this.toastController.create({
      color: `${color}`,
      message: `${message}`,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

  async editAttr(slidingItem: IonItemSliding ,attrName: string ,id: number, attr: string){
    slidingItem.close();
    const alert = await this.alertController.create({
      header:`${attrName}`,
      inputs: [
        {
          name: 'ValueAttr',
          placeholder: `${attr}`,
          value: `${attr}`
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('You Clicked on Cancel');
          }
        },
        {
          text: 'Modify',
          handler: data => {
            if (data.ValueAttr !== '') {
               this.entityService.modifyEntityAttribute(id, {"ValueAttr" : data.ValueAttr})
              .subscribe((res: Attribute ) => {
                this.presentToast('success','Your settings have been saved.');
                this.ngOnInit();
                 }, (err) => {
              console.log(err);
              this.presentToast('danger','Your settings have not been saved.');
              });
              return true;
            } else {
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
}

getIcon(name: string): string {
  switch (name.toLowerCase()) {
    case 'name': return 'person-outline';
    case 'description': return 'receipt-outline';
    case 'durationdays': return 'hourglass-outline';
    case 'intent': return 'body-outline';
    case 'status': return 'power-outline';
    case 'modified': return 'calendar-outline';
    case 'title': return 'document-text-outline';
    case 'mejoracognitiva': return 'accessibility-outline';
    case 'reducirpulsaciones': return 'pulse-outline';
    default: return 'information-circle-outline';
  }
}

}
