import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPractitionerPage } from './add-practitioner.page';

const routes: Routes = [
  {
    path: '',
    component: AddPractitionerPage
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
export class AddPractitionerPageRoutingModule {}
