import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalUserGuardService implements CanActivate {

  private isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.authService.isAuthenticated.subscribe(i => this.isAuthenticated = i);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isDoneLoading
    .pipe(filter(isDone => isDone))
    .pipe(tap(() => this.isAuthenticated || this.authService.login(state.url)))
    .pipe(map(() => {
      console.warn('Is authenticated: ' + this.isAuthenticated);
      return this.isAuthenticated && this.authService.isLocalUser;
    }));
  }

}
