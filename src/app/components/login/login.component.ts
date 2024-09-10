import { routes } from './../../app.routes';

import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  private readonly _AuthApiService = inject(AuthApiService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  msgError: string = ""
  isLoading: boolean = false;
  destLogin!: Subscription;



  loginForm: FormGroup = this._FormBuilder.group({


    email: [null, [Validators.required, Validators.email]],

    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],


  }, )



  loginFormSubmit() {
    if (this.loginForm.valid) {

      this.isLoading = true

      this.destLogin = this._AuthApiService.setloginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message == 'success'){

            localStorage.setItem('userToken', res.token)

            this._AuthApiService.saveUserData()


            this._Router.navigate(['/home'])
          }

          this.isLoading = false

        },
        error: (err: HttpErrorResponse) => {
          this.msgError = err.error.message
          console.log(err)
          this.isLoading = false

        }
      })


      console.log(this.loginForm)
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }

  
  OnDestroy(){
    this.destLogin?.unsubscribe
  }



}
