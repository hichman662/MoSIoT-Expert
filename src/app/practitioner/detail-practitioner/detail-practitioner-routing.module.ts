import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPractitionerPage } from './detail-practitioner.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPractitionerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPractitionerPageRoutingModule {}
