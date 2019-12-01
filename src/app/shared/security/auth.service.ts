import {Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AccessTokenClaims} from '../model/access-token-claims';
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AuthStorageService} from './auth-storage.service';
import {CookieService} from 'ngx-cookie-service';
import {browser} from 'protractor';

export const authConfig: AuthConfig = {
  issuer: environment.tokenConfig.issuer,
  redirectUri: window.location.origin,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  clientId: environment.tokenConfig.clientId,
  scope: environment.tokenConfig.scope,
  sessionChecksEnabled: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isDoneLoadingSubject = new ReplaySubject<boolean>();

  public isDoneLoading = this.isDoneLoadingSubject.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errored, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes: Observable<boolean> = combineLatest([
    this.isAuthenticated,
    this.isDoneLoading
  ]).pipe(map(values => values.every(b => b)));

  private navigateToLoginPage() {
    console.warn('Navigate to login page.');
    this.router.navigateByUrl('/');
  }

  constructor(private oauthService: OAuthService, private router: Router, private cookieService: CookieService) {

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // this.oauthService.setStorage(new AuthStorageService(this.cookieService));

    // This is tricky, as it might cause race conditions (where access_token is set in another
    // tab before everything is said and done there.
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
      this.isAuthenticatedSubject.next(this.oauthService.hasValidAccessToken());

      if (!this.oauthService.hasValidAccessToken()) {
        this.navigateToLoginPage();
      }
    });

    this.oauthService.events.subscribe(() => {
      this.isAuthenticatedSubject.next(this.oauthService.hasValidAccessToken());
    });

    this.oauthService.events
    .pipe(filter(e => ['token_received'].includes(e.type)))
    .subscribe(() => this.oauthService.loadUserProfile());

    this.oauthService.events
    .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
    .subscribe(e => {
      console.warn('Session: ' + e.type);
      return this.navigateToLoginPage();
    });

    this.oauthService.setupAutomaticSilentRefresh();
  }

  public runInitialLoginSequence(): Promise<void> {
    if (location.hash) {
      console.log('Encountered hash fragment, plotting as table...');
      console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
    }
    // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // return Promise.resolve();

    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    // currently configured:
    return this.oauthService.loadDiscoveryDocument()

    // For demo purposes, we pretend the previous call was very slow
    // .then(() => new Promise(resolve => setTimeout(() => resolve(), 1000)))

    // 1. HASH LOGIN:
    // Try to log in via hash fragment after redirect back
    // from IdServer from initImplicitFlow:
    .then(() => this.oauthService.tryLogin())

    .then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        return Promise.resolve();
      }

      // 2. SILENT LOGIN:
      // Try to log in via silent refresh because the IdServer
      // might have a cookie to remember the user, so we can
      // prevent doing a redirect:
      return this.oauthService.silentRefresh()
      .then(() => Promise.resolve())
      .catch(result => {
        // Subset of situations from https://openid.net/specs/openid-connect-core-1_0.html#AuthError
        // Only the ones where it's reasonably sure that sending the
        // user to the IdServer will help.
        const errorResponsesRequiringUserInteraction = [
          'interaction_required',
          'login_required',
          'account_selection_required',
          'consent_required',
        ];

        if (result
          && result.reason
          && errorResponsesRequiringUserInteraction.indexOf(result.reason.error) >= 0) {

          // 3. ASK FOR LOGIN:
          // At this point we know for sure that we have to ask the
          // user to log in, so we redirect them to the IdServer to
          // enter credentials.
          //
          // Enable this to ALWAYS force a user to login.
          // this.oauthService.initImplicitFlow();
          //
          // Instead, we'll now do this:
          console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
          return Promise.resolve();
        }

        // We can't handle the truth, just pass on the problem to the
        // next handler.
        return Promise.reject(result);
      });
    })

    .then(() => {
      this.isDoneLoadingSubject.next(true);

      // Check for the strings 'undefined' and 'null' just to be sure. Our current
      // login(...) should never have this, but in case someone ever calls
      // initImplicitFlow(undefined | null) this could happen.
      if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
        console.log('There was state, so we are sending you to: ' + this.oauthService.state);
        this.router.navigateByUrl(this.oauthService.state);
      }
    })
    .catch(() => this.isDoneLoadingSubject.next(true));
  }


  login(targetUrl?: string): void {
    if (targetUrl !== undefined && targetUrl !== null) {
      this.oauthService.initImplicitFlow(encodeURIComponent(targetUrl || this.router.url));
    } else {
      this.oauthService.initImplicitFlow();
    }
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  get accessTokenClaims(): AccessTokenClaims {
    if (!this.oauthService.hasValidAccessToken()) {
      return null;
    }
    const accessToken = this.oauthService.getAccessToken();
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
