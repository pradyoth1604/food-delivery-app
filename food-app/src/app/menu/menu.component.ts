// src/app/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';
  filters: string[] = ['All', 'Food', 'Beverages','Appetizer', 'Dessert','Lunch', 'Pizza', 'Soup'];
  selectedFilter: string = 'All';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    this.fetchMenuItems(restaurantId);
  }

  fetchMenuItems(restaurantId: string | null): void {
    // Dummy data for menu items
    this.menuItems = [
      { id: 1, name: 'Margherita Pizza', category: 'Pizza', restaurantId: '224920', img: 'https://static.vecteezy.com/system/resources/previews/021/217/656/non_2x/pizza-margherita-food-png.png', cost: 12.99, rating: 4.5, timeToMake: '30 mins' },
      { id: 2, name: 'Tomato Soup', category: 'Soup', restaurantId: '224920', img: 'https://png.pngtree.com/png-clipart/20230531/original/pngtree-tomato-soup-front-view-png-image_9174532.png', cost: 6.99, rating: 4.0, timeToMake: '20 mins' },
      { id: 3, name: 'Burger', category: 'Food', restaurantId: '224920', img: 'https://png.pngtree.com/png-clipart/20230325/original/pngtree-juicy-burgers-with-a-transparent-background-png-image_9002761.png', cost: 9.99, rating: 4.2, timeToMake: '25 mins' },
      { id: 4, name: 'Coca Cola', category: 'Beverages', restaurantId: '224920', img: 'https://th.bing.com/th/id/OIP.xTae7SI_cGtaszX0wkfh0QHaEk?rs=1&pid=ImgDetMain', cost: 2.99, rating: 4.7, timeToMake: '5 mins' },
      { id: 5, name: 'Caesar Salad', category: 'Lunch', restaurantId: '22490', img: 'https://freepngdesign.com/content/uploads/images/caesar-salad-6048.png', cost: 8.99, rating: 4.3, timeToMake: '15 mins' },
      { id: 6, name: 'Pepsi', category: 'Beverages', restaurantId: '723874', img: 'https://th.bing.com/th/id/OIP.xTae7SI_cGtaszX0wkfh0QHaEk?rs=1&pid=ImgDetMain', cost: 2.49, rating: 4.0, timeToMake: '5 mins' },
      { id: 7, name: 'Pasta Alfredo', category: 'Pasta', restaurantId: '127614', img: 'https://th.bing.com/th/id/OIP.-A6xxddga9lqMNtF664mcAHaFh?rs=1&pid=ImgDetMain', cost: 11.99, rating: 4.6, timeToMake: '35 mins' },
      { id: 8, name: 'Garlic Bread', category: 'Appetizer', restaurantId: '127614', img: 'https://th.bing.com/th/id/OIP.baMBqJBZtkGgFj_D-zxumAHaFz?rs=1&pid=ImgDetMain', cost: 5.99, rating: 4.1, timeToMake: '10 mins' },
      { id: 9, name: 'Chicken Wings', category: 'Appetizer', restaurantId: '380152', img: 'https://www.thespruceeats.com/thmb/y6gT4wgjN5E4l-LNRGM8mrrpHPs=/4602x3068/filters:fill(auto,1)/traditional-chicken-wings-912937-hero-01-6c1a003373a54538a732abc0005145d8.jpg', cost: 10.99, rating: 4.4, timeToMake: '30 mins' },
      { id: 10, name: 'French Fries', category: 'Appetizer', restaurantId: '380152', img: 'path_to_image_10.jpg', cost: 4.99, rating: 4.0, timeToMake: '12 mins' },
      { id: 11, name: 'Sushi Roll', category: 'Sushi', restaurantId: '666981', img: 'path_to_image_11.jpg', cost: 15.99, rating: 4.8, timeToMake: '25 mins' },
      { id: 12, name: 'Miso Soup', category: 'Soup', restaurantId: '666981', img: 'path_to_image_12.jpg', cost: 7.99, rating: 4.2, timeToMake: '18 mins' },
      { id: 13, name: 'Fish Tacos', category: 'Tacos', restaurantId: '481918', img: 'path_to_image_13.jpg', cost: 12.49, rating: 4.5, timeToMake: '22 mins' },
      { id: 14, name: 'Guacamole', category: 'Dip', restaurantId: '481918', img: 'path_to_image_14.jpg', cost: 6.99, rating: 4.1, timeToMake: '10 mins' },
      { id: 15, name: 'Steak', category: 'Main Course', restaurantId: '80312', img: 'path_to_image_15.jpg', cost: 19.99, rating: 4.9, timeToMake: '40 mins' },
      { id: 16, name: 'Potato Salad', category: 'Salad', restaurantId: '80312', img: 'path_to_image_16.jpg', cost: 8.49, rating: 4.3, timeToMake: '15 mins' },
      { id: 17, name: 'Cheesecake', category: 'Dessert', restaurantId: '404669', img: 'path_to_image_17.jpg', cost: 7.99, rating: 4.4, timeToMake: '20 mins' },
      { id: 18, name: 'Ice Cream', category: 'Dessert', restaurantId: '404669', img: 'path_to_image_18.jpg', cost: 5.99, rating: 4.0, timeToMake: '10 mins' },
      { id: 19, name: 'Pad Thai', category: 'Thai', restaurantId: '147244', img: 'path_to_image_19.jpg', cost: 13.99, rating: 4.6, timeToMake: '25 mins' },
      { id: 20, name: 'Thai Iced Tea', category: 'Beverages', restaurantId: '147244', img: 'path_to_image_20.jpg', cost: 3.99, rating: 4.2, timeToMake: '5 mins' },
      { id: 21, name: 'Sashimi', category: 'Sushi', restaurantId: '80427', img: 'path_to_image_21.jpg', cost: 17.99, rating: 4.7, timeToMake: '30 mins' },
      { id: 22, name: 'Edamame', category: 'Appetizer', restaurantId: '80427', img: 'path_to_image_22.jpg', cost: 6.49, rating: 4.0, timeToMake: '12 mins' },
    ];


    this.filteredItems = this.menuItems.filter(item => item.restaurantId === restaurantId);
  }

  search(): void {
    this.filteredItems = this.menuItems.filter(item =>
      item.restaurantId === this.route.snapshot.paramMap.get('id') &&
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedFilter === 'All' || item.category === this.selectedFilter)
    );
  }

  applyFilter(filter: string): void {
    this.selectedFilter = filter;
    this.search();
  }
}
