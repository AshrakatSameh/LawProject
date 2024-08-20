import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { DirectionService } from '../direction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  lang: string;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    public directionService: DirectionService
  ) {
    this.lang =
      localStorage.getItem('language') || this.translate.getDefaultLang();
    this.languageService.switchLanguage(this.lang); // Update the language
  }

  changeLanguage(selectedLang: string) {
    localStorage.setItem('language', selectedLang); // Save the selected language to localStorage
    this.lang = selectedLang;
    this.languageService.switchLanguage(selectedLang);
    window.location.reload();
  }

  getDirectionClass() {
    return this.lang === 'ar' ? 'rtl-direction' : 'ltr-direction';
  }
}
