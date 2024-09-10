import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupCategoriesService {

  constructor() { }
  private readonly _HttpClient = inject (HttpClient)

  getSupCategories():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
  }

  
  getSpecificSupCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories/${id}`)
  }


  getSpecificSupCategoriesOnCategory(category:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${category}/subcategories`)
  }
}
