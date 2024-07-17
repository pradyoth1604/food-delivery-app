import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  IMG_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/";
  searchTerm: string = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getRestaurants();
    this.filteredRestaurants = [...this.restaurants];
  }

  search() {
    if (!this.searchTerm.trim()) {
      this.filteredRestaurants = [...this.restaurants];
    } else {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.info.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredRestaurants = [...this.restaurants];
  }
}
