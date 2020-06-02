import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoopingCartService {

  constructor(private db: AngularFireDatabase) { }

  async clearCart()
  {
    let cartId = await this.getOrCreateCartId();
    return this.db.list('/shopping-carts/').remove();
  }

  create()
  {
    return this.db.list('/shopping-carts').push(
      {
        dateCreate: new Date().getTime()
      }
    )
  }

  private getOrCreateCartId()
  {
    // get cart ID from local storage
    const cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    // if cart is not exist ==> create collection of shopping cart
    const result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  public getCart()
  {
    const cartId = this.getOrCreateCartId();
    return this.db.object('/shooping-carts/' + cartId);
  }


  getItem(cartId, productId)
  {
    return this.db.object('/shooping-carts/'+cartId+'/items/'+productId)
  }



  public addToCart(product)
  {
    this.updateItemQuantity(product, 1);
  }

  public removeFromCart(product)
  {
    this.updateItemQuantity(product, -1);
  }


  private async updateItemQuantity(product, change)
  {
    const cartId = this.getOrCreateCartId();
    const items$ = this.getItem(cartId, product.key);
    //3 : update items
    items$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if(item.payload.exists())
      {
        items$.update({quantity: item.payload.val().quantity + change})
      }
      else
      {
        items$.update(
          {
            product:
            {
              title: product.payload.val().title,
              price: product.payload.val().price,
              category: product.payload.val().category,
              imageUrl: product.payload.val().imageUrl,
            }, quantity: 1
          }
        )
      }
    })
  }

}
