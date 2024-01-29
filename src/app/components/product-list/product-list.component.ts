import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  private ngUnsubscribe = new Subject<void>();

  loading = true;
  loadProductsErr = '';
  products: Product[] = [];
  searchForm: FormGroup;
  searchText = '';

  constructor(private productService: ProductService) {
    this.searchForm = new FormGroup({
      searchText: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.loading = true;
    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.products = res.products;
          this.loadProductsErr = '';
          this.loading = false;
        },
        error: (err) => {
          this.loadProductsErr = err.error.message;
          this.loading = false;
        },
      });
  }
  searchProducts() {
    if (!this.loading) {
      const formText = this.searchForm.value.searchText.trim();
      if (formText == this.searchText) {
        return;
      }
      this.searchText = formText;
      if (this.searchText == '') {
        this.loading = true;
        this.productService
          .getAllProducts()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe({
            next: (res) => {
              this.products = res.products;
              this.loadProductsErr = '';
              this.loading = false;
            },
            error: (err) => {
              this.loadProductsErr = err.error.message;
              this.loading = false;
            },
          });
      } else {
        const params = new HttpParams().set('q', this.searchText);
        this.loading = true;
        this.productService
          .getSearchedProducts(params)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe({
            next: (res) => {
              this.products = res.products;
              this.loading = false;
            },
            error: (err) => {
              this.loading = false;
              this.loadProductsErr = err.error.message;
            },
          });
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
