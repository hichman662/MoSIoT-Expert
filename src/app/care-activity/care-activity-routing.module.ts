import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareActivityPage } from './care-activity.page';

const routes: Routes = [
  {
    path: '',
    component: CareActivityPage
  },
  {
    path: 'detail-care-activity',
    loadChildren: () => import('./detail-care-activity/detail-care-activity.module').then( m => m.DetailCareActivityPageModule)
  },
  {
    path: 'addNutrition',
    loadChildren: () => import('../nutrition/add-nutrition/add-nutrition.module').then( m => m.AddNutritionPageModule)
  },
  {
    path: 'addAppointment',
    loadChildren: () => import('../appointment/add-appointment/add-appointment.module').then( m => m.AddAppointmentPageModule)
  },
  {
    path: 'addCommunication',
    loadChildren: () => import('../communication/add-communication/add-communication.module').then( m => m.AddCommunicationPageModule)
  },
  {
    path: 'addMedication',
    loadChildren: () => import('../medication/add-medication/add-medication.module').then( m => m.AddMedicationPageModule)
  },
  {
    path: 'add-care-activity',
    loadChildren: () => import('./add-care-activity/add-care-activity.module').then( m => m.AddCareActivityPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareActivityPageRoutingModule {}
