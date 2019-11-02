import {DomainUser} from './domain-user';

export {DomainUser} from './domain-user';

/**
 * The type domain group member.
 */
export interface DomainGroupMember {

  user: DomainUser;

  isMember: boolean;

}
