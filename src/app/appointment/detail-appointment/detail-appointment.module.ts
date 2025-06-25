import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailAppointmentPageRoutingModule } from './detail-appointment-routing.module';

import { DetailAppointmentPage } from './detail-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailAppointmentPageRoutingModule,
    MatExpansionModule,
    TranslateModule
  ],
  declarations: [DetailAppointmentPage]
})
export class DetailAppointmentPageModule {}
