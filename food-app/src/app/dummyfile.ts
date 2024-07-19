import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = this.getCartFromLocalStorage();
  private products = new BehaviorSubject<any[]>(this.cartItems);
  private grandTotal = this.getTotalPrice();

  getProducts() {
    return this.products.asObservable();
  }

  addToCart(product: any) {
    const itemIndex = this.cartItems.findIndex(item => item.id === product.id);
    if (itemIndex === -1) {
      this.cartItems.push({ ...product, quantity: 1 });
    } else {
      this.cartItems[itemIndex].quantity += 1;
    }
    this.updateCart();
  }

  removeCartItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.updateCart();
  }

  removeAllCart() {
    this.cartItems = [];
    this.updateCart();
  }

  increaseQuantity(product: any) {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item) {
      item.quantity += 1;
      this.updateCart();
    }
  }

  decreaseQuantity(product: any) {
    const item = this.cartItems.find(item => item.id === product.id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.updateCart();
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private updateCart() {
    this.products.next(this.cartItems);
    this.grandTotal = this.getTotalPrice();
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private getCartFromLocalStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
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
      console.log("Cart products:", this.products);
    });

    this.grandTotal = this.cartService.getTotalPrice();
  }

  removeItem(item: any): void {
    this.cartService.removeCartItem(item);
    this.updateCart();
  }

  emptyCart(): void {
    this.cartService.removeAllCart();
    this.updateCart();
  }

  increaseQuantity(item: any): void {
    this.cartService.increaseQuantity(item);
    this.updateCart();
  }

  decreaseQuantity(item: any): void {
    this.cartService.decreaseQuantity(item);
    this.updateCart();
  }

  private updateCart(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }
}
