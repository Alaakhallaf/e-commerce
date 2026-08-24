import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly platformId = inject(PLATFORM_ID)

  // Read the token lazily, only when a request is actually made, and only
  // in the browser. Reading it eagerly in a field initializer crashes
  // Angular's SSR/prerendering step (localStorage doesn't exist in Node).
  private getAuthHeaders(): { token: string } | {} {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }
    const token = localStorage.getItem('userToken');
    return token ? { token } : {};
  }

  AdProducttoCart(id:string): Observable<any> {
    return this._HttpClient.post(  `${environment.baseUrl}/api/v1/cart`  ,{
      "productId": id
    } ,
  {   headers: this.getAuthHeaders()}  )

  }
  getProductCart(): Observable<any> {
    return this._HttpClient.get( ` ${environment.baseUrl}/api/v1/cart`,  
  {   headers: this.getAuthHeaders()}  )

  }
  
  deleteProductCart(id:string): Observable<any> {
    return this._HttpClient.delete( ` ${environment.baseUrl}/api/v1/cart/${id}`,  
  {   headers: this.getAuthHeaders()}  )

  }


  updateProductCart(id:string, newcount:number): Observable<any> {
    return this._HttpClient.put( ` ${environment.baseUrl}/api/v1/cart/${id}`,
      { 
        "count":newcount
      
      }
        ,
        {   headers: this.getAuthHeaders()}  )

  }
  clearProductCart(): Observable<any> {
    return this._HttpClient.delete(  `${environment.baseUrl}/api/v1/cart`,
    
        {   headers: this.getAuthHeaders()}  )

  }


}