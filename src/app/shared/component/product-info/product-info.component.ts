import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iproduct } from '../../model/product';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  constructor(
    private _http: ProductService,
    private _route: Router,
    private _routes: ActivatedRoute,
  ) {}

  productId!: string;
  products!: Iproduct;

  ngOnInit(): void {
    this.getproduct();

    this._routes.paramMap.subscribe((params) => {
      this.productId = params.get('id') ?? '';

      if (this.productId) {
        this.getproduct();
      }
    });
  }

  getproduct() {
    this._http.fetchSinglePRoduct(this.productId).subscribe({
      next: (res) => {
        this.products = {
          ...res,
          id: this.productId,
        };
        this._route.navigate(['product']);
      },
      error: (err) => console.log(err),
    });
  }

  editProduct() {
    this._route.navigate(['product', this.productId, 'edit']);
  }

  removeProduct(id: string) {
    this._http.removeProduct(id).subscribe({
      next: (res) => {
        this._route.navigate(['product'], {
          queryParams: { id: id },
        });
      },
    });
    console.log(id);
  }
}
