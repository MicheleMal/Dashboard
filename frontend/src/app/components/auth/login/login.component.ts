import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  @ViewChild('loginForm') form!: NgForm;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigate(["/page1"])
    }
  }

  res: any;

  hPosition: MatSnackBarHorizontalPosition = "center"
  vPosition: MatSnackBarVerticalPosition = "top"

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.form.reset();
    this.authService
      .login(`${environment.URL_API}/employee/auth/signin`, {
        email: email,
        password: password,
      })
      .subscribe((data) => {
        this.res = data;
        if (this.res.check === true) {
          this.authService.isAuthenticated = true;          
          localStorage.setItem("jwtToken", this.res.token)
          this.router.navigate(['/page1']);
        }
      },
      (error: HttpErrorResponse)=>{        
        if(error.status===404){
          this.snackBar.open("Email o password sbagliati", "Chiudi",{
            duration: 3000,
            horizontalPosition: this.hPosition,
            verticalPosition: this.vPosition
          })
        }
      }
  )}
}
