/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { UserData } from './../../models/userData.model';
import { PatientService } from './../../services/patient.service';
import { PractitionerData } from './../../models/practitionerData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-practitioner',
  templateUrl: './detail-practitioner.page.html',
  styleUrls: ['./detail-practitioner.page.scss'],
})
export class DetailPractitionerPage implements OnInit {


  public practitionerEmail: string;
  public practitionerData: UserData = null;
  segmentModel = 'details';
  private idPassedByURL: number = null;
  load: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params.Id;
    console.log(this.idPassedByURL);
    this.userService.getUserById(this.idPassedByURL)
    .subscribe((res: UserData ) => {
    if(res != null){
      console.log(res);
      // this.practitionerEmail = res.Practitioner.Email;
       this.practitionerData = res;
       this.load= true;
    }
    }, (err) => {
      console.log(err);
    });
  }

}
