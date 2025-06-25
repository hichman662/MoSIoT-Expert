import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../progress-bar/progress-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareActivityPageRoutingModule } from './care-activity-routing.module';

import { CareActivityPage } from './care-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CareActivityPageRoutingModule,
    ProgressBarModule,
    TranslateModule
  ],
  declarations: [CareActivityPage]
})
export class CareActivityPageModule {}
