import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailDevicePage } from './detail-device.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailDevicePageRoutingModule {}
