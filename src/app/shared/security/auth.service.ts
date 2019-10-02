import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  get userId(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['sub'];
  }

  get preferredUserName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['preferred_username'];
  }

  get roles(): Array<string> {
    const accessToken = this.oauthService.getAccessToken();
    const claims = this.oauthService.getIdentityClaims();
    if (claims === null || claims === undefined) {
      return new Array<string>();
    }
    console.warn('Claims: ' + JSON.stringify(claims));
    const realmAccess = claims['realm_access']; // realm_access
    if (realmAccess === null || realmAccess === undefined) {
      console.warn('No realm_access')
      return new Array<string>();
    }
    const roles =  realmAccess['roles'];
    if (roles === null || roles === undefined) {
      console.warn('No roles')
      return new Array<string>();
    }
    for (const role of roles) {
      console.warn('Role = ' + role);
    }
    return roles;
  }

  hasRole(role: string): boolean {
    const roleNames = this.roles;
    if (roleNames == null) {
      return false;
    }
    for (const roleName of roleNames) {
      if (roleName === role) {
        return true;
      }
    }
    return false;
  }
}
