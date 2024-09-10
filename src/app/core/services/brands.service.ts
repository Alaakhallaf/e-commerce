import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class brandsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(  `${environment.baseUrl}/api/v1/brands`)

  }

  getspecificBrand(id :string): Observable<any> {
    return this._HttpClient.get(  `${environment.baseUrl}/api/v1/brands/${id}`)

  }



}
