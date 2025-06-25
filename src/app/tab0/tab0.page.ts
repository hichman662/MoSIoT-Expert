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
})
export class Tab0Page implements OnInit {
  public patientProfile: PatientProfile;
  public diseases: Disease [] = [];
  public disabilities: Disability [] = [];
  public patientProfileNull = false;
  public patientNull = false;
  public patientName = '';
  public patientSurnames = '';
  patientDescription = '';
  load = false;
  public scenario: Scenario;
  public idScenario: number;
  public scenarioName: string;
  public carePlans: CarePlan[] = [];
  public carePlanNull = false;
  token: '';
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

  async callingPatientByIdScenario(id: number){
    await this.userService.getPatientByIdScenario(id)
    .subscribe((res: UserData[] ) => {
      if(res !== null ){
        this.patientName = res[0].Name;
        this.patientSurnames = res[0].Surnames;
        this.patientDescription = res[0].Description;
        this.patientNull = false;
      }else{
        this.patientNull = true;
        this.storage.set('idPatient',null);
      }
      if(res !== null && res[0].Patient.PatientProfile !== null){
        this.patientProfileNull = false;
         this.patientProfile = res[0].Patient.PatientProfile;
        this.diseases = res[0].Patient.PatientProfile.Diseases;
        this.disabilities = res[0].Patient.PatientProfile.Disabilities;
        this.load= true;
      }else{
        this.patientProfileNull = true;
        this.storage.set('idPatientProfile',null);
      }
    }, (err) => {
      console.log(err);
    });

  }


  callCarePlans(id: number){
    this.carePlanService.getCarePlanByIdScenario(id)
    .subscribe( (res: any) => {
      if(res !== null){
        this.carePlans = res;
        this.carePlanNull = false;
      }else{
        this.carePlans = null;
        this.carePlanNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }


}

