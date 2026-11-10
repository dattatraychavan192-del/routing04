import { Iproduct } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.BASE_URL;
  constructor(private _http: HttpClient) {}

  creatObs$: Subject<Iproduct> = new Subject<Iproduct>();

  editSub$: BehaviorSubject<Iproduct> = new BehaviorSubject<Iproduct>(
    {} as Iproduct,
  );

  updateSub$: BehaviorSubject<Iproduct> = new BehaviorSubject<Iproduct>(
    {} as Iproduct,
  );

  removeSub$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  fetchProduct(): Observable<Iproduct[]> {
    return this._http.get<Iproduct[]>(`${this.baseUrl}/products.json`);
  }

  fetchSinglePRoduct(id: string): Observable<Iproduct> {
    return this._http.get<Iproduct>(`${this.baseUrl}/products/${id}.json`);
  }

  creatProduct(product: Omit<Iproduct, 'id'>): Observable<{ name: string }> {
    return this._http.post<{ name: string }>(
      `${this.baseUrl}/products.json`,
      product,
    );
  }

  updateProduct(id: string, product: Iproduct): Observable<Iproduct> {
    return this._http.patch<Iproduct>(
      `${this.baseUrl}/products/${id}.json`,
      product,
    );
  }

  removeProduct(id: string): Observable<string> {
    return this._http.delete<string>(`${this.baseUrl}/prodcts/${id}.json`);
  }
}
