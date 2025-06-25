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
import { Component, OnInit ,Input} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Scenario } from '../models/scenario.model';
import { Disease } from '../models/disease.model';
import { CarePlanService } from './../services/careplan.service';
import { Device } from '../models/device.model';
import { Nutrition } from '../models/nutrition.model';
import { Communication } from '../models/communication.model';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {

  public patientProfileNull   = true;
  public patientNull   = true;
  public scenarioNull = true;
  public idScenario: number = null;
  public carePlanNull   = true;
  public patientAccessNull   = true;
  public devicesNull  = true;
  public nutritionNull   = true;
  public medicationNull   = true;
  public appointmentNull   = true;
  public communicationNull   = true;

  constructor(
    private storage: Storage,
    private userService: UserService,
    private carePlanService: CarePlanService,
    private patientService: PatientService,
    private deviceService: DeviceService
    )
   { }

 async ngOnInit() {
  this.storage.get('idScenario').then(( val) => {
    this.idScenario = val;
    if(this.idScenario !== null && this.idScenario !== undefined){
      this.scenarioNull = false;
      this.callingPatientByIdScenario();
      this.callCarePlans();
      this.callPatientAccess();
      this.callDevice();
      this.callNutritions();
      this.callAppointments();
      this.callCommunications();
      this.callMedications();
    }
    else{
      this.scenarioNull = true;
    }
  });
  }

  callingPatientByIdScenario(){
     this.userService.getPatientByIdScenario(this.idScenario)
    .subscribe((res: UserData[] ) => {
      if(res !== null){
        this.patientNull = false;
      }else{
        this.patientNull = true;
        this.storage.set('idPatient',null);
      }
    }, (err) => {
      console.log(err);
    });

  }


  callCarePlans(){
    this.carePlanService.getCarePlanByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res !== null){

        this.carePlanNull   = false;
      }else{

        this.carePlanNull   = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callPatientAccess(){
    this.patientService.getPatientAccessByIdScenario(this.idScenario)
    .subscribe( (res: any) => {
      if(res !== null){

        this.patientAccessNull = false;
      }else{

        this.patientAccessNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callNutritions(){
    this.carePlanService.getnutritionsByIdScenario(this.idScenario)
    .subscribe( (res: Nutrition[]) => {
      if(res !== null){

        this.nutritionNull = false;
      }else{

        this.nutritionNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callMedications(){
    this.carePlanService.getMedicationsByIdScenario(this.idScenario)
    .subscribe( (res: Medication[]) => {
      if(res !== null){
        this.medicationNull = false;
      }else{
        this.medicationNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callAppointments(){
    this.carePlanService.getAppointmentsByIdScenario(this.idScenario)
    .subscribe( (res: Appointment[]) => {
      if(res !== null){
        this.appointmentNull = false;
      }else{
        this.appointmentNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }

  callCommunications(){
    this.carePlanService.getCommunicationByIdScenario(this.idScenario)
    .subscribe( (res: Communication[]) => {
      if(res !== null){
        this.communicationNull = false;
      }else{
        this.communicationNull = true;
      }
    }, ( err) => {
        console.log(err);
    });
  }
  callDevice(){
    this.deviceService.getDeviceByIdScenario(this.idScenario)
    .subscribe( (res: Device[]) => {
        if(res !== null){
          this.devicesNull = false;
        }else{
          this.devicesNull = true;
        }
    }, ( err) => {
        console.log(err);
    });
  }

}


