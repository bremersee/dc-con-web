import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/security/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private oauthService: AuthService) { }

  ngOnInit() {
  }

  get localUser(): boolean {
    return this.oauthService.hasRole('LOCAL_USER');
  }

}
