import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  lang:any = "en";
constructor(private translate:TranslateService){
  console.log(this.translate.currentLang)
  this.lang = this.translate.currentLang;
}

  changeLanguage(){
    if(this.lang == "en"){
      localStorage.setItem('language' , 'ar');
    }else{
      localStorage.setItem('language' , 'en');

    }

    window.location.reload();

  }

}
