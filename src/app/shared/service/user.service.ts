import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.BASE_URL;
  constructor(private _http: HttpClient) {}

  fetchProducts() {}
}
