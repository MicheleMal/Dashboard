import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @ViewChild('registerForm') form!: NgForm;

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/page1']);
    }
  }

  res: any;
  hPosition: MatSnackBarHorizontalPosition = 'center';
  vPosition: MatSnackBarVerticalPosition = 'top';
  onSubmit() {
    const { name, surname, email, password, salary, dateBirth } =
      this.form.value;

    this.form.reset();

    this.authService
      .register(`${environment.URL_API}/employee/auth/signup`, {
        name: name,
        surname: surname,
        email: email,
        password: password,
        salary: salary,
        dateBirth: dateBirth,
      })
      .subscribe(
        (data) => {
          this.res = data;

          if (this.res.check === true) {
            this.router.navigate(['/signin']);
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.snackBar.open('Email già registrata', 'Chiudi', {
              duration: 3000,
              horizontalPosition: this.hPosition,
              verticalPosition: this.vPosition,
            });
          }
        }
      );
  }

  onClickLink(){
    this.router.navigate(["/signin"])
  }
}
