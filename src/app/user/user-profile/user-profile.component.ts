import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domainUser';
import {environment} from '../../../environments/environment';
import {DomainUserService} from '../../shared/service/domain-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input()
  private user: DomainUser;

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
