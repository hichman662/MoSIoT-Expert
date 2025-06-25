/* eslint-disable @typescript-eslint/no-inferrable-types */
import { PatientProfile } from './../../models/patientProfile.model';
/* eslint-disable @typescript-eslint/naming-convention */
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.page.html',
  styleUrls: ['./detail-patient.page.scss'],
})
export class DetailPatientPage implements OnInit {

  public patientName = '';
  public patientDescrip = '';
  public patientData: UserData;
  public idScenario: number;
  public patientEmail = '';
  public patientNull = false;
  load: boolean = false;
  segmentModel = 'details';
  idPassedByURL = '';


  constructor(
    private patientService: PatientService,
    private userService: UserService,
    private route: ActivatedRoute,
    private storage: Storage

  ) { }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params.Id;
    if(this.idPassedByURL === 'profile'){
      this.segmentModel = 'profile';
    }else{
      this.segmentModel = 'details';
    }
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario !== 0){
        this.callingPatient();
      }
    });
  }

  callingPatient(){
    this.userService.getPatientByIdScenario(this.idScenario)
    .subscribe((res: Patient ) => {
      console.log(res);
    if(res != null){
      this.storage.set('idPatient',res[0].Patient.Id);
       this.patientName = res[0].Name;
       this.patientDescrip = res[0].Description;
       this.patientEmail = res[0].Patient.Email;
       this.patientData = res[0];
       this.load= true;

    }else{
      this.patientNull = true;
      this.load= false;
    }
    }, (err) => {
      console.log(err);
    });
  }

}
