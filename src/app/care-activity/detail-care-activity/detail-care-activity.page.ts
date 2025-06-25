import { CarePlanService } from './../../services/careplan.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CareActivity } from 'src/app/models/careActivity.model';
@Component({
  selector: 'app-detail-care-activity',
  templateUrl: './detail-care-activity.page.html',
  styleUrls: ['./detail-care-activity.page.scss'],
})
export class DetailCareActivityPage implements OnInit {

  public patientName: '';
  public patientDescrip: '';
  public patientData: CareActivity;
  public idScenario: number;
  segmentModel = 'details';

  constructor(
    private carePlanService: CarePlanService,
    private route: ActivatedRoute,
    private storage: Storage

  ) { }


  ngOnInit() {
    this.storage.get('idScenario').then((val) => {
      this.idScenario = val;
      if(this.idScenario !== 0){
        this.callingPatient();
      }
    });
  }
  callingPatient(){
    this.carePlanService.getCarePlanByIdScenario(this.idScenario)
    .subscribe((res: any ) => {
      console.log(res);
    if(res != null){
       this.patientName = res[0].Name;
       this.patientDescrip = res[0].Description;
       this.patientData = res[0].UserData;

    }
    }, (err) => {
      console.log(err);
    });
  }

}
