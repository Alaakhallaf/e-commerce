import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { WishListService } from '../../core/services/wish.service';
import { Iproducts } from '../../core/interfaces/iwish';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
private readonly _WishListService=inject(WishListService)
private readonly _CartService=inject(CartService)

wishlistDetails:Iproducts[]=[]
wishlist = new Set<number>(); 

ngOnInit(): void {
    this._WishListService.userWishlist().subscribe({
      next:(res)=>{
        console.log(res);
      this.wishlistDetails=res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
}
deleteProduct(id:string):void{
  this._WishListService.deleteproduct(id).subscribe({
    next:(res)=>{
this.ngOnInit()
      console.log(res);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
addToCart(id:string):void{
  this._CartService.AdProducttoCart(id).subscribe({
    next:(res)=>{

      console.log(res);     
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}




}