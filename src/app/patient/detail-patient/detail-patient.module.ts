import { TranslateModule } from '@ngx-translate/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { DetailProfileComponent } from './../detail-profile/detail-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPatientPageRoutingModule } from './detail-patient-routing.module';

import { DetailPatientPage } from './detail-patient.page';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPatientPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule,
    TranslateModule

  ],
  declarations: [DetailPatientPage,
    DetailProfileComponent]
  })
export class DetailPatientPageModule {}
