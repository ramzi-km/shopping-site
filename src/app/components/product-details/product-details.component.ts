import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  private ngUnsubscribe = new Subject<void>();
  product!: Product;
  loading = true;
  loadProductErr = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.route.params
      .pipe(
        switchMap((params) => {
          const productId = params['productId'];
          return this.productService.getProduct(productId);
        })
      )
      .subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
        },
        error: (err) => {
          this.loadProductErr = err.error.message;
          this.loading = false;
        },
      });
  }
  calculateActualPrice(price: number, discountPercentage: number) {
    return Math.round((price * 100) / (100 - discountPercentage));
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
