import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://dummyjson.com/products';

  getAllProducts() {
    return this.http.get<{
      products: Product[];
    }>(`${this.baseUrl}`);
  }
  getSearchedProducts(params?: HttpParams) {
    return this.http.get<{
      products: Product[];
    }>(`${this.baseUrl}/search`, { params });
  }
  getProduct(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
