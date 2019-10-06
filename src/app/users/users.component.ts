import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DomainUser} from '../shared/model/domainUser';
import {DomainUserService} from '../shared/service/domain-user.service';
import {ActivatedRoute} from '@angular/router';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  // private paramsSubscription;

  private userEditIcon = faUserEdit;

  private sortOrder: string;

  private query: string;

  private users: Observable<Array<DomainUser>>;

  constructor(private route: ActivatedRoute, private domainUserService: DomainUserService) {
    /*
    let sort = this.route.snapshot.queryParamMap.get('sort');
    if (sort === null || sort === undefined) {
      sort = '';
    }
    this.users = domainUserService.getUsers(sort);
    */
  }

  ngOnInit() {
    this.route
    .queryParamMap
    .subscribe(paramMap => {
      this.sortOrder = paramMap.get('sort') || '';
      this.query = paramMap.get('q') || '';
      this.users = this.domainUserService.getUsers(this.sortOrder, this.query);
    });
  }

  ngOnDestroy(): void {
    // nothing to do
  }

  enabledIcon(user: DomainUser) {
    if (user.enabled) {
      return faCheckCircle;
    } else {
      return faTimesCircle;
    }
  }

}
