import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Iproduct } from '../../model/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productArr: Iproduct[] = [];

  constructor(
    private _http: ProductService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchData();

    this._http.creatObs$.subscribe({
      next: (res) => {
        this.productArr.unshift(res);
      },
    });

    this._http.updateSub$.subscribe({
      next: (res) => {
        let findIndex = this.productArr.findIndex((data) => data.id === res.id);
        this.productArr[findIndex] = res;
      },
    });

    this._route.queryParams.subscribe({
      next: (res) => {
        let getIndex = this.productArr.findIndex((f) => f.id === res['id']);

        this.productArr.splice(getIndex, 1);
      },
    });
  }

  fetchData() {
    this._http.fetchProduct().subscribe((res) => {
      for (const key in res) {
        this.productArr.push({ ...res[key], id: key });
      }
      console.log(this.productArr);
    });
  }
}
