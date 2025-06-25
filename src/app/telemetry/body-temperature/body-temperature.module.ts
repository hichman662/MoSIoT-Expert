import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyTemperaturePageRoutingModule } from './body-temperature-routing.module';

import { BodyTemperaturePage } from './body-temperature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyTemperaturePageRoutingModule,
    TranslateModule
  ],
  declarations: [BodyTemperaturePage]
})
export class BodyTemperaturePageModule {}
