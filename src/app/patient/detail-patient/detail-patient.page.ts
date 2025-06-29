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
    standalone: false
})
export class DetailPatientPage implements OnInit {

  public patientName : string = '';
  public patientDescrip : string = '';
  public patientData: UserData = new UserData();
  public idScenario: number = 0;
  public patientEmail: string = '';
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
    this.idPassedByURL = this.route.snapshot.params['Id'];
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
    .subscribe((res: UserData[] ) => {
      console.log(res);
    if(res && res[0]?.patient?.id){
      this.storage.set('idPatient',res[0].patient.id);

       this.patientName = res[0].name ?? '';
       this.patientDescrip = res[0].description ?? '';
       this.patientEmail = res[0].patient.email ?? '';
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
