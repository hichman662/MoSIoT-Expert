import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCommunicationPage } from './add-communication.page';

const routes: Routes = [
  {
    path: '',
    component: AddCommunicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCommunicationPageRoutingModule {}
