import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  authService= inject(AuthService);
  router = inject(Router);
  toast= inject(NgToastService)
  
  isSubMenuOpen: boolean = false;
  isSidebarVisible: boolean = true;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout = () => {
    this.authService.logout();
    this.toast.success({detail:"SUCCESS",summary: 'logged out', duration: 1000});
    this.toast.success({
      detail: "Logout success",
      summary: "You have been successfully logged out.",
      duration: 5000, // duration in milliseconds
    });
    this.router.navigate(['login']);
  };
}
