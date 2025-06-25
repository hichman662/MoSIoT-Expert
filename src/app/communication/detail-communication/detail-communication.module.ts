import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCommunicationPageRoutingModule } from './detail-communication-routing.module';

import { DetailCommunicationPage } from './detail-communication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCommunicationPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailCommunicationPage]
})
export class DetailCommunicationPageModule {}
