import {Component, Input, OnInit} from '@angular/core';
import {DomainUser} from '../../shared/model/domainUser';
import {DomainUserService, Password} from '../../shared/service/domain-user.service';
import {Router} from '@angular/router';
import {catchError, retry} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {RestApiException} from '../../shared/model/restApiException';
import {DomainService} from '../../shared/service/domain.service';
import {PasswordComplexity, PasswordInformation} from '../../shared/model/passwordInformation';
import {AuthService} from '../../shared/security/auth.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

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

  passwordsEqualValidator: ValidatorFn;

  submitted = false;

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
    this.submitted = true;
    this.userService
    .updateUserPassword(password, this.user.userName)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
    .subscribe(() => {
      // this.updatedUser.emit(user);
      this.router.navigate(['/users/' + this.user.userName]);
    });
  }

  private handleError(error: HttpErrorResponse) {
    // console.warn('Error: ' + JSON.stringify(error));
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      const exception: RestApiException = error.error;
      if (exception.errorCode === 'check_password_restrictions') {
        // TODO
      }
      console.error('An error occurred:', exception.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
