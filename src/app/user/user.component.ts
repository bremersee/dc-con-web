import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomainUser, DomainUserService} from '../shared/service/domain-user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private userName: string;

  private user: Observable<DomainUser>;

  constructor(private route: ActivatedRoute, private domainUserService: DomainUserService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userName = paramMap.get('userName') || '';
      this.user = this.domainUserService.getUser(this.userName);
    });
  }

}
