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
    standalone: false
})
export class AddUserPage implements OnInit {

  userForm: FormGroup;
  surenames = '';
  user: UserData = new UserData();
  textAlertSuccess: string = '';
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
  name: new FormControl('', [Validators.required]),
  surnames: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  type: new FormControl(1, [Validators.required]),  
  isDiseased: new FormControl(false, [Validators.required]),  
  isActive: new FormControl(false, [Validators.required]),  
  scenario_oid: new FormControl(null, [Validators.required]) 
});



  translateService.get('TOASTALERT.addSuccessfully').subscribe(value => {
     this.textAlertSuccess = value;
   });
}

  ngOnInit() {
  this.storage.get('idScenario').then((val) => {
    if (val) {
        this.userForm.get('scenario_oid')?.setValue(val);
    } else {
        // Handle the case where no valid scenario_oid is available
        console.log('Scenario ID is missing');
    }
});

  }

 onSubmit() {
 
  const formData = this.userForm.value;
  formData.type = Number(formData.type);  
  this.userService.createUser(formData).subscribe(
    (res: any) => {
      console.log('Response:', res);
      this.surenames = res.surnames;
      this.presentToast('success');
    },
    (err) => {
  
      console.error('Error creating user:', err);
      this.presentToast('danger'); 
    }
  );
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
