import {DomainGroup} from './domain-group';

export {DomainGroup} from './domain-group';

/**
 * The type domain user group.
 */
export interface DomainUserGroup {

  group: DomainGroup;

  isMember: boolean;

}
