import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPatientAccessPage } from './add-patient-access.page';

const routes: Routes = [
  {
    path: '',
    component: AddPatientAccessPage
  },
  {
    path: 'add-device',
    loadChildren: () => import('../../device/add-device/add-device.module').then( m => m.AddDevicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPatientAccessPageRoutingModule {}
