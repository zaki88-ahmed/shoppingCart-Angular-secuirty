import { ShoopingCartService } from 'src/app/services/cart/shooping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import * as firebase  from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser;
  shoopingCartCounter;

constructor(public auth: AuthService, private shoopingCartService: ShoopingCartService) {
  this.auth.getApp.subscribe(user=>
    {
      console.log(user);
      this.appUser = user;

    })
}

  logout()
  {
    this.auth.logout();
  }

  ngOnInit()
  {
this.shoopingCartService.getCart().valueChanges().subscribe((cart: any) => {
  this.shoopingCartCounter = 0;

  for(const productKey in cart.items)
  {
    this.shoopingCartCounter += cart.items[productKey].quantity;
  }
})
  }



}
