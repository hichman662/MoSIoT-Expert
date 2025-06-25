import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailAppointmentPage } from './detail-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: DetailAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailAppointmentPageRoutingModule {}
