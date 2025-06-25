import { EntityService } from './../../services/entity.service';
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
import { Attribute } from './../../models/attribute.model';
/* eslint-disable @typescript-eslint/quotes */
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entity } from './../../models/entity.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonItemSliding, AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-detail-vital-sign',
  templateUrl: './detail-vital-sign.page.html',
  styleUrls: ['./detail-vital-sign.page.scss'],
})
export class DetailVitalSignPage implements OnInit {

  public vitalSignName: string ='';
  public vitalSignDescrip: string= '';
  public measureVitalSign: any;
  public vitalSignLOINCode: number = 0;
  vitalSignTemplateForm: FormGroup;
  segmentModel = 'details';
  vitalSignDetailNull = false;
  public attriubute: Attribute[] = [];
  private idPassedByURL: number = 0;
  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController

  ) {
    this.vitalSignTemplateForm = new FormGroup({
      idCarePlanTemplate: new FormControl(Number, [
        Validators.required
      ])
    });
  }


  ngOnInit() {

    this.idPassedByURL = this.route.snapshot.params.Id;
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
              .subscribe((res: Attribute ) =>{
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
