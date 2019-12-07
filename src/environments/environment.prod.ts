export const environment = {
  production: true,
  env: 'prod',
  retry: 2,
  dcConBaseUrl: 'https://ad.eixe.bremersee.org',
  localUserRoles: ['LOCAL_USER'],
  adminRoles: ['ADMIN', 'DC_CON_ADMIN'],
  tokenConfig: {
    allowedUrls: ['https://ad.eixe.bremersee.org/api'],
    issuer: 'https://openid.dev.bremersee.org/auth/realms/omnia',
    clientId: 'omnia',
    scope: 'openid profile email',
    path: '/dc-con-web'
  },
  avatarDefault: 'ROBOHASH'
};
