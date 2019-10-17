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

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  @Input()
  user: DomainUser;

  passwordInformation: Observable<PasswordInformation>;

  private password: Password = {
    value: ''
  };

  constructor(private router: Router, private userService: DomainUserService, private domainService: DomainService) {
  }

  ngOnInit() {
    this.passwordInformation = this.domainService.getPasswordInformation();
  }

  avatarUrl(user: DomainUser, size: number): string {
    return DomainUserService.avatarUrl(user, size);
  }

  isComplexPasswordRequired(pwdInfo: PasswordInformation): boolean {
    return PasswordComplexity.OFF !== pwdInfo.passwordComplexity;
  }

  pattern(pwdInfo: PasswordInformation): string {
    if (PasswordComplexity.OFF === pwdInfo.passwordComplexity) {
      return '^(?=.{' + pwdInfo.minimumPasswordLength + ',75}$).*';
    }
    return '(?=^.{' + pwdInfo.minimumPasswordLength + ',75}$)((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])'
      + '|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*';
  }

  updatePassword(): void {
    this.userService
    .updateUserPassword(this.password, this.user.userName)
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
