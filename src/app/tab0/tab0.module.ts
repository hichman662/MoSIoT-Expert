import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../progress-bar/progress-bar.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab0PageRoutingModule } from './tab0-routing.module';
import { Tab0Page } from './tab0.page';
import { ExploreContainerComponentModule } from './../explore-container/explore-container.module';
import { NgChartsModule } from 'ng2-charts';
import { RadarComponent } from '../quality-life/radar/radar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    Tab0PageRoutingModule,
    ReactiveFormsModule,
    MatExpansionModule,
    ProgressBarModule,
    NgChartsModule,
    TranslateModule,
    RadarComponent  
  ],
  declarations: [Tab0Page]
})
export class Tab0PageModule {}
