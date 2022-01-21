import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ICarOwners } from '../../interface/ICarOwners.interface';
import { ICars } from '../../interface/ICars.interfece';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  private api = {
    owners: 'api/owners',
    cars: 'api/cars'
  }
  constructor(private http: HttpClient) { }

  getAllOwners(): Observable<ICarOwners[]> {
    return this.http.get<ICarOwners[]>(this.api.owners);
  }
  createOwner(owner: ICarOwners): Observable<void> {
    return this.http.post<void>(this.api.owners, owner);
  }
  updateOwner(owner: ICarOwners): Observable<any> {
    return this.http.put(this.api.owners +'/'+ owner.id, owner);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.owners}/${id}`);
  }

}



// import { Injectable } from '@angular/core';
// import { Product } from './product.model';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private productsUrl = 'api/products/';
//   constructor(private http: HttpClient) { }

//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.productsUrl).pipe(
//       retry(2),
//       catchError((error: HttpErrorResponse) => {
//         console.error(error);
//         return throwError(error);
//       })
//     );
//   }

//   createProduct(product: Product): Observable<Product> {
//     product.id = null;
//     return this.http.post<Product>(this.productsUrl, product).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error(error);
//         return throwError(error);
//       })
//     )
//   }

//   editProduct(product: Product): Observable<any> {
//     return this.http.put(this.productsUrl + product.id, product);
//   }

//   deleteProduct(id: number): Observable<any> {
//     return this.http.delete(this.productsUrl + id);
//   }
// }






// getAll(): Observable<ICategoryResponse[]> {
//   return this.http.get<ICategoryResponse[]>(this.api.category);
// }

// getOne(id: number): Observable<ICategoryResponse> {
// return this.http.get<ICategoryResponse>(`${this.api.category}/${id}`);
// }

// create(category: ICategoryResponse): Observable<void> {
// return this.http.post<void>(this.api.category, category);
// }

// update(category: ICategoryResponse, id: number): Observable<void> {
// return this.http.patch<void>(`${this.api.category}/${id}`, category);
// }

// delete(id: number): Observable<void> {
// return this.http.delete<void>(`${this.api.category}/${id}`);
// }