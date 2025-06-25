import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from './../../progress-bar/progress-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDevicePageRoutingModule } from './add-device-routing.module';

import { AddDevicePage } from './add-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDevicePageRoutingModule,
    ReactiveFormsModule,
    ProgressBarModule,
    TranslateModule
  ],
  declarations: [AddDevicePage]
})
export class AddDevicePageModule {}
