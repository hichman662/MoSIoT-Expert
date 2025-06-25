import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCommunicationPage } from './detail-communication.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCommunicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCommunicationPageRoutingModule {}
