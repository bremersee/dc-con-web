import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domainUser';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  @Input()
  user: DomainUser;

  form: FormGroup;

  userNamesEqualValidator: ValidatorFn;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: DomainUserService) { }

  ngOnInit() {
    this.userNamesEqualValidator = (fg: FormGroup) => {
      const value = fg.get('userName').value;
      if (value === this.user.userName) {
        return null;
      }
      return {
        userNamesAreNotEqual: true
      };
    };
    if (this.form === undefined) {
      this.form = this.formBuilder.group({
        userName: ['', Validators.required]
      }, {validators: this.userNamesEqualValidator});
    }
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  delete(): void {
    this.userService.deleteUser(this.form.get('userName').value)
    .subscribe(response => {
      this.router.navigate(['/users']);
    });
  }

}
