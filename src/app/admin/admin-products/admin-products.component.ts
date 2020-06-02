import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { ProductService } from 'src/app/services/shooping/product.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  filteredProducts;
  products: any[];
  Subscribe: Subscription;
  dtTrigger: Subject<any> = new Subject();

  constructor(private productServices: ProductService, private route: Router) {
    this.Subscribe = this.productServices.getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        this.dtTrigger.next();
      });
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
  }
  ngOnDestroy(): void {
    this.Subscribe.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
  delete(id: string) {
    if (confirm(`Are you sure you want to delete this Product ?`)) {
      this.productServices.delete(id);
      return this.route.navigate(['/admin/products']);
    }
  }
  filter(query) {
    console.log(query);

    if (query) {
      this.filteredProducts = this.products.filter(product => product.payload.val().title.toLowerCase().includes(query.toLowerCase()))
    }
    else {
      this.filteredProducts = this.products;
    }
  }
}