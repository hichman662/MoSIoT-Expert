import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page
  },
  {
    path: 'carePlan',
    loadChildren: () => import('../care-plan/care-plan.module').then( m => m.CarePlanPageModule)
  },
  {
    path: 'vitalSign',
    loadChildren: () => import('../vital-sign/vital-sign.module').then( m => m.VitalSignPageModule)
  },
  {
    path: 'medication',
    loadChildren: () => import('../medication/medication.module').then( m => m.MedicationPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('../appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'nutrition',
    loadChildren: () => import('../nutrition/nutrition.module').then( m => m.NutritionPageModule)
  },
  {
    path: 'communication',
    loadChildren: () => import('../communication/communication.module').then( m => m.CommunicationPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
