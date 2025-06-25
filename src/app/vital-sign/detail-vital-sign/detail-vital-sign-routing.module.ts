import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailVitalSignPage } from './detail-vital-sign.page';

const routes: Routes = [
  {
    path: '',
    component: DetailVitalSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailVitalSignPageRoutingModule {}
