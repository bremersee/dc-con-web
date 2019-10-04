import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DomainUser} from '../shared/model/domainUser';
import {DomainUserService} from '../shared/service/domain-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private users: Observable<Array<DomainUser>>;

  constructor(private domainUserService: DomainUserService) {
    this.users = domainUserService.getUsers();
  }

  ngOnInit() {
  }

}
