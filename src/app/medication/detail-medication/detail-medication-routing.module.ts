import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailMedicationPage } from './detail-medication.page';

const routes: Routes = [
  {
    path: '',
    component: DetailMedicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailMedicationPageRoutingModule {}
