import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualityLifePage } from './quality-life.page';

const routes: Routes = [
  {
    path: '',
    component: QualityLifePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualityLifePageRoutingModule {}
