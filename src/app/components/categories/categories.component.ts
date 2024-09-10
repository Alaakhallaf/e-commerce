import { Icategory } from '../../core/interfaces/icategory';
import { IsubCategory } from '../../core/interfaces/isub-category';
import { SupCategoriesService } from '../../core/services/sup-categories.service';
import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _SupCategoriesService = inject(SupCategoriesService)

  allCategoriesList:Icategory[]=[]
  supCategoriesList:IsubCategory[]=[]

  mainName : string = ""
  categoryId: string = ""
  supCategoryId: string = ""

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(  'categoreis' , res.data)
        this.allCategoriesList=res.data

      },

    })

}

displaySupCategories( catId:string , catName:string){

  this.mainName = catName ;

  this.categoryId = catId
  this._SupCategoriesService.getSupCategories().subscribe({
    next : (res) => {
      this.supCategoriesList = res.data;
      console.log ("allCat" , res.data)
      console.log ("id" , this.categoryId)
    

  }})


  this._CategoriesService.getSpecificCategories(this.categoryId).subscribe({
    next: (res)=>
    {
      console.log("categoryyyyyy" ,res.data._id)
      let idcc =res.data._id

      this._SupCategoriesService.getSpecificSupCategoriesOnCategory(idcc).subscribe({
        next : (res)=>{
          console.log("supCats" , res.data)
          this.supCategoriesList = res.data
        }
      })
    }
  })
}

}

