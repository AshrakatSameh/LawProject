import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  form! : FormGroup;
  fb = inject(FormBuilder);
  router= inject(Router);
  toast = inject(NgToastService)
  ngOnInit(): void {
    this.form = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  login(){
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
     
        this.toast.success({detail:"SUCCESS",summary: response.message, duration: 5000});
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        this.toast.error({detail:"ERROR",summary: "Something went wrong", duration: 5000});
       
      },
    });
}
}