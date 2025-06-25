import { TranslateModule } from '@ngx-translate/core';
import { DetailAccessModeComponent } from './../detail-access-mode/detail-access-mode.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPatientAccessPageRoutingModule } from './detail-patient-access-routing.module';

import { DetailPatientAccessPage } from './detail-patient-access.page';

@NgModule({ declarations: [DetailPatientAccessPage, DetailAccessModeComponent], imports: [CommonModule,
        FormsModule,
        IonicModule,
        DetailPatientAccessPageRoutingModule,
        ReactiveFormsModule,
        MatExpansionModule,
        TranslateModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class DetailPatientAccessPageModule {}
