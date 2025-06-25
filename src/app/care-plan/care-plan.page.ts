import { CarePlanService } from './../services/careplan.service';
import { CarePlan } from './../models/carePlan.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.page.html',
  styleUrls: ['./care-plan.page.scss'],
})
export class CarePlanPage implements OnInit {

  public carePlans: CarePlan[] = [];
  public idScenario: number;
  public carePlanNull = false;
  patientNull = false;
  constructor(
    private carePlanService: CarePlanService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.storage.get('idPatient').then((val) => {
      console.log(val);
      if(val != null){
       this.patientNull = false;
      }else{
        this.patientNull = true;
      }
    });
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callCarePlans();
      }
    });
  }
  callCarePlans(){
    this.carePlanService.getCarePlanByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res != null){
        this.carePlans = res;
        this.carePlanNull = false;
      }else{
        this.carePlans = null;
        this.carePlanNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteCarePlan(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Care Plan',
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
          this.carePlanService.deleteCarePlan(id)
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
