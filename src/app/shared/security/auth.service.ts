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

  logout() {
    this.oauthService.logOut();
  }

  get userId() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['sub'];
  }

  get preferredUserName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['preferred_username'];
  }
}
