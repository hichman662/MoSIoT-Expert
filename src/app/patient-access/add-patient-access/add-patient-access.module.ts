import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../../progress-bar/progress-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPatientAccessPageRoutingModule } from './add-patient-access-routing.module';

import { AddPatientAccessPage } from './add-patient-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPatientAccessPageRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TranslateModule
  ],
  declarations: [AddPatientAccessPage]
})
export class AddPatientAccessPageModule {}
