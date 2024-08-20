import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { DirectionService } from 'src/app/shared/direction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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



}
