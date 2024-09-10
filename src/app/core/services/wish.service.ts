import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
 
  myHeaders:any={token :localStorage.getItem('userToken')}
 

private readonly _HttpClient=inject(HttpClient)
addToWishlist(id:string):Observable<any>{
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
"productId":id
  },{
    headers:this.myHeaders
  }
)
}

userWishlist():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,{
    headers:this.myHeaders
  }
)
}

deleteproduct(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,{
    headers:this.myHeaders
  }
)
}
}