import { Component, inject, OnDestroy } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TeretextPipe } from '../../core/pipes/teretext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../../core/services/auth.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule,RouterLink , SearchPipe ,TeretextPipe,FormsModule,NgClass],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  {
  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _WishService = inject(WishListService)
private readonly _ToastrService=inject(ToastrService)
private readonly _Router = inject(Router)
private readonly _AuthApiService = inject(AuthApiService)


  productList:Iproduct[] = []

  searchTerm:string ="";
  
  id:string ="";

  destProduct!:Subscription;

  ngOnInit(): void {
   this.destProduct =  this._ProductsService.getAllProducts().subscribe({
      next : (res)=>{
          console.log("allProduct" , res.data)
          this.productList = res.data
      }
    })

    // Populate the shared wishlist state so hearts reflect the real,
    // up-to-date wishlist status as soon as the product list loads.
    if (this._AuthApiService.isLoggedIn()) {
      this._WishService.refreshWishlist();
    }
  }

  addCart(Id:string){
    if (!this._AuthApiService.isLoggedIn()) {
      this._Router.navigate(['/login'], { queryParams: { returnUrl: this._Router.url } });
      return;
    }
    this.id=Id
    this._CartService.AdProducttoCart(Id).subscribe({
      next:(res)=>{
        console.log(res)
          this._ToastrService.success(res.message)

      }
    })
  }

  toggleWishlist(product: any) {
    const id = product._id;
    if (this._WishService.isInWishlist(id)) {
      this._WishService.deleteproduct(id).subscribe({
        next: () => this._ToastrService.success('Removed from wishlist'),
      });
    } else {
      this._WishService.addToWishlist(id).subscribe({
        next: (res) => this._ToastrService.success(res.message),
      });
    }
  }

  isInWishlist(product: any): boolean {
    return this._WishService.isInWishlist(product._id);
  }

}