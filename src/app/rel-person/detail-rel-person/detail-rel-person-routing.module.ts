import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailRelPersonPage } from './detail-rel-person.page';

const routes: Routes = [
  {
    path: '',
    component: DetailRelPersonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRelPersonPageRoutingModule {}
