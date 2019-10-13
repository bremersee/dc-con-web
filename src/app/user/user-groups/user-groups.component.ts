import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domainUser';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {Membership} from '../../shared/model/membership';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit {

  @Input()
  private user: DomainUser;

  private groups: Array<Membership> = new Array<Membership>();

  constructor() {
  }

  ngOnInit() {
    for (const group of this.user.groups) {
      const membership: Membership = {
        name: group,
        isMember: true
      };
      this.groups.push(membership);
    }
    for (const group of this.user.availableGroups) {
      const membership: Membership = {
        name: group,
        isMember: false
      };
      this.groups.push(membership);
    }
    this.groups.sort((g1, g2) => {
      const n1 = g1.name.toUpperCase();
      const n2 = g2.name.toUpperCase();
      if (n1 < n2) {
        return -1;
      } else if (n1 > n2) {
        return 1;
      }
      return 0;
    });
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  toggleMembership(membership: Membership): void {
    if (membership.isMember) {
      membership.isMember = false;
      this.user.availableGroups.push(membership.name);
      const index = this.user.groups.indexOf(membership.name);
      if (index > -1) {
        this.user.groups.splice(index, 1);
      }
    } else {
      membership.isMember = true;
      this.user.groups.push(membership.name);
      const index = this.user.availableGroups.indexOf(membership.name);
      if (index > -1) {
        this.user.availableGroups.splice(index, 1);
      }
    }
  }

}
