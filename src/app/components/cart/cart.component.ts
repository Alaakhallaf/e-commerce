import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

import { Router, RouterLink } from '@angular/router';
import { Icart } from '../../core/interfaces/icart';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

private readonly _Router =inject(Router)
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)

cartDetails: Icart|null = null;


  ngOnInit(): void {
    

    this._CartService.getProductCart().subscribe({

      next:(res)=>{
        console.log(res.data) //{total cart price ,products[{}] }
       this.cartDetails=res.data
       

       
      },

    })
  }


  removeItem(id:string):void{
    this._CartService.deleteProductCart(id).subscribe({
      next:(res)=>{
        console.log(res) 
       this.cartDetails=res.data
       this._ToastrService.warning("Item removed", 'Fresh Cart')
      },

    })
  }

  updareCart(id:string , count:number):void{
    if (count>0) {
      this._CartService.updateProductCart(id,count).subscribe({
        next:(res)=>{
          console.log(res) 
         this.cartDetails=res.data
        },

      })
    }
  }

clearCart():void{
this._CartService.clearProductCart().subscribe({
  next:(res)=>{
    console.log(res) 
   this.cartDetails=null;
   this._Router.navigate(['/home'])




  },

})

}




}