import { Communication } from './../models/communication.model';
import { Appointment } from './../models/appointment.model';
import { CarePlanService } from './../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.page.html',
  styleUrls: ['./communication.page.scss'],
})
export class CommunicationPage implements OnInit {

  public communications: Communication[] = [];
  public idScenario: number;
  public communicationNull = false;
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
        this.callCommunications();
      }
    });
  }

  callCommunications(){
    this.carePlanService.getCommunicationByIdScenario(this.idScenario)
    .subscribe( (res: Communication[]) => {
      if(res != null){
        this.communications = res;
        this.communicationNull = false;
      }else{
        this.communications = null;
        this.communicationNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteCommunication(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Communication',
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
          this.carePlanService.deleteCommunication(id)
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
