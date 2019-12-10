import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {Observable} from 'rxjs';
import {DnsZone} from '../shared/model/dns-zone';
import {NameServerService} from '../shared/service/name-server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dnsZones: Observable<Array<DnsZone>>;

  constructor(private oauthService: AuthService, private nameServer: NameServerService) {
  }

  ngOnInit() {
    this.dnsZones = this.nameServer.getDnsZones();
  }

  get isAdmin(): boolean {
    return this.oauthService.isAdmin;
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
