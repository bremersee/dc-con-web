import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DnsZone} from '../shared/model/dns-zone';
import {NameServerService} from '../shared/service/name-server.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;

  dnsZones: Observable<Array<DnsZone>>;

  constructor(private keycloakService: KeycloakService, private nameServer: NameServerService) {
  }

  ngOnInit() {
    this.isAdmin = false;
    const roles = this.keycloakService.getUserRoles(true);
    if (roles && roles.length > 0) {
      for (const requiredRole of environment.adminRoles) {
        if (roles.indexOf(requiredRole) > -1) {
          this.isAdmin = true;
          break;
        }
      }
    }
    if (this.isAdmin) {
      this.dnsZones = this.nameServer.getDnsZones();
    }
  }

  /*
  get isAdmin(): boolean {
    return this.oauthService.isAdmin;
  }
  */

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
