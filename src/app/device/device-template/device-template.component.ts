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
})
export class DeviceTemplateComponent implements OnInit {

  deviceTemplateNull= false;
  segmentModel = 'detail';
  public attriubute: Attribute[] = [];
  public allCommands: CommandTemplate[] = [];
  public allProperties: PropertyTemplate[] = [];
  private idPassedByURL: number = null;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public deviceService: DeviceService

  ) { }


  ngOnInit() {



    this.idPassedByURL = this.route.snapshot.params.Id;
    this.callDeviceByIdTemporal();
    this.entityService.getEntitynById(this.idPassedByURL)
    .subscribe((res: Entity ) => {
      this.attriubute = res.Attributes;
      //this.allCommands = res.Operations;
      console.log(this.allCommands);
    }, (err) => {
      console.log(err);
    });
  }


  callDeviceByIdTemporal(){

    this.deviceService.getDeviceById(this.idPassedByURL)
    .subscribe((res: Device ) => {
      console.log(res);
    if(res != null){
      this.allProperties = res.DeviceTemplate.Properties;
      this.allCommands = res.DeviceTemplate.Commands;
      console.log(this.allProperties);
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
