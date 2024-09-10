import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Iusr } from '../interfaces/iusr';
@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  user:any
  userData:any = null


// private readonly _Router= inject(Router)
private readonly _HttpClient= inject(HttpClient)
private readonly _Router= inject(Router)
_PLATFORM_ID = inject(PLATFORM_ID)


setRegisterForm(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup `, data)

}
setloginForm(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin `, data)

}


saveUserData():Iusr{
if (isPlatformBrowser(this._PLATFORM_ID)){
  if (localStorage.getItem('userToken')!=null){
    this.userData =  jwtDecode(  localStorage.getItem('userToken')!  )

    console.log('userData' , this.userData)
 }}
 return this.userData
}


logOut():void{
  localStorage.removeItem('userToken')
  this.userData=null;
  this._Router.navigate(['/login'])


}


setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)

}
setCodeVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)

}
setResetPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)

}


}