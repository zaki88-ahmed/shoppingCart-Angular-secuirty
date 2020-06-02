
import { Component, OnInit, Input } from '@angular/core';
import { ShoopingCartService } from 'src/app/services/cart/shooping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {


  @Input('product') product: any= {};
  @Input('ShowAdd') ShowAdd = true;
  @Input('shoopingCart') shoopingCart;

  constructor(private cartServices: ShoopingCartService) { }

  addToCart(product)
  {
    this.cartServices.addToCart(product);
  }

  removeFromCart(product)
  {
    this.cartServices.removeFromCart(product);
  }

  getQuantity()
  {
    if(!this.shoopingCart) return 0;
    const item = this.shoopingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

  ngOnInit(): void {
    console.log(this.product);


  }

}
