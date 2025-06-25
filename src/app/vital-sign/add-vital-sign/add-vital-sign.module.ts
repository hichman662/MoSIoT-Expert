import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVitalSignPageRoutingModule } from './add-vital-sign-routing.module';

import { AddVitalSignPage } from './add-vital-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVitalSignPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddVitalSignPage]
})
export class AddVitalSignPageModule {}
