// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  env: 'dev',
  keycloakConfigLocation: '/assets/keycloak-prod.json',
  silentCheckSsoLocation: '/silent-check-sso.html',
  keycloakLogoutLocation: '',
  retry: 2,
  dcConBaseUrl: 'https://api.bremersee.org/dc-con-app',
  localUserRoles: ['LOCAL_USER'],
  adminRoles: ['ADMIN', 'DC_CON_ADMIN'],
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
