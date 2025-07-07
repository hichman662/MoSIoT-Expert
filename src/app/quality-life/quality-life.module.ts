import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualityLifePageRoutingModule } from './quality-life-routing.module';

import { QualityLifePage } from './quality-life.page';
import { RadarComponent } from './radar/radar.component';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualityLifePageRoutingModule,
    NgChartsModule,
    ReactiveFormsModule,
    RadarComponent
  ],
  declarations: [QualityLifePage]
})
export class QualityLifePageModule {}
