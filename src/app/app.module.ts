import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { WhatDoComponent } from './components/what-do/what-do.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AliComponent } from './components/lawyers/ali/ali.component';
import { AhmedComponent } from './components/lawyers/ahmed/ahmed.component';
import { CompaniesFieldComponent } from './components/companies-field/companies-field.component';
import { LaborLawsFiComponent } from './components/labor-laws-fi/labor-laws-fi.component';
import { LegalConsultationsComponent } from './components/legal-consultations/legal-consultations.component';
import { ArticleComponent } from './components/article/article.component';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    WhatDoComponent,
    BlogComponent,
    ContactComponent,
    AliComponent,
    AhmedComponent,
    CompaniesFieldComponent,
    LaborLawsFiComponent,
    LegalConsultationsComponent,
    ArticleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',

      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }
