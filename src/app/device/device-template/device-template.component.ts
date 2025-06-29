import { CommandTemplate } from './../../models/commandTemplate.model';
import { PropertyTemplate } from './../../models/propertyTemplate.model';
import { DeviceService } from './../../services/device.service';

import { Command } from './../../models/command.model';
import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Attribute } from './../../models/attribute.model';
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from './../../models/entity.model';
import { IonItemSliding, AlertController, ToastController} from '@ionic/angular';
import { Property } from 'src/app/models/property.model';
import { Device } from 'src/app/models/device.model';

@Component({
    selector: 'app-device-template',
    templateUrl: './device-template.component.html',
    styleUrls: ['./device-template.component.scss'],
    standalone: false
})
export class DeviceTemplateComponent implements OnInit {

  deviceTemplateNull= false;
  segmentModel = 'detail';
  public attriubute: Attribute[] = [];
  public allCommands: CommandTemplate[] = [];
  public allProperties: PropertyTemplate[] = [];
  private idPassedByURL: number = 0;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public deviceService: DeviceService

  ) { }


  ngOnInit() {



    this.idPassedByURL = this.route.snapshot.params['Id'];
    this.callDeviceByIdTemporal();
    this.entityService.getEntitynById(this.idPassedByURL)
    .subscribe((res: Entity ) => {
      this.attriubute = res.attributes ?? [];
      //this.allCommands = res.Operations;
      console.log(this.allCommands);
    }, (err) => {
      console.log(err);
    });
  }


  callDeviceByIdTemporal() {
  this.deviceService.getDeviceById(this.idPassedByURL)
    .subscribe((res: Device) => {
      console.log(res);
      if (res != null && res.deviceTemplate != null) {
        this.allProperties = res.deviceTemplate.Properties ?? [];
        this.allCommands = res.deviceTemplate.Commands ?? [];
        console.log(this.allProperties);
      } else {
        this.allProperties = [];
        this.allCommands = [];
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
