import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../../progress-bar/progress-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPatientPageRoutingModule } from './add-patient-routing.module';

import { AddPatientPage } from './add-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPatientPageRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TranslateModule
  ],
  declarations: [AddPatientPage]
})
export class AddPatientPageModule {}
