/**
 * DNS Zone
 */
export interface DnsZone {

  /**
   * The creation date.
   */
  created?: Date;

  /**
   * Specifies whether this zone is the default zone or not.
   */
  defaultZone?: boolean;

  /**
   * The distinguished name in the active directory.
   */
  distinguishedName?: string;

  /**
   * The last modification date.
   */
  modified?: Date;

  /**
   * The zone name.
   */
  name: string;
}
