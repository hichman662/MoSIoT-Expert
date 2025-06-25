import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'careActivity/:Id',
    loadChildren: () => import('./../care-activity/care-activity.module').then( m => m.CareActivityPageModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('./../patient/add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressBarRoutingModule { }
