import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DomainUser} from '../shared/model/domain-user';
import {DomainUserService} from '../shared/service/domain-user.service';
import {AuthService} from '../shared/security/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: Observable<DomainUser>;

  constructor(private authService: AuthService, private domainUserService: DomainUserService) { }

  ngOnInit() {
    this.user = this.domainUserService.getUser(this.authService.preferredUserName);
  }

}
