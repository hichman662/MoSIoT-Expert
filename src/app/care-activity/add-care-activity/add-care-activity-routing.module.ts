import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCareActivityPage } from './add-care-activity.page';

const routes: Routes = [
  {
    path: '',
    component: AddCareActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCareActivityPageRoutingModule {}
