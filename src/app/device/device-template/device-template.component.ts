import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding, AlertController, ToastController } from '@ionic/angular';

import { DeviceService } from './../../services/device.service';
import { EntityService } from './../../services/entity.service';

import { Device } from 'src/app/models/device.model';
import { Entity } from './../../models/entity.model';
import { Attribute } from './../../models/attribute.model';
import { CommandTemplate } from './../../models/commandTemplate.model';
import { PropertyTemplate } from './../../models/propertyTemplate.model';

@Component({
  selector: 'app-device-template',
  templateUrl: './device-template.component.html',
  styleUrls: ['./device-template.component.scss'],
  standalone: false
})
export class DeviceTemplateComponent implements OnInit {

  public segmentModel: string = 'detail';
  public load: boolean = false;

  public deviceTemplateNull: boolean = false;
  public attributes: Attribute[] = [];
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

  ngOnInit(): void {
    this.load = false;
    this.idPassedByURL = this.route.snapshot.params['Id'];

    this.callDeviceByIdTemporal();

    this.entityService.getEntitynById(this.idPassedByURL).subscribe({
      next: (res: Entity) => {
        this.attributes = res.attributes ?? [];
        this.deviceTemplateNull = !res.attributes?.length;
        this.load = true;
      },
      error: (err) => {
        console.error(err);
        this.deviceTemplateNull = true;
        this.load = true;
      }
    });
  }

  callDeviceByIdTemporal(): void {
    this.deviceService.getDeviceById(this.idPassedByURL).subscribe({
      next: (res: Device) => {
        if (res?.deviceTemplate) {
          this.allProperties = res.deviceTemplate.properties ?? [];
          this.allCommands = res.deviceTemplate.commands ?? [];
        } else {
          this.allProperties = [];
          this.allCommands = [];
          this.deviceTemplateNull = true;
        }
      },
      error: (err) => {
        console.error(err);
        this.deviceTemplateNull = true;
      }
    });
  }

  closeSliding(slidingItem: IonItemSliding): void {
    slidingItem.close();
  }

  async presentToast(color: string, message: string): Promise<void> {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      duration: 2500,
      position: 'bottom'
    });
    await toast.present();
  }

  async editAttr(slidingItem: IonItemSliding, attrName: string, id: number, attr: string): Promise<void> {
    slidingItem.close();
    const alert = await this.alertController.create({
      header: attrName,
      inputs: [
        {
          name: 'ValueAttr',
          placeholder: attr,
          value: attr
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Edit cancelled');
          }
        },
        {
          text: 'Modify',
          handler: (data) => {
            if (data.ValueAttr !== '') {
              this.entityService.modifyEntityAttribute(id, { ValueAttr: data.ValueAttr }).subscribe({
                next: (res: Attribute) => {
                  this.presentToast('success', 'Your settings have been saved.');
                  this.ngOnInit();
                },
                error: (err) => {
                  console.error(err);
                  this.presentToast('danger', 'Your settings have not been saved.');
                }
              });
              return true;
            }
            return false;
          }
        }
      ]
    });
    await alert.present();
  }

}
