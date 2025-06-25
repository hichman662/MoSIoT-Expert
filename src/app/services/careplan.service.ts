import { Communication } from './../models/communication.model';
import { Medication } from './../models/medication.model';
import { Appointment } from './../models/appointment.model';
import { Attribute } from './../models/attribute.model';
import { Entity } from './../models/entity.model';
import { CarePlanTemplate } from './../models/carePlanTemplate.model';
/* eslint-disable max-len */
import { VitalSign } from './../models/vitalSign.model';

/* eslint-disable @typescript-eslint/ban-types */

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {of, Observable} from 'rxjs';
import { CarePlan } from '../models/carePlan.model';
import { CareActivity } from '../models/careActivity.model';
import { Nutrition } from '../models/nutrition.model';




@Injectable({
  providedIn: 'root'
})
export class CarePlanService {

public temporalAddedActivities: number[] = [];

constructor(private http: HttpClient) {

}


get getTemporalAddedActivity(): number[]{
  return this.temporalAddedActivities;
}

set setTemporalAddActivity(idActivity: number){
 this.temporalAddedActivities.push(idActivity);
}

get clearTemporalActivityArray(): boolean{
  this.temporalAddedActivities = [];
  return true;
}


// Care Plan Template By id PatientProfile
public getCarePlantemplateByIdPatientProfile( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlanTemplate>(`${environment.base_url}/CarePlanTemplate/PatientProfileCarePlanTemplate?idPatientProfile=${uid}` );
}

// Care Plan
public getAllCarePlan(): Observable<object>{
  return this.http.get(`${environment.base_url}/CarePlan/ReadAll`);
}

public getCarePlanById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlan>(`${environment.base_url}/CarePlan/${uid}` );
}

public getCarePlanByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlan>(`${environment.base_url}/CarePlan/CarePlanScenario?idIoTScenario=${uid}` );
}

public createCarePlan( data: CarePlan ): Observable<object> {
  return this.http.post(`${environment.base_url}/CarePlan/New_`, data);
}

public deleteCarePlan(uid) {
  return this.http.delete(`${environment.base_url}/CarePlan/Destroy?p_careplan_oid=${uid}`);
}

// Vital Signs

public getAllVitalSign(): Observable<object>{
  return this.http.get(`${environment.base_url}/VitalSign/ReadAll`);
}

public getVitalSignById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <VitalSign>(`${environment.base_url}/VitalSign/${uid}` );
}

public getVitalSignByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <VitalSign>(`${environment.base_url}/VitalSign/VitalSignsScenario?idIoTScenario=${uid}` );
}
public createVitalSign( data: CarePlan ): Observable<object> {
  return this.http.post(`${environment.base_url}/VitalSign/New_`, data);
}

public deleteVitalSign(uid) {
  return this.http.delete(`${environment.base_url}/VitalSign/Destroy?p_vitalsign_oid=${uid}`);
}


//**************************************************** */
// Care Activities

public getAllCareActivities(): Observable<object>{
  return this.http.get(`${environment.base_url}/IMCareActivity/ReadAll`);
}

public getCareActivityById( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CareActivity>(`${environment.base_url}/IMCareActivity/${uid}` );
}

public getCareActivityByIdScenario( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CareActivity>(`${environment.base_url}/IMCareActivity/CareActivitiesScenario?idIoTScenario=${uid}` );
}

public getCareActivityByIdCarePlanTemplate( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CareActivity>(`${environment.base_url}/CareActivity/CarePlanActivities?idCarePlanTemplate=${uid}` );
}

public createCareActivity( data: CareActivity ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMCareActivity/New_`, data);
}

// Appointment
public getAppointmentByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMAppointment/AppointmentCareActitivy?idIMCareActivity=${uid}`);
}

public getAppointmentsByIdScenario(uid: number): Observable<Appointment[]>{
  if (!uid) { uid = null; }
  return this.http.get <Appointment[]>(`${environment.base_url}/IMAppointment/AppointmentsCare?idIoTScenario=${uid}`);
}

public deleteAppointment(uid) {
  return this.http.delete(`${environment.base_url}/IMAppointment/Destroy?p_imappointment_oid=${uid}`);
}

