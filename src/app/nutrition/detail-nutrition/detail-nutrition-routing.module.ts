import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailNutritionPage } from './detail-nutrition.page';

const routes: Routes = [
  {
    path: '',
    component: DetailNutritionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailNutritionPageRoutingModule {}
