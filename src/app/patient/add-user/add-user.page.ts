import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { AlertController } from '@ionic/angular';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { Location } from '@angular/common';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  userForm: FormGroup;
  surenames = '';
  user: UserData;
  textAlertSuccess: string;
  constructor(
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private location: Location,
    private storage: Storage,
    public toastController: ToastController,
    private translateService: TranslateService
  ) {

    this.userForm = new FormGroup({
    Name: new FormControl('', [
      Validators.required
    ]),
    Surnames: new FormControl('', [
      Validators.required
    ]),
    Description: new FormControl('', [
      Validators.required
    ]),
    Type: new FormControl(Number, [
      Validators.required
    ]),
    IsDiseased: new FormControl(Boolean, [
      Validators.required
    ]),
    IsActive: new FormControl(Boolean, [
      Validators.required
    ]),
    Scenario_oid: new FormControl(Number, [
      Validators.required
    ])
  });

  translateService.get('TOASTALERT.addSuccessfully').subscribe(value => {
     this.textAlertSuccess = value;
   });
}

  ngOnInit() {
  this.storage.get('idScenario').then((val) => {
      this.userForm.get('Scenario_oid').setValue(val);
    });
  }

  onSubmit(){
    this.userService.createUser(this.userForm.value)
    .subscribe( (res: any) => {
      console.log(res);
      this.surenames = res.Surnames;

     // this.presentAlert();
     this.presentToast('success');

    }, ( err ) => {

    });

  }


  async presentToast(color: string) {
    const toast = await this.toastController.create({
      color: `${color}`,
      message: `${this.surenames} ${this.textAlertSuccess}`,
      duration: 2500,
      position: 'bottom'
    });
    this.location.back();
    await toast.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The ${this.surenames} has been added successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          this.location.back();
        }
      }
      ]
    });

    await alert.present();
  }

}
