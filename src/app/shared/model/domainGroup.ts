/**
 * Domain group.
 */
export interface DomainGroup {

  /**
   * The creation date.
   */
  created?: Date;

  /**
   * The distinguished name in the active directory.
   */
  distinguishedName?: string;

  /**
   * The members of the domain group.
   */
  members?: Array<string>;

  /**
   * The last modification date.
   */
  modified?: Date;

  /**
   * The name of the domain group.
   */
  name: string;
}
