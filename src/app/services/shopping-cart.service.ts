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
    return this.db.list('/shopping-cart/').push({
      dataCreated: new Date().getTime(),
    });
  }
  // private getCart(cartId: string) {
  //   return this.db.object('/shopping-cart/' + cartId);
  // }

  private async getOrCreateCartId() {
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
    let key = product.$key as string;
    console.log(`/shopping-cart/${cartId}/items/${key}`);
    let item$ = this.db.object(`/shopping-cart/${cartId}/items/${key}`);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item?.exists()) item$.update({ quantity: item.quantity + 1 });
        else item$.set({ product: product, quantity: 1 });
      });

    console.log('reched');
  }
}
