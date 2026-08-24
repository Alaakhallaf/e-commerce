import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  // Single source of truth for the wishlist.
  // All components read from this shared state so the heart
  // stays synchronized across navigation.
  private readonly wishlistIdsSource = new BehaviorSubject<string[]>([]);
  readonly wishlistIds$ = this.wishlistIdsSource.asObservable();

  // Get the latest token only when making a request.
  // This also prevents localStorage from being accessed during SSR/prerendering.
  private getAuthHeaders(): { token: string } | {} {
    if (!isPlatformBrowser(this.platformId)) {
      return {};
    }

    const token = localStorage.getItem('userToken');

    return token ? { token } : {};
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIdsSource.value.includes(productId);
  }

  refreshWishlist(): void {
    // localStorage/browser APIs are not available during prerendering.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.userWishlist().subscribe({
      next: (res) => {
        const ids: string[] = (res?.data || []).map(
          (p: any) => p._id ?? p.id
        );

        this.wishlistIdsSource.next(ids);
      },
      error: () => {
        this.wishlistIdsSource.next([]);
      }
    });
  }

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/wishlist`,
      {
        productId: id
      },
      {
        headers: this.getAuthHeaders()
      }
    ).pipe(
      tap(() => {
        if (!this.wishlistIdsSource.value.includes(id)) {
          this.wishlistIdsSource.next([
            ...this.wishlistIdsSource.value,
            id
          ]);
        }
      })
    );
  }

  userWishlist(): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/wishlist`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  deleteproduct(id: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    ).pipe(
      tap(() => {
        this.wishlistIdsSource.next(
          this.wishlistIdsSource.value.filter(
            existingId => existingId !== id
          )
        );
      })
    );
  }
}