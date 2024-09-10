import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthApiService } from '../../core/services/auth.service';
import { Iusr } from '../../core/interfaces/iusr';
import { IpaidProducts } from '../../core/interfaces/ipaid-products';


@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent {

private readonly _OrdersService = inject(OrdersService)
private readonly _AuthApiService = inject(AuthApiService)




userDat!:Iusr;
userId:string="";

products:IpaidProducts [] =[] 




  ngOnInit():void{


   this.userDat = this._AuthApiService.saveUserData() as Iusr
   this.userId = this.userDat.id

   console.log("iddd" , this.userId)


      this._OrdersService.getUserOrders(this.userId).subscribe({
        next:(res)=>{
          console.log("allOrders" , res)
          this.products = res
         
 
          console.log("products " , this.products  )

          

        }
      })
  }

}