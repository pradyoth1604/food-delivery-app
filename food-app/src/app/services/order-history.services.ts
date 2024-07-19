import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  constructor() {}

  getOrderHistory(): Observable<any[]> {
    // Replace this dummy data with actual API call to fetch order history
    const dummyOrders = [
      {
        id: '1',
        date: new Date(),
        items: [
          { name: 'Margherita Pizza', quantity: 2 },
          { name: 'Edamame', quantity: 1 }
        ],
        totalCost: 31.97,
        status: 'Delivered'
      },
      {
        id: '2',
        date: new Date(),
        items: [
          { name: 'Mushroom Soup', quantity: 1 },
          { name: 'Caesar Salad', quantity: 1 }
        ],
        totalCost: 15.49,
        status: 'Delivered'
      }
    ];
    return of(dummyOrders);
  }
}
