import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { PatientService } from './../services/patient.service';
import { Practitioner } from './../models/practitioner.model';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.page.html',
  styleUrls: ['./practitioner.page.scss'],
})
export class PractitionerPage implements OnInit {

  public practitioners: Practitioner[] = [];
  public practitionerNull = false;
  public idScenario: number;
  constructor(
    private patientService: PatientService,
    private userService: UserService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit(): void{

  }
  ionViewWillEnter(){
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callPractitioner();
      }
    });

  }
  callPractitioner(){
    this.userService.getPractitionerByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      console.log(res);
      if(res != null){
        this.practitioners = res;
        this.practitionerNull = false;
      }else{
        this.practitioners = null;
        this.practitionerNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  closeSliding(slidingItem: IonItemSliding){
    slidingItem.close();
  }

  async deletePractitioner(slidingItem: IonItemSliding, id: number, name: string){
    slidingItem.close();
    console.log(id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Remove Practitioner',
      message: `Are you sure you want remove ${name}?`,
      buttons: [  {
        text: 'Cancel',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          this.patientService.deletePractitioner(id)
          // tslint:disable-next-line: deprecation
          .subscribe( (res: any) => {
            this.ionViewWillEnter();
          }, ( err) => {
              console.log(err);
          });
        }
      }]
    });

    await alert.present();

  }

}
