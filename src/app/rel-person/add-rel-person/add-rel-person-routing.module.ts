import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRelPersonPage } from './add-rel-person.page';

const routes: Routes = [
  {
    path: '',
    component: AddRelPersonPage
  },
  {
    path: 'add-user',
    loadChildren: () => import('../../patient/add-user/add-user.module').then( m => m.AddUserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRelPersonPageRoutingModule {}
