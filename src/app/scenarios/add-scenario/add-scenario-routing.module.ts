import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddScenarioPage } from './add-scenario.page';

const routes: Routes = [
  {
    path: '',
    component: AddScenarioPage
  },
  {
    path: 'add-patient',
    loadChildren: () => import('../../patient/add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddScenarioPageRoutingModule {}
