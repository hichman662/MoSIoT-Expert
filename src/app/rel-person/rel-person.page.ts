import { UserData } from 'src/app/models/userData.model';
import { RelatedPerson } from './../models/relatedPerson.model';
import { Router } from '@angular/router';
import { PatientService } from './../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonItemSliding, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-rel-person',
  templateUrl: './rel-person.page.html',
  styleUrls: ['./rel-person.page.scss'],
})
export class RelPersonPage implements OnInit {

  public relatedPersons: UserData[] = [];
  public idScenario: number;
  relPersonNull= false;
  constructor(
    private userService: UserService,
    private patientService: PatientService,
    public router: Router,
    private storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

ngOnInit() {
}

ionViewWillEnter(){
  this.storage.get('idScenario').then((val) => {
    this.idScenario = val;
    console.log('inja id escenario: ' ,this.idScenario);
    if(this.idScenario != null){
      this.callRelatedPerson();
    }
  });

}
callRelatedPerson(){
  this.userService.getRelatedPersonByIdScenario(this.idScenario)
  .subscribe( (res: UserData[]) => {
    console.log(res);
    if(res != null){
    this.relatedPersons = res;
    this.relPersonNull= false;
    }else
    {
      this.relatedPersons = null;
      this.relPersonNull= true;
    }

    console.log(res);
  }, ( err) => {
      console.log(err);
  });
}

closeSliding(slidingItem: IonItemSliding){
  slidingItem.close();
}

async deleterelatedPerson(slidingItem: IonItemSliding, id: number, name: string){
  slidingItem.close();
  console.log(id);
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Remove Related Person',
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
        this.patientService.deleteRelatedPerson(id)
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
