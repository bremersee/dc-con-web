export const environment = {
  production: true,
  env: 'prod',
  keycloakConfigLocation: '/assets/keycloak-dev.json',
  silentCheckSsoLocation: '/silent-check-sso.html',
  retry: 2,
  dcConBaseUrl: 'https://ad.eixe.bremersee.org',
  localUserRoles: ['LOCAL_USER'],
  adminRoles: ['ADMIN', 'DC_CON_ADMIN'],
  avatarDefault: 'ROBOHASH'
};
