export const environment = {
  production: true,
  dcConBaseUrl: 'https://dc.eixe.bremersee.org/peregrinus',
  viewRoles: ['LOCAL_USER', 'ADMIN'],
  editRoles: ['ADMIN'],
  tokenConfig: {
    allowedUrls: ['https://dc.eixe.bremersee.org', 'http://dc.eixe.bremersee.org:8090'],
    issuer: 'https://openid.dev.bremersee.org/auth/realms/omnia',
    clientId: 'omnia',
    scope: 'openid profile email'
  }
};
