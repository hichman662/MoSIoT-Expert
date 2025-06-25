import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScenariosPageRoutingModule } from './scenarios-routing.module';
import { ScenariosPage } from './scenarios.page';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({ declarations: [ScenariosPage], imports: [CommonModule,
        FormsModule,
        IonicModule,
        ScenariosPageRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        MatExpansionModule,
        TranslateModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ScenariosPageModule {}
