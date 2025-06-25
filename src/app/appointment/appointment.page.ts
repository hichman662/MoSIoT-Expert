import { Appointment } from './../models/appointment.model';
import { CarePlanService } from './../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  public appointments: Appointment[] = [];
  public idScenario: number;
  public appointmentNull = false;
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
        this.callAppointments();
      }
    });
  }
  callAppointments(){
    this.carePlanService.getAppointmentsByIdScenario(this.idScenario)
    .subscribe( (res: Appointment[]) => {
      if(res != null){
        this.appointments = res;
        this.appointmentNull = false;
      }else{
        this.appointments = null;
        this.appointmentNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteAppointment(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Appointment',
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
          this.carePlanService.deleteAppointment(id)
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
