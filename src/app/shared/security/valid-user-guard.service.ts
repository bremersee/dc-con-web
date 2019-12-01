import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidUserGuardService implements CanActivate {

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
      return this.isAuthenticated;
    }));
  }

}
