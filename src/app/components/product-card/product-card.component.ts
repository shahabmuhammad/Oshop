import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product')
  product!: Product;
  @Input('showBtn') showBtn: boolean = false;
  @Input('cardWidth') cardWidth: string = '';
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.product.$key as string];
    console.log(this.shoppingCart);
    return item ? item.quantity : 0;
  }

  ngOnInit(): void {}
}
