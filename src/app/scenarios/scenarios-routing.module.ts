import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScenariosPage } from './scenarios.page';

const routes: Routes = [
  {
    path: '',
    component: ScenariosPage
  },
  {
    path: 'add-scenario',
    loadChildren: () => import('./add-scenario/add-scenario.module').then( m => m.AddScenarioPageModule)
  },
  {
    path: 'careActivity/:Id',
    loadChildren: () => import('./../care-activity/care-activity.module').then( m => m.CareActivityPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScenariosPageRoutingModule {}
