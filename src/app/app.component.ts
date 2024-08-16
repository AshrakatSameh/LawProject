import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  lang: any;
  showHeaderFooter = true;
  title = 'lawyerFirm';

  constructor(private translate: TranslateService, private router: Router) {
    if ('language' in localStorage) {
      this.lang = localStorage.getItem('language');
      translate.use(this.lang);
    } else {
      translate.use(this.lang);
    }

    translate.use('this.lang');

     // Listen to routing events
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is 'dashboard' and hide the header/footer if true
        this.showHeaderFooter = this.router.url !== '/dashboard';
      }
    });
  }
}
