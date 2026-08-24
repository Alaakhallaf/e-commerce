import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
 
  myHeaders:any={token :localStorage.getItem('userToken')}
 

private readonly _HttpClient=inject(HttpClient)

// Single source of truth for "which product ids are currently in the
// wishlist". Any component (Home, Products, Details, ...) reads from this
// shared state instead of keeping its own local/disconnected copy, so the
// heart icon always reflects the real wishlist and stays correct across
// navigation.
private readonly wishlistIdsSource = new BehaviorSubject<string[]>([]);
readonly wishlistIds$ = this.wishlistIdsSource.asObservable();

// Synchronous check for use in templates ( [ngClass]="{'in-wishlist': _WishService.isInWishlist(product._id)}" ).
isInWishlist(productId: string): boolean {
  return this.wishlistIdsSource.value.includes(productId);
}

// Fetches the real wishlist from the server and refreshes the shared state.
// Call this whenever a component that displays product hearts initializes.
refreshWishlist(): void {
  this.userWishlist().subscribe({
    next: (res) => {
      const ids: string[] = (res?.data || []).map((p: any) => p._id ?? p.id);
      this.wishlistIdsSource.next(ids);
    },
    error: () => {
      this.wishlistIdsSource.next([]);
    }
  });
}

addToWishlist(id:string):Observable<any>{
 return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
"productId":id
  },{
    headers:this.myHeaders
  }
).pipe(
  tap(() => {
    if (!this.wishlistIdsSource.value.includes(id)) {
      this.wishlistIdsSource.next([...this.wishlistIdsSource.value, id]);
    }
  })
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
).pipe(
  tap(() => {
    this.wishlistIdsSource.next(this.wishlistIdsSource.value.filter(existingId => existingId !== id));
  })
)
}
}