import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DomainUser} from '../shared/model/domain-user';
import {DomainUserService} from '../shared/service/domain-user.service';
import {ActivatedRoute} from '@angular/router';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private userEditIcon = faUserEdit;

  private sortOrder: string;

  private query: string;

  private users: Observable<Array<DomainUser>>;

  constructor(private route: ActivatedRoute, private domainUserService: DomainUserService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(paramMap => {
      this.sortOrder = paramMap.get('sort') || 'userName';
      this.query = paramMap.get('q') || '';
      this.users = this.domainUserService.getUsers(this.sortOrder, this.query);
    });
  }

  ngOnDestroy(): void {
    // nothing to do
  }

  avatarUrl(user: DomainUser, size: number): string {
    return environment.dcConBaseUrl + '/api/users/' + user.userName + '/avatar?d=' + environment.avatarDefault + '&s=' + size;
  }

  enabledIcon(user: DomainUser) {
    if (user.enabled) {
      return faCheckCircle;
    } else {
      return faTimesCircle;
    }
  }

}
