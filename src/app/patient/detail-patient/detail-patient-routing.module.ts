import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPatientPage } from './detail-patient.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPatientPage
  },
  {
    path: 'add-patient',
    loadChildren: () => import('../add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPatientPageRoutingModule {}
