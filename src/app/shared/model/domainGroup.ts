/**
 * Domain group.
 */
export interface DomainGroup {

  /**
   * The available members.
   */
  availableMembers?: Array<string>;

  /**
   * The creation date.
   */
  created?: Date;

  /**
   * A description of the domain group.
   */
  description?: string;

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
