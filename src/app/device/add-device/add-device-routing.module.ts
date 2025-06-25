import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDevicePage } from './add-device.page';

const routes: Routes = [
  {
    path: '',
    component: AddDevicePage
  },
  {
    path: 'add-carePlan',
    loadChildren: () => import('../../care-plan/add-care-plan/add-care-plan.module').then( m => m.AddCarePlanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDevicePageRoutingModule {}
