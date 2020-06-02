import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domain-user';
import {DomainUserService, Password} from '../../shared/service/domain-user.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DomainService} from '../../shared/service/domain.service';
import {PasswordComplexity, PasswordInformation} from '../../shared/model/password-information';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ApiException} from '../../error/api-exception';
import {SnackbarService} from '../../shared/snackbar/snackbar.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  @Input()
  user: DomainUser;

  @Input()
  successLocation: string;

  passwordInformation: Observable<PasswordInformation>;

  form: FormGroup;

  submitErrorCode: string;

  passwordsEqualValidator: ValidatorFn;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private keycloakService: KeycloakService,
    private snackbar: SnackbarService,
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

  get isAdmin(): boolean { // TODO onInit
    const roles = this.keycloakService.getUserRoles(true);
    if (roles && roles.length > 0) {
      for (const requiredRole of environment.adminRoles) {
        if (roles.indexOf(requiredRole) > -1) {
          return true;
        }
      }
    }
    return false;
  }

  buildForm(pwdInfo: PasswordInformation) {
    if (this.form === undefined) {
      this.form = this.formBuilder.group({
        previousValue: this.isAdmin ? [''] : ['', Validators.required],
        value: ['', Validators.pattern(this.passwordPattern(pwdInfo))],
        repeatedValue: ['', Validators.pattern(this.passwordPattern(pwdInfo))],
        sendEmail: false,
        lang: 'en'
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

  updatePassword(): void {
    this.submitErrorCode = undefined;
    const password: Password = {
      value: this.form.get('value').value,
      previousValue: this.isAdmin ? undefined : this.form.get('previousValue').value
    };
    this.userService
    .updateUserPassword(password, this.user.userName, this.form.get('sendEmail').value, this.form.get('lang').value)
    .subscribe(response => {
      if (response !== null && response instanceof ApiException) {
        this.submitErrorCode = (response as ApiException).hint;
      } else {
        this.router.navigate([this.successLocation])
        .then(() => this.snackbar.show('Password successfully changed.'));
      }
    });
  }

  generatePassword(): void {
    this.domainService.getRandomPassword().subscribe(password => {
      this.form.get('value').setValue(password.value);
      this.form.get('repeatedValue').setValue(password.value);
    });
  }

}
