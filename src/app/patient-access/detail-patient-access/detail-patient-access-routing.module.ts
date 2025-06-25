import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPatientAccessPage } from './detail-patient-access.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPatientAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPatientAccessPageRoutingModule {}
