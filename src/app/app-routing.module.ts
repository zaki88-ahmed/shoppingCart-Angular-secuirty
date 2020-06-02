import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminGuardService } from './services/guard/admin-guard.service';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { ShoopingCartComponent } from './shooping-cart/shooping-cart.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/guard/auth-guard.service';


const routes: Routes = [
  {path: 'home', component: ProductsComponent},
  {path: '', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shoopingCart', component: ShoopingCartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin/product/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'admin/product/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'my-orders', component: MyOrderComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
