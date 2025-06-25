import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailVitalSignPageRoutingModule } from './detail-vital-sign-routing.module';

import { DetailVitalSignPage } from './detail-vital-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailVitalSignPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailVitalSignPage]
})
export class DetailVitalSignPageModule {}
