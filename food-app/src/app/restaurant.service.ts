// src/app/restaurant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private API_URL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.385044&lng=78.486671&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }
}
