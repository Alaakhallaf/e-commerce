import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly _HttpClient = inject(HttpClient)
  private readonly platformId = inject(PLATFORM_ID)

  private getAuthHeaders(): { token: string } | {} {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }
    const token = localStorage.getItem('userToken');
    return token ? { token } : {};
  }

  checkOut(id:string|null , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`,{
      "shippingAddress":shippingDetails
    },{
    headers:this.getAuthHeaders()
  }

    )

  }
  

  getUserOrders(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}
`)
  }
  
}