import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeartRatePage } from './heart-rate.page';

const routes: Routes = [
  {
    path: '',
    component: HeartRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeartRatePageRoutingModule {}
