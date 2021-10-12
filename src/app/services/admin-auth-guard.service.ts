import { AppUser } from './../models/app-user';
import { UserModelService } from './user-model.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private userModel: UserModelService) {}

  canActivate(): Observable<boolean> {
    return this.auth.AppUser$.pipe(map((AppUser: AppUser) => AppUser?.isAdmin));
  }
}
