/* eslint-disable @typescript-eslint/naming-convention */
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { RelatedPerson } from 'src/app/models/relatedPerson.model';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-rel-person',
    templateUrl: './add-rel-person.page.html',
    styleUrls: ['./add-rel-person.page.scss'],
    standalone: false
})
export class AddRelPersonPage implements OnInit {

  relPersonForm: FormGroup;
  email = '';
  practitioner: RelatedPerson = new RelatedPerson();
  public idScenario: number = 0;
  invitedUserName: string = '';
  invitedUserId: number = 0;
  findNotAlreadyRelatedPerson: any [] = [];

  data: any;
  constructor(
    public navCtrl: NavController,
    private patientService: PatientService,
    private userService: UserService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage
  ) {

    this.relPersonForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    Pass: new FormControl('', [
      Validators.required
    ]),
    UserRelatedPerson_oid: new FormControl(Number, [
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
      this.findNotAlreadyRelatedPerson = res.filter((obj: any) => obj.RelatedPerson === null);
      console.log(this.findNotAlreadyRelatedPerson);
        }, ( err ) => {
    });

    if(this.userService.nameNewUser !== undefined){
      this.invitedUserName = this.userService.nameNewUser;
      this.invitedUserId = this.userService.idNewUser;
    }

  }
  onSubmit(){
    this.patientService.createRelatedPerson(this.relPersonForm.value)
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
          this.router.navigateByUrl('/tabs/tab1/relatedPerson');
        }
      }
      ]
    });

    await alert.present();
  }



}
