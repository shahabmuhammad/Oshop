import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserModelService {
  constructor(private db: AngularFireDatabase) {}

  save(name: any, email: any, uid: any) {
    const itemRef = this.db.object('/users/' + uid);
    itemRef
      .update({
        name: name,
        email: email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get(uid: string | undefined): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
