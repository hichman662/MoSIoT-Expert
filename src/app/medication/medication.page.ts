import { Medication } from './../models/medication.model';
import { CarePlanService } from './../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {

  public medications: Medication[] = [];
  public idScenario: number;
  public medicationNull = false;
  constructor(
    private carePlanService: CarePlanService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController

  ) { }

  ngOnInit() { }

  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callMedications();
      }
    });
  }
  callMedications(){
    this.carePlanService.getMedicationsByIdScenario(this.idScenario)
    .subscribe( (res: Medication[]) => {
      if(res != null){
        this.medications = res;
        this.medicationNull = false;
      }else{
        this.medications = null;
        this.medicationNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteMedication(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Medication',
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
          this.carePlanService.deleteMedication(id)
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
