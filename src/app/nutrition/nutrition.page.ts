import { CarePlanService } from './../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { Nutrition } from '../models/nutrition.model';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.page.html',
  styleUrls: ['./nutrition.page.scss'],
})
export class NutritionPage implements OnInit {

  public nutritions: Nutrition[] = [];
  public idScenario: number;
  public nutritionNull = false;
  constructor(
    private carePlanService: CarePlanService,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callNutritions();
      }
    });
  }
  callNutritions(){
    this.carePlanService.getnutritionsByIdScenario(this.idScenario)
    .subscribe( (res: Nutrition[]) => {
      if(res != null){
        this.nutritions = res;
        this.nutritionNull = false;
      }else{
        this.nutritions = null;
        this.nutritionNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteNutrition(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Nutrition',
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
          this.carePlanService.deleteNutrition(id)
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
