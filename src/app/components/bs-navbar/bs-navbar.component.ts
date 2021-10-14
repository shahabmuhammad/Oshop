import { AppUser } from './../../models/app-user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  isCollapsed: boolean = false;
  User: AppUser | undefined;
  ShoppingCartItem: number | undefined;
  constructor(
    private auth: AuthService,
    private router: Router,
    private shoppingCart: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.AppUser$.subscribe((user) => {
      this.User = user;
    });

    let cart$ = await this.shoppingCart.getCart();
    cart$.valueChanges().subscribe((cart: any) => {
      this.ShoppingCartItem = 0;
      for (let productId in cart.items) {
        this.ShoppingCartItem += cart.items[productId].quantity;
      }
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
