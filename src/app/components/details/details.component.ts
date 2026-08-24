import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import {CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { AuthApiService } from '../../core/services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy {


private readonly _ActivatedRoute=inject(ActivatedRoute)
private readonly  _ProductsService=inject(ProductsService)
private readonly _CartService=inject(CartService)
private readonly _WishService= inject(WishListService)
private readonly _ToastrService=inject(ToastrService)
private readonly _Router=inject(Router)
private readonly _AuthApiService=inject(AuthApiService)

customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout: 4000,
  autoplayHoverPause:true,
  navSpeed: 700,  
  navText: ['<' , '>'],
  items:1,
  nav: true
}


detailsProduct:Iproduct |null = null;

DetailsImages:string[]=[];


 forDestroy!:Subscription;
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p.get("id"))
        let Idproduct = p.get("id")
 
       this.forDestroy= this._ProductsService.getSpecificProducts(Idproduct).subscribe({
  next:(res)=>{
console.log(res.data)
this.detailsProduct=res.data;
if (this.detailsProduct) {
  this.DetailsImages=this.detailsProduct.images;
}
  },

})


      }
    })

    // Populate the shared wishlist state so the heart reflects the real,
    // up-to-date wishlist status as soon as the product loads.
    if (this._AuthApiService.isLoggedIn()) {
      this._WishService.refreshWishlist();
    }
  }


ngOnDestroy(): void {
this.forDestroy?.unsubscribe();
}


addCart(id:string):void{

  if (!this._AuthApiService.isLoggedIn()) {
    this._Router.navigate(['/login'], { queryParams: { returnUrl: this._Router.url } });
    return;
  }

  this._CartService.AdProducttoCart(id).subscribe({
    next:(res)=>{
  console.log(res)
  this._ToastrService.success(res.message,)

    },
    error:(err)=>{
      console.log(err)
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