export const environment = {
  production: true,
  env: 'dev',
  keycloakConfigLocation: '/dc-con/assets/keycloak-prod.json',
  keycloakLogoutLocation: '/dc-con',
  silentCheckSsoLocation: '/dc-con/silent-check-sso.html',
  retry: 2,
  dcConBaseUrl: 'https://api.bremersee.org/dc-con-app',
  localUserRoles: ['LOCAL_USER'],
  adminRoles: ['ADMIN', 'DC_CON_ADMIN'],
  avatarDefault: 'ROBOHASH'
};
