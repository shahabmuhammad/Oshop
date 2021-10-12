import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
interface Response {
  title: string;
  price?: number;
  category?: string;
  imageUrl?: string;
}
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[] | undefined;
  filterProducts: any[] | undefined;
  ProductSubcription: Subscription | undefined;
  constructor(private productsService: ProductService) {
    this.ProductSubcription = this.productsService
      .getAll()
      .subscribe((product) => (this.filterProducts = this.products = product));
  }
  filter(query: string) {
    this.filterProducts = query
      ? this.products?.filter((p: { title: string }) =>
          p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.ProductSubcription?.unsubscribe();
  }
}
