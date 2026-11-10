import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Iproduct } from '../../model/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/i)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    quantity: [
      0,
      [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)],
    ],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
    status: ['', Validators.required],
  });

  productId: string | null = null;
  isSubmitting = false;
  errorMessage = '';
  isEditMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.productId !== null;

    if (this.productId) {
      this.productService.fetchSinglePRoduct(this.productId).subscribe({
        next: (product) => this.productForm.patchValue(product),
        error: () => {
          this.errorMessage = 'Unable to load this product. Please try again.';
        },
      });
    }
  }

  submitProduct(): void {
    if (this.productForm.invalid || this.isSubmitting) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const product = this.productForm.getRawValue();

    if (this.productId) {
      const updatedProduct: Iproduct = { ...product, id: this.productId };
      this.productService
        .updateProduct(this.productId, updatedProduct)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/product', this.productId]);
            this.productService.updateSub$.next(res);
          },

          error: () => {
            this.errorMessage = 'Unable to save the product. Please try again.';
            this.isSubmitting = false;
          },
        });
      return;
    }

    this.productService.creatProduct(product).subscribe({
      next: (res) => {
        this.router.navigate(['/product', res.name]);
        const createdProduct: Iproduct = { ...product, id: res.name };
        this.productService.creatObs$.next(createdProduct);
      },

      error: () => {
        this.errorMessage = 'Unable to create the product. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
