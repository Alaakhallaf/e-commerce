import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../core/services/products.service';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TeretextPipe } from '../../core/pipes/teretext.pipe';
import { CartService } from '../../core/services/cart.service';

import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AuthApiService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink , SearchPipe ,TeretextPipe, FormsModule,NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
  

  searchTerm : string ="";
   
  private readonly _ProductsService=inject(ProductsService )
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  private readonly _WishService= inject(WishListService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _Router=inject(Router)
  private readonly _AuthApiService=inject(AuthApiService)


  productList:Iproduct[]=[]
 categoriesList:Icategory[]=[]


getAllProduct!:Subscription;


customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:false,
  autoplayTimeout: 2000,
  autoplayHoverPause:true,
  navSpeed: 700,  
  navText: ['', ''],
  items:1,
  nav: true
}


customOptionscat: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  autoplay:true,
  autoplayTimeout: 2000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: false
}




  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.categoriesList=res.data
    console.log(  this.categoriesList)

      },

    })
   this.getAllProduct= this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.productList=res.data;
      },

    })

    // Populate the shared wishlist state so hearts reflect the real,
    // up-to-date wishlist status as soon as the product list loads.
    if (this._AuthApiService.isLoggedIn()) {
      this._WishService.refreshWishlist();
    }
  }


  addCart(id:string):void{

    if (!this._AuthApiService.isLoggedIn()) {
      this._Router.navigate(['/login'], { queryParams: { returnUrl: this._Router.url } });
      return;
    }

    this._CartService.AdProducttoCart(id).subscribe({
      next:(res)=>{
    console.log(res)
    this._ToastrService.success(res.message,"Fresh Cart")

      },
      error:(err)=>{
        console.log(err)
          }
    })
    }

ngOnDestroy():void{ 
  this.getAllProduct?.unsubscribe()
}



toggleWishlist(product: any) {
  const id = product._id;
  if (this._WishService.isInWishlist(id)) {
    this._WishService.deleteproduct(id).subscribe({
      next: () => this._ToastrService.success('Removed from wishlist', 'Fresh Cart'),
    });
  } else {
    this._WishService.addToWishlist(id).subscribe({
      next: (res) => this._ToastrService.success(res.message, 'Fresh Cart'),
    });
  }
}

isInWishlist(product: any): boolean {
  return this._WishService.isInWishlist(product._id);
}
 
}