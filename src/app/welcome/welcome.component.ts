import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DomainUser} from '../shared/model/domain-user';
import {DomainUserService} from '../shared/service/domain-user.service';
import {AuthService} from '../shared/security/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  user: Observable<DomainUser>;

  constructor(private authService: AuthService, private domainUserService: DomainUserService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() && this.domainUserService.userExists(this.authService.preferredUserName)) {
      this.user = this.domainUserService.getUser(this.authService.preferredUserName);
    }
  }

}
