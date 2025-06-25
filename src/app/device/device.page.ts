import { Device } from './../models/device.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from './../services/device.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
})
export class DevicePage implements OnInit {
  public devices: Device[] = [];
  public idScenario: number;
  devicesNull= false;
  idPassedByURL = '';

  constructor(
    private deviceService: DeviceService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    private route: ActivatedRoute


  ) { }

  ngOnInit() {
    //this.calltelemetry();

  }
  ionViewWillEnter(){
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callDevice();
      }
    });
  }
  callDevice(){
    this.deviceService.getDeviceByIdScenario(this.idScenario)
    .subscribe( (res: Device[]) => {
        if(res != null){
          this.devices = res;
        }else{
          this.devicesNull = true;
        }
    }, ( err) => {
        console.log(err);
    });
  }

  calltelemetry(){
    this.deviceService.getTelemetryBloodPressure()
    .subscribe( (res: any) => {
        console.log(res);
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deleteDevice(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Patient Access',
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
          this.deviceService.deleteDevice(id)
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
