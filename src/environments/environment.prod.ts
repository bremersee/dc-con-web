export const environment = {
  production: true,
  dcConBaseUrl: '${DC_CON_BASE_URL}',
  viewRoles: ['LOCAL_USER', 'ADMIN'],
  editRoles: ['ADMIN'],
  tokenConfig: {
    allowedUrls: ['${DC_CON_BASE_URL}/api'],
    issuer: '${TOKEN_ISSUER}',
    clientId: '${TOKEN_CLIENT_ID}',
    scope: '${TOKEN_SCOPE}'
  }
};
