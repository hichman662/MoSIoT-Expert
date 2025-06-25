import { VitalSign } from './../models/vitalSign.model';
import { Router } from '@angular/router';
import { CarePlanService } from './../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { CarePlan } from '../models/carePlan.model';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-vital-sign',
  templateUrl: './vital-sign.page.html',
  styleUrls: ['./vital-sign.page.scss'],
})
export class VitalSignPage implements OnInit {

  public vitalSigns: VitalSign[] = [];
  public idScenario: number;
  public vitalSignNull = false;

  constructor(
    private carePlanService: CarePlanService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callCarePlans();
      }
    });
  }
  callCarePlans(){
    this.carePlanService.getVitalSignByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res != null){
        this.vitalSigns = res;
        this.vitalSignNull = false;
      }else{
        this.vitalSigns = null;
        this.vitalSignNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteVitalSign(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Vital Sign',
      message: `Are you sure you want remove ${name}?`,
      buttons: [  {
        text: 'Cancel',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.carePlanService.deleteVitalSign(id)
          // tslint:disable-next-line: deprecation
          .subscribe( (res: any) => {
            this.ionViewWillEnter();
          }, ( err) => {
              console.log(err);
          });
        }
      }]
    });

    await alert.present();

  }

}
