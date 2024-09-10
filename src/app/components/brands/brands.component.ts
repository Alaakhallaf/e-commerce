import { Component, inject } from '@angular/core';
import { brandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';
import { Ibrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly _brandsService=inject(brandsService)
brand:Ibrand|null=null;
  clicked:boolean=false;
  brandDetails:Ibrands|null=null;
    ngOnInit(): void {
      
  
      this._brandsService.getAllBrands() .subscribe({
  
        next:(res)=>{

          console.log(res) 
         this.brandDetails=res
        },
  
      })
    }


    getSpecificProduct(id:string): void {
      
  this.clicked=true;
      this._brandsService.getspecificBrand(id) .subscribe({
  
        next:(res)=>{

          console.log(res) 
          this.brand=res.data

        },
  
      })
    }

    close():void{
      this.clicked=false
    }


    onBodyClick(event:MouseEvent){
      event.stopImmediatePropagation();
    }


    
}
