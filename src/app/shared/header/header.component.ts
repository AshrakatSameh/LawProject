import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private translate: TranslateService) {
    // Adding supported languages
    translate.addLangs(['en', 'ar']);
    // Setting the default language
    translate.setDefaultLang('en');
  }

  changeLanguage(lang: string) {
    const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (translateElement) {
      translateElement.value = lang;
      translateElement.dispatchEvent(new Event('change'));
    }
  }

//   lang:any = "en";
// constructor(private translate:TranslateService){
//   console.log(this.translate.currentLang)
//   this.lang = this.translate.currentLang;
// }

// changeLanguage(lang: string) {
//   const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
//   if (translateElement) {
//     translateElement.value = lang;
//     translateElement.dispatchEvent(new Event('change'));
//   }
// }
}

//   changeLanguage(){
//     if(this.lang == "en"){
//       localStorage.setItem('language' , 'ar');
//     }else{
//       localStorage.setItem('language' , 'en');

//     }

//     window.location.reload();

//   }

// }
