import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailNutritionPageRoutingModule } from './detail-nutrition-routing.module';

import { DetailNutritionPage } from './detail-nutrition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailNutritionPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailNutritionPage]
})
export class DetailNutritionPageModule {}
