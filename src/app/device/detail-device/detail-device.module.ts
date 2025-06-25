import { TranslateModule } from '@ngx-translate/core';
import { DeviceTemplateComponent } from './../device-template/device-template.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailDevicePageRoutingModule } from './detail-device-routing.module';

import { DetailDevicePage } from './detail-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailDevicePageRoutingModule,
    MatExpansionModule,
    TranslateModule
  ],
  declarations: [DetailDevicePage, DeviceTemplateComponent]
})
export class DetailDevicePageModule {}
