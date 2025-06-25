import { DeviceService } from './../../services/device.service';
import { Property } from './../../models/property.model';
import { Command } from './../../models/command.model';
import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Attribute } from './../../models/attribute.model';
/* eslint-disable @typescript-eslint/quotes */
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from './../../models/entity.model';
import { IonItemSliding, AlertController, ToastController} from '@ionic/angular';
import { Device } from 'src/app/models/device.model';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.page.html',
  styleUrls: ['./detail-device.page.scss'],
})
export class DetailDevicePage implements OnInit {
  public deviceName: string;
  public deviceDescrip: string;
  public deviceData: Device;
  segmentModel = 'details';
  load = false;
  private idPassedByURL: number = null;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    private deviceService: DeviceService

  ) { }


  ngOnInit() {

    this.load = true;
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.deviceService.getDeviceById(this.idPassedByURL)
    .subscribe((res: Device ) => {
      console.log(res);
    if(res != null){
      this.load = false;
       this.deviceName = res.Name;
       this.deviceDescrip = res.Description;
       this.deviceData = res;

    }
    }, (err) => {
      console.log(err);
    });
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
