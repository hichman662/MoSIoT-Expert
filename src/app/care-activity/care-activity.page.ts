import { ActivatedRoute } from '@angular/router';
/* eslint-disable @typescript-eslint/quotes */
import { CarePlanService } from './../services/careplan.service';
import { Router, RouterLinkActive } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CareActivity } from '../models/careActivity.model';
@Component({
    selector: 'app-care-activity',
    templateUrl: './care-activity.page.html',
    styleUrls: ['./care-activity.page.scss'],
    standalone: false
})
export class CareActivityPage implements OnInit {

  public careActivities: any[] = [];
  public idScenario: number = 0;
  public valueCareActivity: number = 0;
  public careActivityNull = false;
  public nameCareActivity = '';
  public idPatientProfile: number = 0;
  public idcarePlanTemplate: number = 0;
  public addedCareActivityList: any [] = [];
  public listFilter = 'all';
  constructor(
    private carePlanService: CarePlanService,
    public router: Router,
    public route: ActivatedRoute,
    private storage: Storage

  ) { }

  ngOnInit() {

    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
    });
    this.storage.get('idcarePlanTemplate').then((val) => {
      this.idcarePlanTemplate = val;
      if(this.idcarePlanTemplate != null){
        this.callCareActivityByIdCarePlanTemplate();
      }
    });
    this.storage.get('idPatientProfile').then((val) => {
      this.idPatientProfile = val;
      if(this.idPatientProfile != null){
        //this.callCarePlanTemplatesByIdPatientProfile();
      }
    });
  }


  ionViewWillEnter(){
    this.listFilter = this.route.snapshot.params['Id'];
    console.log("Type of filter: " + this.listFilter);
    this.addedCareActivityList = this.carePlanService.getTemporalAddedActivity;
   console.log(this.addedCareActivityList);
  }


  callCarePlanTemplatesByIdPatientProfile(){
    this.carePlanService.getCarePlanTemplateByIdPatientProfile(this.idPatientProfile)
    .subscribe( (res: any) => {
      if(res != null){
        this.careActivities = res;
        res.filter( (obj:any )=>  obj.Patient === null);
        this.nameCareActivity = res.name;
        this.careActivityNull= false;
      }else{
        this.careActivityNull= true;
        this.careActivities = [];
      }
      console.log(res);

    }, ( err) => {
        console.log(err);
    });
  }



  callCareActivityByIdCarePlanTemplate(){
    this.carePlanService.getCareActivityByIdCarePlanTemplate(this.idcarePlanTemplate)
    .subscribe( (res: any) => {
      if(res != null){
        this.careActivities = res;
        this.nameCareActivity = res.name;
        this.careActivityNull= false;
      }else{
        this.careActivityNull= true;
        this.careActivities = [];
      }
      console.log(res);

    }, ( err) => {
        console.log(err);
    });
  }

  goToInicio(){
    this.router.navigateByUrl("tabs", { skipLocationChange: false });
  }

  addMedication(careActivityId: number, medicationId: number){
    this.storage.set('careActivityIdForAdd', careActivityId);
    this.storage.set('medicationIdForAdd', medicationId);
    this.router.navigate(['addMedication'], { relativeTo: this.route });
  }

  addNutrition(careActivityId: number, nutritionId: number){
    this.storage.set('careActivityIdForAdd', careActivityId);
    this.storage.set('nutritionIdForAdd', nutritionId);
    this.router.navigate(['addNutrition'], { relativeTo: this.route });
  }

  addAppointment(careActivityId: number, appointmentId: number){
    this.storage.set('careActivityIdForAdd', careActivityId);
    this.storage.set('appointmentIdForAdd', appointmentId);
    this.router.navigate(['addAppointment'], { relativeTo: this.route });
  }

  addCommunication(careActivityId: number, communicationId: number){
    this.storage.set('careActivityIdForAdd', careActivityId);
    this.storage.set('communicationIdForAdd', communicationId);
    this.router.navigate(['addCommunication'], { relativeTo: this.route });
  }
}
