import {DomainUser} from './domainUser';

export {DomainUser} from './domainUser';

/**
 * The type domain group member.
 */
export interface DomainGroupMember {

  user: DomainUser;

  isMember: boolean;

}
