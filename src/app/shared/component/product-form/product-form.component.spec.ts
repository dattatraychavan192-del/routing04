import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid product details', () => {
    expect(component.productForm.invalid).toBeTrue();

    component.productForm.setValue({
      title: 'Desk lamp',
      brand: 'Bright Home',
      category: 'Lighting',
      description: 'A practical desk lamp.',
      image: 'https://example.com/lamp.jpg',
      price: 24.99,
      quantity: 3,
      rating: 4.5,
      status: 'Available',
    });

    expect(component.productForm.valid).toBeTrue();

    component.productForm.controls.price.setValue(0);
    component.productForm.controls.quantity.setValue(1.5);
    component.productForm.controls.rating.setValue(6);
    component.productForm.controls.image.setValue('not-a-url');

    expect(component.productForm.invalid).toBeTrue();
  });
});
