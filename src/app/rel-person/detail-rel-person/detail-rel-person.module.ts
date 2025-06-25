import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRelPersonPageRoutingModule } from './detail-rel-person-routing.module';

import { DetailRelPersonPage } from './detail-rel-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailRelPersonPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailRelPersonPage]
})
export class DetailRelPersonPageModule {}
