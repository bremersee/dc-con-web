import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DomainGroup} from '../../shared/model/domain-group';
import {Router} from '@angular/router';
import {DomainGroupService} from '../../shared/service/domain-group.service';
import {Subject, Subscription} from 'rxjs';
import {DomainGroupMember} from '../../shared/model/domain-group-member';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {AuthService} from '../../shared/security/auth.service';
import {environment} from '../../../environments/environment';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit, OnDestroy {

  @Input()
  group: DomainGroup;

  @Output()
  updatedGroup = new EventEmitter<DomainGroup>();

  members: Array<DomainGroupMember> = new Array<DomainGroupMember>();

  membersSubject: Subject<DomainGroupMember> = new Subject<DomainGroupMember>();

  membersSubscription: Subscription;

  descriptionMode = 'hide';

  editDescriptionIcon = faEdit;

  constructor(
    private router: Router,
    private authService: AuthService,
    private groupService: DomainGroupService,
    private userService: DomainUserService) {
  }

  ngOnInit() {
    this.initDescriptionMode(this.group);
    this.membersSubscription = this.membersSubject.asObservable().subscribe(member => this.doToggleMember(member));
    this.userService.getUsers().subscribe(users => {
      for (const domainUser of users) {
        this.members.push({
          user: domainUser,
          isMember: this.group.members.indexOf(domainUser.userName, 0) > -1
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.membersSubscription.unsubscribe();
  }

  get canEdit(): boolean {
    return this.authService.hasAnyRole(environment.editRoles);
  }

  get displayDescription(): boolean {
    return this.descriptionMode === 'display' || this.descriptionMode === 'edit' || this.descriptionMode === 'add';
  }

  toggleMember(member: DomainGroupMember): void {
    this.membersSubject.next(member);
  }

  doToggleMember(member: DomainGroupMember): void {
    if (member.isMember) {
      member.isMember = false;
      const index = this.group.members.indexOf(member.user.userName, 0);
      if (index > -1) {
        this.group.members.splice(index, 1);
        this.save();
      }
    } else {
      member.isMember = true;
      this.group.members.push(member.user.userName);
      this.save();
    }
  }

  displayEditDescription(): void {
    this.descriptionMode = 'edit';
  }

  cancelEditDescription(): void {
    this.initDescriptionMode(this.group);
  }

  saveDescription(value: string): void {
    this.group.description = value;
    this.groupService
    .updateGroup(this.group, this.group.name)
    .subscribe(newGroup => {
      this.initDescriptionMode(newGroup);
      this.updatedGroup.emit(newGroup);
    });
  }

  save(): void {
    this.groupService
    .updateGroup(this.group, this.group.name)
    .subscribe(newGroup => {
      this.updatedGroup.emit(newGroup);
    });
  }

  private initDescriptionMode(group: DomainGroup): void {
    if (group.description === undefined || group.description === null) {
      group.description = '';
    }
    if (this.canEdit) {
      this.descriptionMode = group.description.length > 0 ? 'display' : 'add';
    } else {
      this.descriptionMode = group.description.length > 0 ? 'display' : 'hide';
    }
  }

}
