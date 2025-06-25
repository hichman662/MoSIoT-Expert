import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../../progress-bar/progress-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarePlanPageRoutingModule } from './add-care-plan-routing.module';

import { AddCarePlanPage } from './add-care-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCarePlanPageRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TranslateModule
  ],
  declarations: [AddCarePlanPage]
})
export class AddCarePlanPageModule {}
