import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNutritionPage } from './add-nutrition.page';

const routes: Routes = [
  {
    path: '',
    component: AddNutritionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNutritionPageRoutingModule {}
