import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientAccessPageRoutingModule } from './patient-access-routing.module';

import { PatientAccessPage } from './patient-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientAccessPageRoutingModule,
    TranslateModule
  ],
  declarations: [PatientAccessPage]
})
export class PatientAccessPageModule {}
