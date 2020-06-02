import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  //Add
  create(product)
  {
    return this.db.list('/products').push(product);
  }

  //Get
  getAll()
  {
    return this.db.list('/products').snapshotChanges();
  }

  getProductById(productId: string)
  {
    return this.db.object('/products/' + productId).snapshotChanges();
  }

  update(productId: string, product)
  {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string)
  {
    return this.db.object('/products/' + productId).remove();
  }
}
