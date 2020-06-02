export const environment = {
  production: true,
  env: 'dev',
  keycloakConfigLocation: '/assets/keycloak-prod.json',
  retry: 2,
  dcConBaseUrl: 'https://api.bremersee.org/dc-con-app',
  localUserRoles: ['LOCAL_USER'],
  adminRoles: ['ADMIN', 'DC_CON_ADMIN'],
  avatarDefault: 'ROBOHASH'
};
