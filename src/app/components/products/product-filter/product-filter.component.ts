import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category: string | undefined;
  category$: any;
  constructor(private categoryService: CategoryService) {
    this.category$ = this.categoryService.getCategories().valueChanges();
  }

  ngOnInit(): void {}
}
