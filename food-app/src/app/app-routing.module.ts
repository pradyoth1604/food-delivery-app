// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderHistoryComponent } from './order-history/order-history.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'menu/:id', component: MenuComponent }, // New route for menu component
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: '**', redirectTo: '/restaurants' },
  { path: 'order-history', component: OrderHistoryComponent },
  // { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], data: { expectedRole: 'user' } }, // Protect with AuthGuard
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { expectedRole: 'admin' } }, // Admin route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
