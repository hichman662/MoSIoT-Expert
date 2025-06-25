/* eslint-disable @typescript-eslint/naming-convention */
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Practitioner } from 'src/app/models/practitioner.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-practitioner',
  templateUrl: './add-practitioner.page.html',
  styleUrls: ['./add-practitioner.page.scss'],
})
export class AddPractitionerPage implements OnInit {

  practitionerForm: FormGroup;
  email = '';
  practitioner: Practitioner;
  public idScenario: number;
  invitedUserName: string;
  invitedUserId: number;
  findNotAlreadyPractitioner: any [] = [];

  data: any;
  constructor(
    public navCtrl: NavController,
    private patientService: PatientService,
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage
  ) {

    this.practitionerForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    Pass: new FormControl('', [
      Validators.required
    ]),
    UserPractitioner_oid: new FormControl(Number, [
      Validators.required
    ])
  });
}

  ngOnInit() {
  }

  ionViewWillEnter(){
    /* this.storage.get('idScenario').then((val) => {
      this.patientForm.get('Scenario_oid').setValue(val);
    }); */

    this.userService.getAllUsers()
    .subscribe( (res: any) => {
      console.log(res);
      this.findNotAlreadyPractitioner = res.filter( obj =>  obj.Practitioner === null);
      console.log(this.findNotAlreadyPractitioner);
        }, ( err ) => {
    });

    this.invitedUserName = this.userService.nameNewUser;
    this.invitedUserId = this.userService.idNewUser;

  }
  onSubmit(){
    this.patientService.createPractitioner(this.practitionerForm.value)
    .subscribe( (res: any) => {
      this.email = res.Email;
     /*  this.userService.removeUserId();
      this.userService.removeUserName(); */

      this.presentAlert();
    }, ( err ) => {

    });

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'SUCCESS!',
      message: `The ${this.email} has been added successfully`,
      buttons: [  {
        text: 'Ok',
        handler: () => {
          this.router.navigateByUrl('/tabs/tab1/practitioner');
        }
      }
      ]
    });

    await alert.present();
  }


}
