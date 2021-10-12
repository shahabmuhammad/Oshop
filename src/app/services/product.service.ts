import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
  }) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const $key = action.payload.key;
            const tempdata = action.payload.val();
            const data = { $key, ...(tempdata as object) };
            return data;
          });
        })
      );
  }

  get(productId: string) {
    return this.db.list('/products/' + productId);
  }

  update(
    productId: string,
    product: {
      title: string;
      price: number;
      category: string;
      imageUrl: string;
    }
  ) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
