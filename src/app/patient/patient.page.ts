import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { PatientService } from './../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Patient } from '../models/patient.model';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.page.html',
    styleUrls: ['./patient.page.scss'],
    standalone: false
})
export class PatientPage implements OnInit {

  public patient: Patient = new Patient();

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
    .subscribe( (res: Patient) => {
      console.log(res);
        this.patient = res;
    }, ( err) => {
        console.log(err);
    });
  }

}
