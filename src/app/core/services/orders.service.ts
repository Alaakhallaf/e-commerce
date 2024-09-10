import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  myHeaders:any={token :localStorage.getItem('userToken')}

  private readonly _HttpClient = inject(HttpClient)

  checkOut(id:string|null , shippingDetails:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environment.urlServer}`,{
      "shippingAddress":shippingDetails
    },{
    headers:this.myHeaders
  }

    )

  }

  getUserOrders(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}
`)
  }
  
}
