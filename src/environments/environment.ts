// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AuthConfig} from 'angular-oauth2-oidc';

export const environment = {
  production: false,
  retry: 2,
  dcConBaseUrl: 'https://dc.eixe.bremersee.org',
  viewRoles: ['LOCAL_USER', 'ADMIN'],
  editRoles: ['ADMIN'],
  tokenConfig: {
    allowedUrls: ['https://dc.eixe.bremersee.org/api', 'http://dc.eixe.bremersee.org:8090/api'],
    issuer: 'https://openid.dev.bremersee.org/auth/realms/omnia',
    clientId: 'omnia',
    scope: 'openid profile email'
  },
  avatarDefault: 'ROBOHASH'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
