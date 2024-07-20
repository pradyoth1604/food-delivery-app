// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminRestaurantComponent } from './admin-restaurant/admin-restaurant.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'menu/:id', component: MenuComponent },
  { path: 'admin/restaurants', component: AdminRestaurantComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: 'admin/menu', component: AdminMenuComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurants' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
