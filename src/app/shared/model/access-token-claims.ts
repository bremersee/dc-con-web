import {RealmAccess} from './realm-access';

export {RealmAccess} from './realm-access';

/**
 * Claims of the access token.
 */
export interface AccessTokenClaims {

  jti?: string;

  exp?: number;

  nbf?: number;

  iat?: number;

  iss?: string;

  aud?: string;

  sub?: string;

  typ?: string;

  azp?: string;

  nonce?: string;

  auth_time?: number;

  session_state?: string;

  acr?: string;

  realm_access?: RealmAccess;

  esource_access?: any;

  scope?: string;

  email_verified?: boolean;

  preferred_username?: string;

  given_name?: string;

  family_name?: string;

  email?: string;

}
