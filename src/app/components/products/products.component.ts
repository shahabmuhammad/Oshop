import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any = [];
  filterProducts: any = [];
  category: string | undefined;
  cardWidth: string = '15rem';

  routeSubscriptions: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.routeSubscriptions = this.productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          console.log(this.products);
          return this.route.queryParamMap;
        })
      )
      .subscribe((params: any) => {
        this.category = params.get('category');

        this.filterProducts = this.category
          ? this.products.filter((p: any) => p.category === this.category)
          : this.products;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.routeSubscriptions?.unsubscribe();
  }
}
