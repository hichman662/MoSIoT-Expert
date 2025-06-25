import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PractitionerPageRoutingModule } from './practitioner-routing.module';

import { PractitionerPage } from './practitioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PractitionerPageRoutingModule,
    TranslateModule
  ],
  declarations: [PractitionerPage]
})
export class PractitionerPageModule {}
