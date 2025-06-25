import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelPersonPageRoutingModule } from './rel-person-routing.module';

import { RelPersonPage } from './rel-person.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelPersonPageRoutingModule,
    TranslateModule
  ],
  declarations: [RelPersonPage]
})
export class RelPersonPageModule {}
