import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarePlanPage } from './care-plan.page';

const routes: Routes = [
  {
    path: '',
    component: CarePlanPage
  },
  {
    path: 'detail-care-plan/:Id',
    loadChildren: () => import('./detail-care-plan/detail-care-plan.module').then( m => m.DetailCarePlanPageModule)
  },
  {
    path: 'add-care-plan',
    loadChildren: () => import('./add-care-plan/add-care-plan.module').then( m => m.AddCarePlanPageModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('./../patient/add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarePlanPageRoutingModule {}
