import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCareActivityPage } from './detail-care-activity.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCareActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCareActivityPageRoutingModule {}
