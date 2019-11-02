import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domain-user';
import {DomainUserService, Password} from '../../shared/service/domain-user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DomainService} from '../../shared/service/domain.service';
import {PasswordComplexity, PasswordInformation} from '../../shared/model/password-information';
import {AuthService} from '../../shared/security/auth.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {NotificationService} from '../../shared/service/notification.service';
import {ApiException} from '../../error/api-exception';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  @Input()
  user: DomainUser;

  passwordInformation: Observable<PasswordInformation>;

  form: FormGroup;

  submitErrorCode: string;

  passwordsEqualValidator: ValidatorFn;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private oauthService: AuthService,
    private notificationService: NotificationService,
    private userService: DomainUserService,
    private domainService: DomainService) {

    this.passwordsEqualValidator = (fg: FormGroup) => {
      const value = fg.get('value').value;
      const repeatedValue = fg.get('repeatedValue').value;
      if (value === repeatedValue) {
        return null;
      }
      return {
        passwordsAreNotEqual: true
      };
    };
  }

  ngOnInit() {
    this.passwordInformation = this.domainService.getPasswordInformation();
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  get isAdmin(): boolean {
    return this.oauthService.hasAnyRole(environment.editRoles);
  }

  buildForm(pwdInfo: PasswordInformation) {
    if (this.form === undefined) {
      this.form = this.formBuilder.group({
        previousValue: this.isAdmin ? [''] : ['', Validators.required],
        value: ['', Validators.pattern(this.passwordPattern(pwdInfo))],
        repeatedValue: ['', Validators.pattern(this.passwordPattern(pwdInfo))]
      }, {validators: this.passwordsEqualValidator});
    }
    return this.form;
  }

  isComplexPasswordRequired(pwdInfo: PasswordInformation): boolean {
    return PasswordComplexity.OFF !== pwdInfo.passwordComplexity;
  }

  passwordPattern(pwdInfo: PasswordInformation): string {
    if (PasswordComplexity.OFF === pwdInfo.passwordComplexity) {
      return '^(?=.{' + pwdInfo.minimumPasswordLength + ',75}$).*';
    }
    return '(?=^.{' + pwdInfo.minimumPasswordLength + ',75}$)((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])'
      + '|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*';
  }

  passwordDoesNotMatch(): boolean {
    return this.submitErrorCode === ApiException.PASSWORD_NOT_MATCH;
  }

  checkPasswordComplexity(): boolean {
    return this.submitErrorCode === ApiException.CHECK_PASSWORD_RESTRICTIONS;
  }

  updatePassword(): void {
    const password: Password = {
      value: this.form.get('value').value,
      previousValue: this.isAdmin ? undefined : this.form.get('previousValue').value
    };
    this.userService
    .updateUserPassword(password, this.user.userName)
    .subscribe(response => {
      if (response !== null && response instanceof ApiException) {
        this.submitErrorCode = (response as ApiException).hint;
      } else {
        this.router.navigate(['/users/' + this.user.userName])
        .then(() => this.notificationService.sendSuccessMessage('Password successfully changed.'));
      }
    });
  }

}
