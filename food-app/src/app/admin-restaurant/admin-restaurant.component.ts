// src/app/components/admin-restaurant/admin-restaurant.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminRestaurantService } from '../services/admin-restaurant.service';

@Component({
  selector: 'app-admin-restaurant',
  templateUrl: './admin-restaurant.component.html',
  styleUrls: ['./admin-restaurant.component.css']
})
export class AdminRestaurantComponent implements OnInit {
  restaurants: any[] = [];
  newRestaurant: any = {
    id: '',
    name: '',
    locality: '',
    areaName: '',
    cuisines: '',
    costForTwo: '',
    avgRatingString: '',
    totalRatingsString: '',
    cloudinaryImageId: ''
  };

  constructor(private adminRestaurantService: AdminRestaurantService) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.adminRestaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  addRestaurant(): void {
    const restaurant = { ...this.newRestaurant, cuisines: this.newRestaurant.cuisines.split(',') };
    this.adminRestaurantService.addRestaurant(restaurant);
    this.newRestaurant = {
      id: '',
      name: '',
      locality: '',
      areaName: '',
      cuisines: '',
      costForTwo: '',
      avgRatingString: '',
      totalRatingsString: '',
      cloudinaryImageId: ''
    };
    this.loadRestaurants();
  }

  deleteRestaurant(id: string): void {
    this.adminRestaurantService.deleteRestaurant(id);
    this.loadRestaurants();
  }
}