public createAppointment( data: Appointment ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMAppointment/New_`, data);
}

public assignTemplateAppointment( idNewAppointment: number,idCareActivity: number, idAppointmentTemplate: number ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMAppointment/AssignTemplate?p_imappointmentoid=${idNewAppointment}&p_oidcareactivity=${idCareActivity}&p_oidappointment=${idAppointmentTemplate}`, null);
}


// Medication
public getMedicationByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMMedication/MedicationCareActivity?idIMCareActivity=${uid}` );
}
public getMedicationsByIdScenario(uid: number): Observable<Medication[]>{
  if (!uid) { uid = null; }
  return this.http.get <Medication[]>(`${environment.base_url}/IMMedication/Medications?idIoTScenario=${uid}`);
}

public createMedication( data: Medication ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMMedication/New_`, data);
}

public deleteMedication(uid) {
  return this.http.delete(`${environment.base_url}/IMMedication/Destroy?p_immedication_oid=${uid}`);
}

public assignTemplateMedication( idNewMedication: number,idCareActivity: number, idMedicationTemplate: number ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMMedication/AssignTemplate?p_immedicationoid=${idNewMedication}&p_oidcareactivity=${idCareActivity}&p_oidmedication=${idMedicationTemplate}`, null);
}

//Nutrition Order
public getNutritionyByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMNutritionOrder/NutritionOrderCareActivity?idIMCareActivity=${uid}` );
}
public getnutritionsByIdScenario(uid: number): Observable<Nutrition[]>{
  if (!uid) { uid = null; }
  return this.http.get <Nutrition[]>(`${environment.base_url}/IMNutritionOrder/NutritionsCare?idIoTScenario=${uid}`);
}
public deleteNutrition(uid) {
  return this.http.delete(`${environment.base_url}/IMNutritionOrder/Destroy?p_imnutritionorder_oid=${uid}`);
}

public createNutritionOrder( data: Nutrition ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMNutritionOrder/New_`, data);
}

public assignTemplateNutritionOrder( idNewNutrition: number,idCareActivity: number, idNutritionTemplate: number ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMNutritionOrder/AssignTemplate?p_imnutritionoid=${idNewNutrition}&p_oidcareactivity=${idCareActivity}&p_oidnutritionorder=${idNutritionTemplate}`, null);
}

//Communication
public getCommunicationByIdCareActivity( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMCommunication/CommunicationCareActivity?idIMCareActivity=${uid}` );
}

public getCommunicationByIdScenario(uid: number): Observable<Communication[]>{
  if (!uid) { uid = null; }
  return this.http.get <Communication[]>(`${environment.base_url}/IMCommunication/CommunicationsCare?idIoTScenario=${uid}`);
}

public deleteCommunication(uid) {
  return this.http.delete(`${environment.base_url}/IMCommunication/Destroy?p_imcommunication_oid=${uid}`);
}

public createCommunication( data: Communication ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMCommunication/New_`, data);
}

public assignTemplateCommunication( idNewCommunication: number,idCareActivity: number, idCommunicationTemplate: number ): Observable<object> {
  return this.http.post(`${environment.base_url}/IMCommunication/AssignTemplate?p_imcommunicationoid=${idNewCommunication}&p_oidcareactivity=${idCareActivity}&p_oidcomunication=${idCommunicationTemplate}`, null);
}

// Goal
public getGoalByIdCarePlan( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMGoal/GoalsCarePlan?idCarePlan=${uid}` );
}

//Target
public getTargetByIdCarePlan( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <any>(`${environment.base_url}/IMTarget/TargetsCarePlan?idCarePlan=${uid}` );
}

//
// Assign Care Plan Template to Care Plan
public assignCarePlanTemplateToCarePlan(carePlanId: number, carePlanTemplateId: number): Observable<object> {
  return this.http.post(`${environment.base_url}/CarePlan/AssignCarePlan?p_careplan_oid=${carePlanId}&p_template_oid=${carePlanTemplateId}`,null);
}

public getCarePlanTemplateByIdPatientProfile( uid: number): Observable<object>{
  if (!uid) { uid = null; }
  return this.http.get <CarePlanTemplate>(`${environment.base_url}/CarePlanTemplate/PatientProfileCarePlanTemplate?idPatientProfile=${uid}` );
}


}
