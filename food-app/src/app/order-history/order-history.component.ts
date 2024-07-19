import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderHistoryService: OrderHistoryService) {}

  ngOnInit(): void {
    this.fetchOrderHistory();
  }

  fetchOrderHistory(): void {
    this.orderHistoryService.getOrderHistory().subscribe((data: any[]) => {
      this.orders = data;
    });
  }
}
