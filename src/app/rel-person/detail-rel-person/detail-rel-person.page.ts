/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { UserService } from './../../services/user.service';
import { PatientService } from './../../services/patient.service';
import { RelatedPersonData } from './../../models/relatedPersonData.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userData.model';

@Component({
  selector: 'app-detail-rel-person',
  templateUrl: './detail-rel-person.page.html',
  styleUrls: ['./detail-rel-person.page.scss'],
})
export class DetailRelPersonPage implements OnInit {


  public relPersonData: UserData = new UserData();
  relPersonEmail: string = '';
  segmentModel = 'details';
  private idPassedByURL: number = 0;
  load: boolean = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    this.idPassedByURL = this.route.snapshot.params['Id'];
    this.userService.getUserById(this.idPassedByURL)
    .subscribe((res: UserData ) => {
      console.log(res);
    if(res && res.RelatedPerson){
       this.relPersonData = res;
      this.relPersonEmail = res.RelatedPerson.Email ?? '';
      this.load= true;
    }
    }, (err) => {
      console.log(err);
    });
  }

}
