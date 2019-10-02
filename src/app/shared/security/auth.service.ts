import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AccessTokenClaims} from '../model/accessTokenClaims';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private oauthService: OAuthService) {
  }

  login(path?: string): void {
    this.oauthService.initImplicitFlow(path);
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  get accessTokenClaims(): AccessTokenClaims {
    const accessToken = this.oauthService.getAccessToken();
    if (accessToken === null || accessToken === undefined || !this.isLoggedIn()) {
      return null;
    }
    return this.jwtHelper.decodeToken(accessToken);
  }

  get userId(): string {
    const claims = this.accessTokenClaims;
    if (claims === null) {
      return null;
    }
    return claims.sub;
  }

  get preferredUserName(): string {
    const claims = this.accessTokenClaims;
    if (claims === null) {
      return null;
    }
    return claims.preferred_username;
  }

  get roles(): Array<string> {
    const claims = this.accessTokenClaims;
    if (claims === null
      || claims.realm_access === null || claims.realm_access === undefined
      || claims.realm_access.roles === null || claims.realm_access.roles === undefined) {
      return new Array<string>();
    }
    return claims.realm_access.roles;
  }

  hasRole(role: string): boolean {
    for (const roleName of this.roles) {
      if (roleName === role) {
        return true;
      }
    }
    return false;
  }

  hasAnyRole(roles: Array<string>): boolean {
    if (roles === null || roles === undefined) {
      return false;
    }
    for (const role of roles) {
      if (this.hasRole(role)) {
        return true;
      }
    }
    return false;
  }
}
