import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/security/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private oauthService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.oauthService.login('');
  }

  logout() {
    this.oauthService.logout();
  }

  get userId() {
    return this.oauthService.userId;
  }

  get preferredUserName() {
    return this.oauthService.preferredUserName;
  }
}
