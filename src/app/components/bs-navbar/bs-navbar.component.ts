import { AppUser } from './../../models/app-user';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  isCollapsed: boolean = false;
  User: AppUser | undefined;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.AppUser$.subscribe((user) => {
      this.User = user;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
