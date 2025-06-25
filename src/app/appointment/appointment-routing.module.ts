import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentPage } from './appointment.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentPage
  },
  {
    path: 'detail-appointment/:Id',
    loadChildren: () => import('./detail-appointment/detail-appointment.module').then( m => m.DetailAppointmentPageModule)
  },
  {
    path: 'add-appointment/:Id',
    loadChildren: () => import('../care-activity/care-activity.module').then( m => m.CareActivityPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentPageRoutingModule {}
