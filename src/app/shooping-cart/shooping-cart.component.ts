import { ShoopingCartService } from 'src/app/services/cart/shooping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shooping-cart',
  templateUrl: './shooping-cart.component.html',
  styleUrls: ['./shooping-cart.component.css']
})
export class ShoopingCartComponent implements OnInit {

  cartProducts: any[] = [];
  constructor(private shoopingCartServices: ShoopingCartService) { }

  ngOnInit(): void {
    this.shoopingCartServices.getCart().valueChanges().subscribe((cart: any) => {
      for(const productKey in cart.items){
        this.cartProducts.push(cart.items[productKey])
      }
    });
    console.log(this.cartProducts);

  }

}
