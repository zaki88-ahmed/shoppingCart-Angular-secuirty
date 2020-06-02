
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/shooping/category.service';
import { ProductService } from './../services/shooping/product.service';
import { Component, OnInit } from '@angular/core';
import { ShoopingCartService } from '../services/cart/shooping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products =[];
  categories$;
  category;
  filterdProducts;
  cart ;

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute,
    private cartServices: ShoopingCartService) 
    { 
      this.cartServices.getCart().valueChanges().subscribe(cart=>
        this.cart = cart)
    }

  ngOnInit(): void {
    this.productService.getAll().subscribe(prod=>
      {
        this.products = prod;
        this.route.queryParamMap.subscribe(params=>
          {
            this.category = params.get('category');
            console.log(this.category);

            
            this.filterdProducts = (this.category) ? this.products.filter(p => p.payload.val().category === this.category) : this.products;
           /*
            this.filterdProducts = (this.category) ?
            this.products.filter(p=>
              {
                return 
                p.payload.val().category = this.category;
                console.log(this.category);
                
                console.log(p);
                console.log(p.payload.val().category);
                console.log(p.payload.val());
                
                
                
              }
              ): this.products;
*/
              console.log(this.filterdProducts);
              
              
          })
      });
  this.categories$ = this.categoryService.getCategories();
  }

}
