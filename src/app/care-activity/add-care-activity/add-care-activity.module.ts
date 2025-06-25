import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCareActivityPageRoutingModule } from './add-care-activity-routing.module';

import { AddCareActivityPage } from './add-care-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCareActivityPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddCareActivityPage]
})
export class AddCareActivityPageModule {}
