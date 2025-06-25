import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeartRatePageRoutingModule } from './heart-rate-routing.module';

import { HeartRatePage } from './heart-rate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeartRatePageRoutingModule,
    TranslateModule
  ],
  declarations: [HeartRatePage]
})
export class HeartRatePageModule {}
