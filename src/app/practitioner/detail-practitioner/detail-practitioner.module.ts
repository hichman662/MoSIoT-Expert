import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPractitionerPageRoutingModule } from './detail-practitioner-routing.module';

import { DetailPractitionerPage } from './detail-practitioner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPractitionerPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailPractitionerPage]
})
export class DetailPractitionerPageModule {}
