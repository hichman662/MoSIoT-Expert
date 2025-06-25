import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunicationPage } from './communication.page';

const routes: Routes = [
  {
    path: '',
    component: CommunicationPage
  },
  {
    path: 'detail-communication/:Id',
    loadChildren: () => import('./detail-communication/detail-communication.module').then( m => m.DetailCommunicationPageModule)
  },  {
    path: 'add-communication',
    loadChildren: () => import('./add-communication/add-communication.module').then( m => m.AddCommunicationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunicationPageRoutingModule {}
