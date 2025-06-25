import { TranslateModule } from '@ngx-translate/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { DetailProfileComponent } from './../detail-profile/detail-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPatientPageRoutingModule } from './detail-patient-routing.module';

import { DetailPatientPage } from './detail-patient.page';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



@NgModule({ declarations: [DetailPatientPage,
        DetailProfileComponent], imports: [CommonModule,
        FormsModule,
        IonicModule,
        DetailPatientPageRoutingModule,
        ReactiveFormsModule,
        MatExpansionModule,
        TranslateModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class DetailPatientPageModule {}
