import { PatientService } from './../services/patient.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/userData.model';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  practitionerCounter = 0;
  relatedPersonCounter = 0;
  patientAccessCounter = 0;
  public relPersonNull= false;
  public patientAccessNull = false;
  public practitionerNull = false;
  public idScenario: number;

  constructor(private storage: Storage,
    private userService: UserService,
    private patientService: PatientService
    ) {}


    async ngOnInit() {

      await this.storage.get('idScenario').then((val) => {
        this.idScenario = val;
        if(this.idScenario != null){
          this.callRelatedPerson();
          this.callPatientAccess();
          this.callPractitioner();
        }
      });

    }

    ionViewWillEnter(){
      this.ngOnInit();

    }

  callPatientAccess(){
    this.patientService.getPatientAccessByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res != null){
        this.patientAccessCounter = res.length;
        this.patientAccessNull = false;
      }else{
        this.patientAccessNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callRelatedPerson(){
    this.userService.getRelatedPersonByIdScenario(this.idScenario)
    .subscribe( (res: UserData[]) => {
      console.log(res);
      if(res !== null){
        this.relatedPersonCounter = res.length;
      }else
      {
        this.relPersonNull= true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callPractitioner(){
    this.userService.getPractitionerByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      console.log(res);
      if(res != null){
        this.practitionerCounter = res.length;
        this.practitionerNull = false;
      }else{
        this.practitionerNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }
}
