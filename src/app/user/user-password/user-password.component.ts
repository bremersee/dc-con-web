import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domainUser';
import {DomainUserService, Password} from '../../shared/service/domain-user.service';
import {Router} from '@angular/router';
import {catchError, retry} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {RestApiException} from '../../shared/model/restApiException';
import {DomainService} from '../../shared/service/domain.service';
import {PasswordComplexity, PasswordInformation} from '../../shared/model/passwordInformation';
import {AuthService} from '../../shared/security/auth.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {SubmitValidation} from './submitValidation';

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

  submitValidation: SubmitValidation;

  passwordsEqualValidator: ValidatorFn;

  private static handleError(error: HttpErrorResponse) {
    const exception: RestApiException = error.error;
    if (exception.errorCode === 'password_does_not_match') {
      console.warn('Password does not match.');
      return of<SubmitValidation>({
        loginFailed: true,
        passwordComplexityFailed: false,
        internalServerError: false
      });
    } else if (exception.errorCode === 'check_password_restrictions') {
      console.warn('New password does not satisfy complexity restrictions.');
      return of<SubmitValidation>({
        loginFailed: false,
        passwordComplexityFailed: true,
        internalServerError: false
      });
    } else {
      console.warn('Something bad happened.');
      return of<SubmitValidation>({
        loginFailed: false,
        passwordComplexityFailed: false,
        internalServerError: true
      });
    }
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private oauthService: AuthService,
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
    this.submitValidation = {
      loginFailed: false,
      passwordComplexityFailed: false,
      internalServerError: false
    };
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

  updatePassword(): void {
    const password: Password = {
      value: this.form.get('value').value,
      previousValue: this.isAdmin ? undefined : this.form.get('previousValue').value
    };
    this.userService
    .updateUserPassword(password, this.user.userName)
    .pipe(
      retry(3),
      catchError(UserPasswordComponent.handleError)
    )
    .subscribe(response => {
      if (response === null) {
        this.router.navigate(['/users/' + this.user.userName]);
      } else {
        const tmp = response as SubmitValidation;
        this.submitValidation.internalServerError = tmp.internalServerError;
        this.submitValidation.passwordComplexityFailed = tmp.passwordComplexityFailed;
        this.submitValidation.loginFailed = tmp.loginFailed;
        if (!tmp.passwordComplexityFailed) {
          this.form.reset();
        }
      }
    });
  }

}
