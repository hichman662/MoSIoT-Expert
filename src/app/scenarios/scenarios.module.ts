import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScenariosPageRoutingModule } from './scenarios-routing.module';
import { ScenariosPage } from './scenarios.page';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScenariosPageRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatExpansionModule,
    TranslateModule
  ],
  declarations: [ScenariosPage]
})
export class ScenariosPageModule {}
