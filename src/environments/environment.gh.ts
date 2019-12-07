export const environment = {
  production: false,
  env: 'gh',
  retry: 2,
  dcConBaseUrl: 'https://api.dev.bremersee.org/dc-con-app',
  localUserRoles: ['LOCAL_USER', 'ADMIN'],
  adminRoles: ['ADMIN'],
  tokenConfig: {
    allowedUrls: ['https://api.dev.bremersee.org/dc-con-app/api'],
    issuer: 'https://openid.dev.bremersee.org/auth/realms/demo',
    clientId: 'demo',
    scope: 'openid profile email',
    path: '/dc-con-web'
  },
  avatarDefault: 'ROBOHASH'
};
