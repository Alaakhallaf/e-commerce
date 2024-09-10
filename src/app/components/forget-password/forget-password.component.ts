import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  step: number = 1;
  isLoading: boolean = false;
  msgErrorEmail : string = '';
  msgErrorCode : string = '';
  msgErrorReset : string = '';
 


  private readonly _AuthApiService = inject(AuthApiService)
  private readonly _Router = inject(Router)



  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })


  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })


  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),

    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w(6,)$/)])
  })


  verifyEmailSubmet(): void {

      let emailValue = this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue)

    this.isLoading = true
    console.log(this.verifyEmail.value)
    this._AuthApiService.setEmailVerify(this.verifyEmail.value).subscribe({
      
      next: (res) => {
        console.log(res)
        if (res.statusMsg === 'success') {
          this.step = 2;
        }
        this.isLoading = false

      },

      error: (err) => {
        this.msgErrorEmail = err.error.message

        console.log(err)
        this.isLoading = false


      }
    })
  }



  verifyCodeSubmet(): void {
    this.isLoading = true

    this._AuthApiService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status === 'Success') {
          this.step = 3;
        }
        this.isLoading = false

      },

      error: (err) => {
        this.msgErrorCode = err.error.message

        console.log(err)
        this.isLoading = false

      }
    })
  }



  resetPasswordSubmet(): void {
    this.isLoading = true

    this._AuthApiService.setResetPassword(this.resetPassword.value).subscribe({

      next: (res) => {
        console.log(res)

        localStorage.setItem('userToken', res.token)

        this._AuthApiService.saveUserData();

        this._Router.navigate(['/home'])
        this.isLoading = false

      },

      error: (err) => {
        this.msgErrorReset = err.error.message
        

        console.log(err)
        this.isLoading = false

      }
    })
  }




}