import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/admin-menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  menus: any[] = [];
  restaurantId: string = '';
  newMenu: any = {
    id: '',
    restaurantId: '',
    name: '',
    description: '',
    price: '',
    image: ''
  };
  editMode: boolean = false;

  constructor(private menuService: MenuService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus(this.restaurantId).subscribe((data: any[]) => {
      this.menus = data;
    });
  }

  addMenu(): void {
    this.newMenu.restaurantId = this.restaurantId;
    this.menuService.addMenu(this.newMenu);
    this.newMenu = {
      id: '',
      restaurantId: '',
      name: '',
      description: '',
      price: '',
      image: ''
    };
    this.loadMenus();
  }

  editMenu(menu: any): void {
    this.newMenu = { ...menu };
    this.editMode = true;
  }

  updateMenu(): void {
    this.menuService.editMenu(this.newMenu);
    this.newMenu = {
      id: '',
      restaurantId: '',
      name: '',
      description: '',
      price: '',
      image: ''
    };
    this.editMode = false;
    this.loadMenus();
  }

  deleteMenu(id: string): void {
    this.menuService.deleteMenu(id);
    this.loadMenus();
  }

  clearForm(): void {
    this.newMenu = {
      id: '',
      restaurantId: '',
      name: '',
      description: '',
      price: '',
      image: ''
    };
    this.editMode = false;
  }
}
