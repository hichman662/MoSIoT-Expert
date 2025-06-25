import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage
  },
  {
    path: 'detail-patient/:Id',
    loadChildren: () => import('./detail-patient/detail-patient.module').then( m => m.DetailPatientPageModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('./add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientPageRoutingModule {}
