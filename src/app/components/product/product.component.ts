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


  productList:Iproduct[] = []
  wishlist = new Set<number>(); 

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

    
  }

  addCart(Id:string){
    this.id=Id
    this._CartService.AdProducttoCart(Id).subscribe({
      next:(res)=>{
        console.log(res)
          this._ToastrService.success(res.message)

      }
    })
  }

  addWishList(Id : string){
    this.id=Id
    this._WishService.addToWishlist(Id).subscribe({
      next:(res)=>
      {
        console.log(res)
        this._ToastrService.success(res.message)
        
      }
    })
  }

   toggleWishlist(product: any) {
    if (this.wishlist.has(product.id)) {
      this.wishlist.delete(product.id);
    } else {
      this.wishlist.add(product.id);
    }
    this.saveWishlistToLocalStorage();
  }

  isInWishlist(product: any): boolean {
    return this.wishlist.has(product.id);
  }

  loadWishlistFromLocalStorage() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist = new Set<number>(JSON.parse(savedWishlist));
    }
  }

  saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));
  }

}
