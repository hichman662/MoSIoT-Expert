import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPractitionerPageRoutingModule } from './add-practitioner-routing.module';

import { AddPractitionerPage } from './add-practitioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPractitionerPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [AddPractitionerPage]
})
export class AddPractitionerPageModule {}
