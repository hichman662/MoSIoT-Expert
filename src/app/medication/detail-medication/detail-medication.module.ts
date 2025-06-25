import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailMedicationPageRoutingModule } from './detail-medication-routing.module';

import { DetailMedicationPage } from './detail-medication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailMedicationPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailMedicationPage]
})
export class DetailMedicationPageModule {}
