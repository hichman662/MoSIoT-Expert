import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { PatientService } from './../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserData } from '../models/userData.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {

  public patient: UserData = new UserData();
  public idScenario: number = 0;
  constructor(
    private userService: UserService,
    public router: Router,
    private storage: Storage

  ) { }

  ngOnInit() {
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario != null){
        this.callPatient();
      }
    });
  }
  callPatient(){
    this.userService.getPatientByIdScenario(this.idScenario)
    .subscribe( (res: UserData[]) => {
      console.log(res[0]);
        this.patient = res[0];
    }, ( err) => {
        console.log(err);
    });
  }

}
