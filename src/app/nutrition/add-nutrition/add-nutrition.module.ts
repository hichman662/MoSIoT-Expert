import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNutritionPageRoutingModule } from './add-nutrition-routing.module';

import { AddNutritionPage } from './add-nutrition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNutritionPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddNutritionPage]
})
export class AddNutritionPageModule {}
