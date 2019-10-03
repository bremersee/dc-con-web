import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidUserGuardService implements CanActivate {

  constructor(private oauthService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.oauthService.hasAnyRole(environment.viewRoles)) {
      return true;
    }
    // this.router.navigate(['/somewhere']);
    return false;
  }

}
