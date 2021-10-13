import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Product } from '../models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts/').push({
      dataCreated: new Date().getTime(),
    });
  }
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key as string);
      return result.key as string;
    } else {
      return cartId;
    }
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key as string);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item == null)
          item$.set({
            product: {
              title: product.title,
              category: product.category,
              price: product.price,
              imageUrl: product.imageUrl,
            },
            quantity: 1,
          });
        else item$.update({ quantity: item.quantity + 1 });
      });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(
      '/shopping-carts/' + cartId + '/items/' + productId
    ) as any;
  }
}
