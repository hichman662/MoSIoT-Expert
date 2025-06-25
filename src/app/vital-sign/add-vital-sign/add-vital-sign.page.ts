/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { VitalSign } from 'src/app/models/vitalSign.model';


@Component({
  selector: 'app-add-vital-sign',
  templateUrl: './add-vital-sign.page.html',
  styleUrls: ['./add-vital-sign.page.scss'],
})
export class AddVitalSignPage implements OnInit {

  vitalSignForm: FormGroup;
  name = '';
  vitalSign: VitalSign;
  public idScenario: number;

  constructor(
    public navCtrl: NavController,
    private carePlanService: CarePlanService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage
  ) {

    this.vitalSignForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Scenario_oid: new FormControl(Number, [
      Validators.required
    ])
  });
}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.vitalSignForm.get('Scenario_oid').setValue(val);
    });
  }
  onSubmit(){

    this.carePlanService.createVitalSign(this.vitalSignForm.value)
    .subscribe( (res: any) => {
      this.name = res.Name;
      this.presentAlert();
    }, ( err ) => {

    });

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The ${this.name} has been added successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          this.router.navigateByUrl('tabs/tab2/vitalSign');
        }
      }
      ]
    });

    await alert.present();
  }


}
