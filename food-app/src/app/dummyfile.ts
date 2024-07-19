
Pradyoth Reddy <pradyothreddy1604@gmail.com>
1:15 PM (3 minutes ago)
to pradyreddy

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadCartFromLocalStorage();
  }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    this.saveCartToLocalStorage();
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.saveCartToLocalStorage();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
    this.saveCartToLocalStorage();
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }

  private loadCartFromLocalStorage() {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartItemList = JSON.parse(cartItems);
      this.productList.next(this.cartItemList);
    }
  }
}





import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      console.log(">>>>>>>>>>>>>>", this.products);
    });
    this.grandTotal = this.cartService.getTotalPrice();
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}

//
// checkout.Component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public products: any = [];
  public grandTotal: number = 0;
  public address: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  placeOrder() {
    if (this.address) {
      this.cartService.placeOrder(this.address, this.products).subscribe(res => {
        alert('Order placed successfully!');
        this.cartService.removeAllCart();
        this.router.navigate(['/']);
      });
    } else {
      alert('Please enter your address');
    }
  }
}


//html
<div class="container">
  <h2>Checkout</h2>
  <div>
    <label for="address">Address:</label>
    <input id="address" [(ngModel)]="address" class="form-control" placeholder="Enter your address"/>
  </div>
  <table class="table table-responsive">
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Item Name</th>
        <th>Item Image</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of products; let i = index">
        <td>{{i + 1}}</td>
        <td>{{item.name}}</td>
        <td><img [src]="item.img" alt="{{item.name}}" /></td>
        <td>{{item.category}}</td>
        <td>{{item.price}}</td>
        <td>{{item.quantity}}</td>
        <td>{{item.price * item.quantity}}</td>
      </tr>
    </tbody>
  </table>
  <div>
    <h3>Total: {{grandTotal}}</h3>
    <button (click)="placeOrder()" class="btn btn-success">Place Order</button>
  </div>
</div>


//cart.servive.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() {
    this.loadCart();
  }

  getProducts(): Observable<any[]> {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    this.saveCart();
  }

  addToCart(product: any) {
    const existingProduct = this.cartItemList.find((item: any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    this.saveCart();
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.price * a.quantity;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  increaseQuantity(product: any) {
    const existingProduct = this.cartItemList.find((item: any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  decreaseQuantity(product: any) {
    const existingProduct = this.cartItemList.find((item: any) => item.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    }
    this.productList.next(this.cartItemList);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemList));
  }

  loadCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItemList = JSON.parse(savedCart);
      this.productList.next(this.cartItemList);
    }
  }

  placeOrder(address: string, products: any[]): Observable<any> {
    // Simulate order placement logic
    return of({ success: true, message: 'Order placed successfully!' });
  }
}


//cart.html

<ng-container>
  <div class="container">
    <div class="card-table">
      <div class="card-product">
        <table class="table table-responsive">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Item Name</th>
              <th>Item Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of products; let i = index">
              <td>{{i + 1}}</td>
              <td>{{item.name}}</td>
              <td><img [src]="item.img" alt="{{item.name}}" /></td>
              <td>{{item.category}}</td>
              <td>{{item.price}}</td>
              <td>
                <button (click)="decreaseQuantity(item)" class="btn btn-secondary">-</button>
                {{item.quantity}}
                <button (click)="increaseQuantity(item)" class="btn btn-secondary">+</button>
              </td>
              <td>{{item.price * item.quantity}}</td>
              <td>
                <button (click)="removeItem(item)" class="btn btn-danger">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div *ngIf="products.length > 0">
      <h3>Total: {{grandTotal}}</h3>
      <button class="btn btn-primary" [routerLink]="['/checkout']">Checkout</button>
    </div>
  </div>
</ng-container>
<ng-container *ngIf="products.length === 0">
  <div class="cart-container">
    <h2>Your Cart is Empty</h2>
    <img src="https://th.bing.com/th/id/R.cc53ef5c29f3fadid74f6da" alt="Empty Cart" height="250px"/>
    <p>Add items to your cart to view them here.</p>
  </div>
</ng-container>


//app-routing

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component'; // Import the CheckoutComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'checkout', component: CheckoutComponent }, // Add the checkout route
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurants' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


