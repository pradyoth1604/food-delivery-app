import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus: any[] = [];

  constructor() {}

  getMenus(restaurantId: string): Observable<any[]> {
    return of(this.menus.filter(menu => menu.restaurantId === restaurantId));
  }

  addMenu(menu: any): void {
    this.menus.push(menu);
  }

  editMenu(menu: any): void {
    const index = this.menus.findIndex(m => m.id === menu.id);
    if (index !== -1) {
      this.menus[index] = menu;
    }
  }

  deleteMenu(id: string): void {
    this.menus = this.menus.filter(menu => menu.id !== id);
  }
}
