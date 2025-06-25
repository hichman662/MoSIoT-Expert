import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarePlanPageRoutingModule } from './care-plan-routing.module';

import { CarePlanPage } from './care-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarePlanPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [CarePlanPage]
})
export class CarePlanPageModule {}
