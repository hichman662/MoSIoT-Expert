import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVitalSignPage } from './add-vital-sign.page';

const routes: Routes = [
  {
    path: '',
    component: AddVitalSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVitalSignPageRoutingModule {}
