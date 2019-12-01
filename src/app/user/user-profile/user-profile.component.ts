import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domain-user';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input()
  user: DomainUser;

  userEditIcon = faUserEdit;

  constructor() {
  }

  ngOnInit() {
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  get usersParams(): any {
    return {
      sort: 'userName'
    };
  }

}
