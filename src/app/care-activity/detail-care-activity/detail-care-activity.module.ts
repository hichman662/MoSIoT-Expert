import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCareActivityPageRoutingModule } from './detail-care-activity-routing.module';

import { DetailCareActivityPage } from './detail-care-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCareActivityPageRoutingModule
  ],
  declarations: [DetailCareActivityPage]
})
export class DetailCareActivityPageModule {}
