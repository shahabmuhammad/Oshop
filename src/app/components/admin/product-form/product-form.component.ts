import { ProductService } from './../../../services/product.service';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$: any | undefined;
  cardWidth: string = '23rem';
  product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
  };
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories().valueChanges();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id as string)
        .valueChanges()
        .pipe(take(1))
        .subscribe((p) => {
          console.log(p);
          this.product.category = p[0] as string;
          this.product.imageUrl = p[1] as string;
          this.product.price = p[2] as number;
          this.product.title = p[3] as string;
        });
    }
  }

  ngOnInit(): void {}

  save(products: {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
  }) {
    if (this.id) this.productService.update(this.id, products);
    else this.productService.create(products);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(this.id as string);
      this.router.navigate(['/admin/products']);
    }
  }
}
