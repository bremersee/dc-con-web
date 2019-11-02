import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domain-user';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {DomainUserGroup} from '../../shared/model/domain-user-group';
import {DomainGroupService} from '../../shared/service/domain-group.service';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent implements OnInit, OnDestroy {

  @Input()
  user: DomainUser;

  memberships: Array<DomainUserGroup> = new Array<DomainUserGroup>();

  membershipSubject: Subject<DomainUserGroup> = new Subject<DomainUserGroup>();

  membershipSubscription: Subscription;

  constructor(private userService: DomainUserService, private groupService: DomainGroupService) {
  }

  ngOnInit(): void {
    this.membershipSubscription = this.membershipSubject.asObservable().subscribe(membership => this.doToggleMembership(membership));
    this.groupService.getGroups().subscribe(groups => {
      for (const domainGroup of groups) {
        this.memberships.push({
          group: domainGroup,
          isMember: this.user.groups.indexOf(domainGroup.name, 0) > -1
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.membershipSubscription.unsubscribe();
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  toggleMembership(membership: DomainUserGroup): void {
    this.membershipSubject.next(membership);
  }

  doToggleMembership(membership: DomainUserGroup): void {
    if (membership.isMember) {
      membership.isMember = false;
      const index = this.user.groups.indexOf(membership.group.name, 0);
      if (index > -1) {
        this.user.groups.splice(index, 1);
        this.userService.updateUser(this.user, this.user.userName, true)
        .subscribe(() => {
        });
      }
    } else {
      membership.isMember = true;
      this.user.groups.push(membership.group.name);
      this.userService.updateUser(this.user, this.user.userName, true)
      .subscribe(() => {
      });
    }
  }

}
