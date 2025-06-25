import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCarePlanPage } from './detail-care-plan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCarePlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCarePlanPageRoutingModule {}
