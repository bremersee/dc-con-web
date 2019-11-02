import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomainUser} from '../../shared/model/domain-user';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: DomainUser;

  @Output()
  updatedUser = new EventEmitter<DomainUser>();

  // editUser: DomainUser;

  constructor(private router: Router, private userService: DomainUserService) {
  }

  ngOnInit() {
    // this.editUser = {...this.user}; // Spread operator, requires ECMAScript6
  }

  get displayName() {
    const fn = this.user.firstName === undefined || this.user.firstName === null ? '' : this.user.firstName;
    const ln = this.user.lastName === undefined || this.user.lastName === null ? '' : this.user.lastName;
    if (fn === '' && ln === '') {
      return this.user.userName;
    }
    return fn + (fn.length > 0 && ln.length > 0 ? ' ' : '') + ln;
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  save(): void {
    this.userService
    .updateUser(this.user, this.user.userName, false)
    .subscribe(user => {
      this.updatedUser.emit(user);
      this.router.navigate(['/users/' + this.user.userName]);
    });
  }

}
