/* eslint-disable max-len */
import { Appointment } from './../models/appointment.model';
import { Medication } from './../models/medication.model';
import { DeviceService } from './../services/device.service';
import { PatientService } from './../services/patient.service';
import { UserData } from './../models/userData.model';
import { Disability } from './../models/disability.model';
import { PatientProfile } from './../models/patientProfile.model';
import { UserService } from './../services/user.service';
import { ScenarioService } from './../services/scenario.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Scenario } from '../models/scenario.model';
import { Disease } from '../models/disease.model';
import { CarePlanService } from './../services/careplan.service';
import { CarePlan } from './../models/carePlan.model';
import { PatientAccess } from '../models/patientAccess.model';
import { Device } from '../models/device.model';
import { Nutrition } from '../models/nutrition.model';
import { Communication } from '../models/communication.model';

@Component({
    selector: 'app-tab0',
    templateUrl: './tab0.page.html',
    styleUrls: ['./tab0.page.scss'],
    standalone: false
})
export class Tab0Page implements OnInit {
  public patientProfile: PatientProfile = new PatientProfile();
  public diseases: Disease [] = [];
  public disabilities: Disability [] = [];
  public patientProfileNull = false;
  public patientNull = false;
  public patientName = '';
  public patientSurnames = '';
  patientDescription = '';
  load = false;
  public scenario: Scenario = new Scenario ();
  public idScenario: number = 0;
  public scenarioName: string = '';
  public carePlans: CarePlan[] = [];
  public carePlanNull = false;
  token : string = '';
  segmentModel = 'diseases';
  public patientAccess: PatientAccess[] = [];
  public patientAccessNull = false;
  public devices: Device[] = [];
  devicesNull= false;
  public nutritions: Nutrition[] = [];
  public nutritionNull = false;
  public medications: Medication[] = [];
  public medicationNull = false;
  public appointments: Appointment[] = [];
  public appointmentNull = false;
  public communications: Communication[] = [];
  public communicationNull = false;

  constructor(private storage: Storage,
    private scenarioService: ScenarioService,
    private userService: UserService,
    private carePlanService: CarePlanService,
    private patientService: PatientService,
    private deviceService: DeviceService
)
   { }

 ngOnInit() {

  }

  async ionViewWillEnter(){
    this.idScenario = await this.storage.get('idScenario');
    console.log('I´m carrying Scenario Id', this.idScenario);
    this.storage.get('token').then((val) => {
      this.token = val;
      console.log(val);
      if(this.token !== null && this.idScenario !== null && this.idScenario !== undefined){
        this.getEscenarioById (this.idScenario, this.token);
        this.callingPatientByIdScenario(this.idScenario);
        this.callCarePlans(this.idScenario);
      }
    });
  }

  async getEscenarioById( id: number, token: any){
    console.log();
    await this.scenarioService.getScenarioById(id, token)
    .subscribe( (res: Scenario) => {
        this.scenario = res;
        this.load = true;
        console.log(this.scenario);
       // this.router.navigateByUrl('/scenarios', { replaceUrl:true });
    }, ( err) => {
        console.log(err);
    });
  }

async callingPatientByIdScenario(id: number) {
  this.userService.getPatientByIdScenario(id)
    .subscribe((res: UserData[]) => {
      const user = res?.[0];

      if (user) {
        this.patientName = user.name ?? '';
        this.patientSurnames = user.surnames ?? '';
        this.patientDescription = user.description ?? '';
        this.patientNull = false;

        const profile = user.patient?.patientProfile;

        if (profile) {
          this.patientProfile = profile;
          this.diseases = profile.diseases ?? [];
          this.disabilities = profile.disabilities ?? [];
          this.patientProfileNull = false;
          this.load = true;
        } else {
          this.patientProfileNull = true;
          this.storage.set('idPatientProfile', null);
        }
      } else {
        this.patientNull = true;
        this.storage.set('idPatient', null);
        this.patientProfileNull = true;
        this.storage.set('idPatientProfile', null);
      }
    }, (err) => {
      console.error(err);
    });
}



  callCarePlans(id: number){
    this.carePlanService.getCarePlanByIdScenario(id)
    .subscribe( (res: any) => {
      if(res !== null){
        this.carePlans = res;
        this.carePlanNull = false;
      }else{
        this.carePlans = [];
        this.carePlanNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }


}

