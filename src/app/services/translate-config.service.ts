/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(
    private translate: TranslateService,
    private storage: Storage
  ) { }

  getDefaultLanguage(){
    this.storage.get('language').then(val =>{
      if(val){
        this.setLanguage(val);
        this.translate.setDefaultLang(val);
        return val;
      }else{
        let language = this.translate.getBrowserLang();
        console.log('language is: '+ language);
        this.translate.setDefaultLang(language);
        return language;
      }
    });
  }

  setLanguage(setLang) {
    this.translate.use(setLang);
    this.storage.set('language', setLang);
  }
}
