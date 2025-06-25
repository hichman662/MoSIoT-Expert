import { ProgressBarRoutingModule } from './progress-bar/progress-bar-routing.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateConfigService } from '../app/services/translate-config.service';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    RouterModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ProgressBarRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: LanguageLoader,
          deps: [HttpClient]
      },
      defaultLanguage:'es'
  }),],
  providers: [Platform,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },TranslateConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
