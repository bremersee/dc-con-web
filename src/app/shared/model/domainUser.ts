/**
 * Domain user.
 */
export interface DomainUser {

  /**
   * The available groups.
   */
  availableGroups?: Array<string>;

  /**
   * The creation date.
   */
  created?: Date;

  /**
   * A description of the domain group.
   */
  description?: string;

  /**
   * The display name.
   */
  displayName?: string;

  /**
   * The distinguished name in the active directory.
   */
  distinguishedName?: string;

  /**
   * The email address of the domain user.
   */
  email?: string;

  /**
   * Specifies whether the user is enabled or not.
   */
  enabled?: boolean;

  /**
   * The first name of the domain user.
   */
  firstName?: string;

  /**
   * The groups of the domain user.
   */
  groups?: Array<string>;

  /**
   * The home directory of the domain user.
   */
  homeDirectory?: string;

  /**
   * The last logon time of the domain user.
   */
  lastLogon?: Date;

  /**
   * The last name of the domain user.
   */
  lastName?: string;

  /**
   * The login shell of the domain user.
   */
  loginShell?: string;

  /**
   * The logon count of the domain user.
   */
  logonCount?: number;

  /**
   * The mobile number of the domain user.
   */
  mobile?: string;

  /**
   * The last modification date.
   */
  modified?: Date;

  /**
   * The password of the domain user.
   */
  password?: string;

  /**
   * Date of the last password change.
   */
  passwordLastSet?: Date;

  /**
   * The telephone number of the domain user.
   */
  telephoneNumber?: string;

  /**
   * The unix home directory of the domain user.
   */
  unixHomeDirectory?: string;

  /**
   * The user name of the domain user.
   */
  userName: string;

}
