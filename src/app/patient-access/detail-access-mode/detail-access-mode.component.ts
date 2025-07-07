/* eslint-disable @typescript-eslint/naming-convention */
import { AdaptationTypeRequired } from './../../models/adaptationTypeRequired.model';
import { AdaptationRequest } from './../../models/adaptationRequest.model';
import { PatientService } from './../../services/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdaptationDetailRequired } from 'src/app/models/adaptationDetailRequired.model';

@Component({
    selector: 'app-detail-access-mode',
    templateUrl: './detail-access-mode.component.html',
    styleUrls: ['./detail-access-mode.component.scss'],
    standalone: false
})
export class DetailAccessModeComponent implements OnInit {

  public adaptationRequests: AdaptationRequest [] = [];
  public adaptationTypes: AdaptationTypeRequired [] = [];
  public adaptationDetails: AdaptationDetailRequired [] = [];
    segmentModel = 'AdaptationRequest';
  private idPassedByURL: number = 0;
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params['Id'];
    this.patientService.getPatientAccessById(this.idPassedByURL)
    .subscribe((res: any ) => {
    if(res != null){

       this.adaptationRequests = res.accessMode.adaptationRequest;
      this.adaptationTypes = res.accessMode.adaptationType;
      this.adaptationDetails = res.accessMode.adaptationDetail;
    }
    }, (err) => {
      console.log(err);
    });
  }

}
