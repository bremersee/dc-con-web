import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private oauthService: AuthService) {
  }

  ngOnInit() {
  }

  get canView(): boolean {
    return this.oauthService.hasAnyRole(environment.viewRoles);
  }

  get usersParams(): any {
    return {
      sort: 'userName'
    };
  }

  get groupsParams(): any {
    return {
      sort: 'name'
    };
  }

}
