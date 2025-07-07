import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientAccessPage } from './patient-access.page';

const routes: Routes = [
  {
    path: '',
    component: PatientAccessPage
  },
  {
    path: 'detail-patient-access/:Id',
    loadChildren: () => import('./detail-patient-access/detail-patient-access.module').then( m => m.DetailPatientAccessPageModule)
  },
  {
    path: 'add-patient-access/:Id',
    loadChildren: () => import('./add-patient-access/add-patient-access.module').then( m => m.AddPatientAccessPageModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('./../patient/add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  },
  {
    path: 'patient/:Id',
    loadChildren: () => import('../patient/detail-patient/detail-patient.module').then( m => m.DetailPatientPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientAccessPageRoutingModule {}
