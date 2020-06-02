import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/shooping/product.service';
import { CategoryService } from './../../services/shooping/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: any= {};
  categories$;
  id= '';

  constructor(private categoryService: CategoryService, private productSvr: ProductService, 
    private router: Router, private actvRouter: ActivatedRoute) 
  { 
    this.id = this.actvRouter.snapshot.paramMap.get('id');
    if(this.id)
    {
      this.productSvr.getProductById(this.id).subscribe(product=> this.product = product);
    }
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {
  }

  save(product)
  {
    if(this.id)
    {
      this.productSvr.update(this.id, product);
    }
    else
    {
      this.productSvr.create(product);
    }
    
    this.router.navigate(['/admin/products']);
    console.log(product);
    
  }

}
