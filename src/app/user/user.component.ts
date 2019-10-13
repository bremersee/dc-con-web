import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomainUser, DomainUserService} from '../shared/service/domain-user.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private view: string;

  private userName: string;

  private user: Observable<DomainUser>;

  constructor(private route: ActivatedRoute, private domainUserService: DomainUserService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userName = paramMap.get('userName') || '';
      this.user = this.domainUserService.getUser(this.userName);
    });
    this.route.queryParamMap.subscribe(queryMap => {
      this.view = queryMap.get('view') || 'profile';
    });
  }

  avatarUrl(user: DomainUser, size: number): string {
    return environment.dcConBaseUrl + '/api/users/' + user.userName + '/avatar?d=' + environment.avatarDefault + '&s=' + size;
  }

}
