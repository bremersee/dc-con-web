import {Component} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthErrorEvent, OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.tokenConfig.issuer,
  redirectUri: window.location.origin,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  clientId: environment.tokenConfig.clientId,
  scope: environment.tokenConfig.scope
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dc-con-web';

  constructor(private oauthService: OAuthService, private router: Router) {
    oauthService.configure(authConfig);
    oauthService.tokenValidationHandler = new JwksValidationHandler();
    oauthService.events.subscribe(e => {
      if (e instanceof OAuthErrorEvent) {
        const path = this.router.url;
        // if (path.startsWith('/basecamp-redirect')) {
        //  this.oauthService.initImplicitFlow('/basecamp');
        // } else {
        //  console.error(e);
        // }
      } else {
        // console.warn(e);
      }
    });

    // Load Discovery Document and then try to login the user
    oauthService.loadDiscoveryDocument()
    // See if the hash fragment contains tokens (when user got redirected back)
    .then(() => oauthService.tryLogin({
      onTokenReceived: (info) => {
        console.warn('path: |' + info.state + '|');
        // this.router.navigate([info.state]);
        /*
        console.warn('path: |' + info.state + '|');
        if (info.state && info.state.trim() !== '') {
          const path = info.state.trim();
          if (info.state.trim().startsWith('/')) {
            router.navigate(['' + path]);
          } else {
            router.navigate(['/' + path]);
          }
        } else {
          router.navigate(['']);
        }
        */
      },
      onLoginError: (anyObj) => {
        console.error('response: ', anyObj);
      }
    }))
    // If we're still not logged in yet, try with a silent refresh:
    .then(() => {
      console.warn('logged in? ' + oauthService.hasValidAccessToken());
      /*
      if (!oauthService.hasValidAccessToken()) {
        console.warn('Doing silent refresh.');
        return oauthService.silentRefresh();
      } else {
        console.warn('Already logged in:', this.router.url); // current path
        router.navigate(['']);
      }
      */
    });

    console.warn('Setup automatic refresh.');
    oauthService.setupAutomaticSilentRefresh();
  }
}
