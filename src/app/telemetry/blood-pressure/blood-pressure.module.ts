import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloodPressurePageRoutingModule } from './blood-pressure-routing.module';

import { BloodPressurePage } from './blood-pressure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodPressurePageRoutingModule,
    TranslateModule
  ],
  declarations: [BloodPressurePage]
})
export class BloodPressurePageModule {}
