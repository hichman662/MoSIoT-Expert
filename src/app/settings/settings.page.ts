import { TranslateConfigService } from './../services/translate-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  selectedLanguage: string;

  constructor(
    private translateConfigService: TranslateConfigService
  ) {
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage() +'';
   }

  ngOnInit() {
  }

  languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

}
