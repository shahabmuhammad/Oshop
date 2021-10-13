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

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart?.items) return 0;
    let item = this.shoppingCart.items[this.product.$key as string];
    return item ? item.quantity : 0;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  ngOnInit(): void {}
}
