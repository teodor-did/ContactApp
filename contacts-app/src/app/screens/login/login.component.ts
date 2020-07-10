import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddEditContactComponent } from '../contacts/add-edit-contact/add-edit-contact.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* Authentication data */
  user = {
    email: 'teo@doitdev.ro',
    password: 'administrator'
  }

  /* boolean for hiding password */
  hide = false

  /* login form */
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    /* verifying if the user is already logged in */
    const user = sessionStorage.getItem('user-data')
    if (user) {
      this.router.navigate(['/'])
    }

    /* building the form */
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    });
  }

  /* Login method */
  onLogin() {
    const formData = this.loginForm.getRawValue()
    if (formData.email === this.user.email && formData.password === this.user.password) {
      sessionStorage.setItem('user-data', formData)
      this.router.navigate(['/'])
    } else {
      this.snackBar.open('Email and password combination is incorrect!', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      })
    }
  }

}
