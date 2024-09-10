import { Iproduct } from './../../core/interfaces/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import {CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

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

heart:boolean=false;
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
wishlist = new Set<number>(); 

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
  }


ngOnDestroy(): void {
this.forDestroy?.unsubscribe();
}


addCart(id:string):void{

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
  
  addToWish(id:string):boolean{
  
    this._WishService.addToWishlist(id).subscribe({
      next:(res)=>{
        console.log(res)
        this.heart=true;
        this._ToastrService.success(res.message,)
          },
          error:(err)=>{
            console.log(err)
              }
    })
    return true
    }


    


    toggleWishlist(product: any) {
      if (this.wishlist.has(product.id)) {
        this.wishlist.delete(product.id);
      } else {
        this.wishlist.add(product.id);
      }
    }
  
    isInWishlist(product: any): boolean {
      return this.wishlist.has(product.id); 
    }






   
}
