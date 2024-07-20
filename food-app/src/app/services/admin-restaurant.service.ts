// src/app/services/admin-restaurant.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRestaurantService {
  private restaurants: any[] = [];

  constructor() {}

  getRestaurants(): Observable<any[]> {
    return of(this.restaurants);
  }

  addRestaurant(restaurant: any): void {
    this.restaurants.push(restaurant);
  }

  deleteRestaurant(id: string): void {
    this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id);
  }
}
