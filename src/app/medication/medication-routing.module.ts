import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicationPage } from './medication.page';

const routes: Routes = [
  {
    path: '',
    component: MedicationPage
  },
  {
    path: 'detail-medication/:Id',
    loadChildren: () => import('./detail-medication/detail-medication.module').then( m => m.DetailMedicationPageModule)
  },
  {
    path: 'add-medication/:Id',
    loadChildren: () => import('../care-activity/care-activity.module').then( m => m.CareActivityPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicationPageRoutingModule {}
