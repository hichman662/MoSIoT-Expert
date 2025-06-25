import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPatientPage } from './add-patient.page';

const routes: Routes = [
  {
    path: '',
    component: AddPatientPage
  },
  {
    path: 'add-user',
    loadChildren: () => import('../add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'add-patient-access',
    loadChildren: () => import('../../patient-access/add-patient-access/add-patient-access.module').then( m => m.AddPatientAccessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPatientPageRoutingModule {}
