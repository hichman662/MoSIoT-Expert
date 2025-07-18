/* eslint-disable @typescript-eslint/no-inferrable-types */
import { UserService } from './../../services/user.service';
import { UserData } from 'src/app/models/userData.model';
import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
import { Patient } from './../../models/patient.model';
import { Entity } from './../../models/entity.model';
/* eslint-disable @typescript-eslint/member-ordering */
import { CarePlanService } from './../../services/careplan.service';
import { Attribute } from './../../models/attribute.model';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { Disability } from './../../models/disability.model';
import { Condition } from './../../models/condition.model';
import { PatientService } from './../../services/patient.service';
import { PatientProfile } from './../../models/patientProfile.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlertController, NavController ,IonItemSliding,ToastController} from '@ionic/angular';
import { Disease } from 'src/app/models/disease.model';
@Component({
    selector: 'app-detail-profile',
    templateUrl: './detail-profile.component.html',
    styleUrls: ['./detail-profile.component.scss'],
    standalone: false
})
export class DetailProfileComponent implements OnInit {
  name = '';
  patientProfileForm: FormGroup;
  public patientProfile: PatientProfile = new PatientProfile();
  public diseases: Disease [] = [];
  public disabilities: Disability [] = [];
  public patientProfileNull = false;
  public allPatientProfile: any [] = [];
  patientprofileId: number = 0;
  load: boolean = false;
    segmentModel = 'details';
  public patientId: number = 0;
  private idScenario: number = 0;
  public attriubute: Attribute[] = [];
  constructor(
    private userService: UserService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private storage: Storage,
    public navCtrl: NavController,
    public alertController: AlertController,
    private router: Router,
    public carePlanService: CarePlanService,
    public entityService: EntityService,
    public toastController: ToastController

  ) {
    this.patientProfileForm = new FormGroup({
      p_patientprofile_oid: new FormControl(Number, [
        Validators.required
      ])
    });
   }


  ngOnInit() {
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario !== 0){
        this.callingPatient();
      }
    });

    this.storage.get('idPatient').then((val) => {
      if(val != null){
        this.patientId= val;
       // this.callPatientProfileEntity();
      }
    });
  }

  callPatientProfileEntity(){
    this.entityService.getEntitynById(this.patientId)
    .subscribe((res: Entity ) => {
      this.attriubute = res.attributes ?? [];
    }, (err) => {
      console.log(err);
    });
  }

 callingPatient() {
  this.userService.getPatientByIdScenario(this.idScenario).subscribe(
    (res: UserData[]) => {
      console.log('Full user response:', res);

      const patient = res[0]?.patient;
      console.log('Patient:', patient);

      const patientProfile = patient?.patientProfile;
      console.log('PatientProfile:', patientProfile);

      // Valid only if patientProfile has keys
      if (patientProfile && Object.keys(patientProfile).length > 0) {
        this.patientProfile = patientProfile;
        this.patientProfileNull = false;

        const rawDiseases = patientProfile.diseases ?? [];
        this.diseases = Array.isArray(rawDiseases)
          ? rawDiseases
          : Object.values(rawDiseases);

        const rawDisabilities = patientProfile.disabilities ?? [];
        this.disabilities = Array.isArray(rawDisabilities)
          ? rawDisabilities
          : Object.values(rawDisabilities);

        this.load = true;
      } else {
        this.patientProfileNull = true;
        this.callingPatientProfile();
        this.load = true;
      }
    },
    (err) => {
      console.log(err);
      this.patientProfileNull = true;
      this.load = true;
    }
  );
}



  callingPatientProfile(){
     this.patientService.getAllPatientProfile()
    .subscribe( (res2: any) => {
      this.allPatientProfile = res2;
        }, ( err ) => {
    });
  }

  onSubmit(){

    this.patientprofileId = this.patientProfileForm.get('p_patientprofile_oid')?.value;
    this.patientService.assignPatientProfileTemplate(this.patientId, this.patientprofileId)
    .subscribe( (res: any) => {
      this.storage.set('idPatientProfile', this.patientprofileId);
      this.presentAlert();
        }, ( err ) => {
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The ${this.name} has been assigned successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          this.callingPatient();
          this.router.navigateByUrl('tabs/tab1/patient');
        }
      }
      ]
    });

    await alert.present();
  }

  castToDisease(value: any): Disease {
  return value as Disease;
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

  async editAttr(slidingItem: IonItemSliding ,id: number, attr: string){
    slidingItem.close();
    const alert = await this.alertController.create({
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

}
