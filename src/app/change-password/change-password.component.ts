import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DomainUser} from '../shared/model/domain-user';
import {DomainUserService} from '../shared/service/domain-user.service';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: Observable<DomainUser>;

  constructor(private keycloakService: KeycloakService, private domainUserService: DomainUserService) { }

  ngOnInit() {
    this.user = this.domainUserService.getUser(this.keycloakService.getUsername());
  }

}
