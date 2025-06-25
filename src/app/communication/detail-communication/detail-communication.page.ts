/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { ToastController, AlertController, IonItemSliding } from '@ionic/angular';
import { Attribute } from './../../models/attribute.model';
import { Entity } from './../../models/entity.model';
import { EntityService } from './../../services/entity.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detail-communication',
  templateUrl: './detail-communication.page.html',
  styleUrls: ['./detail-communication.page.scss'],
})
export class DetailCommunicationPage implements OnInit {

  public attriubute: Attribute[] = [];
  segmentModel = 'communication';
  private idPassedByURL: number = null;
  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    public alertController: AlertController,
    public toastController: ToastController

  ) { }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params.Id;
    this.callAppointmentDetail();
  }

  callAppointmentDetail(){
    this.entityService.getEntitynById(this.idPassedByURL)
    .subscribe((res: Entity ) => {
      this.attriubute = res.Attributes;
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
