import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = this.getCartFromLocalStorage();
  private products = new BehaviorSubject<any[]>(this.cartItems);
  private grandTotal: number = this.getTotalPrice();
  private orderHistory: any[] = this.getOrderHistoryFromLocalStorage();

  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }

  addToCart(product: any): void {
    const itemIndex = this.cartItems.findIndex(item => item.id === product.id);
    if (itemIndex === -1) {
      this.cartItems.push({ ...product, quantity: 1 });
    } else {
      this.cartItems[itemIndex].quantity += 1;
    }
    this.updateCart();
  }

  removeCartItem(product: any): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.updateCart();
  }

  removeAllCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  increaseQuantity(product: any): void {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      item.quantity += 1;
      this.updateCart();
    }
  }

  decreaseQuantity(product: any): void {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.updateCart();
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.cost * item.quantity, 0);
  }

  placeOrder(address: string, products: any[]): Observable<any> {
    const newOrder = {
      id: this.generateOrderId(),
      date: new Date(),
      items: [...products],
      totalCost: this.getTotalPrice(),
      status: 'Delivered',
      address: address
    };
    this.orderHistory.push(newOrder);
    this.saveOrderHistoryToLocalStorage();
    this.removeAllCart();
    return of(newOrder);
  }

  getOrderHistory(): Observable<any[]> {
    return of(this.orderHistory);
  }

  private updateCart(): void {
    this.products.next(this.cartItems);
    this.grandTotal = this.getTotalPrice();
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private getCartFromLocalStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveOrderHistoryToLocalStorage(): void {
    localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory));
  }

  private getOrderHistoryFromLocalStorage(): any[] {
    const orderHistory = localStorage.getItem('orderHistory');
    return orderHistory ? JSON.parse(orderHistory) : [];
  }

  private generateOrderId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}


import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
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

  placeOrder(): void {
    if (this.address) {
      this.cartService.placeOrder(this.address, this.products).subscribe(res => {
        alert('Order placed successfully!');
        this.router.navigate(['/']);
      });
    } else {
      alert('Please enter your address');
    }
  }
}




import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  constructor(private cartService: CartService) {}

  getOrderHistory(): Observable<any[]> {
    return this.cartService.getOrderHistory();
  }
}





import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orders: any[] = [];

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.orderHistoryService.getOrderHistory().subscribe(res => {
      this.orders = res;
    });
  }
}




<div *ngIf="orders.length > 0">
  <div *ngFor="let order of orders">
    <h4>Order ID: {{ order.id }}</h4>
    <p>Date: {{ order.date | date }}</p>
    <p>Status: {{ order.status }}</p>
    <p>Total Cost: {{ order.totalCost | currency }}</p>
    <p>Address: {{ order.address }}</p>
    <ul>
      <li *ngFor="let item of order.items">
        {{ item.name }} - Quantity: {{ item.quantity }}
      </li>
    </ul>
  </div>
</div>

<div *ngIf="orders.length === 0">
  <h2>No orders found</h2>
</div>
