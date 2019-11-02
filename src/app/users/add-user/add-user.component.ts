import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {DomainUser, DomainUserService} from '../../shared/service/domain-user.service';
import {DomainService} from '../../shared/service/domain.service';
import {Observable, of} from 'rxjs';
import {PasswordComplexity, PasswordInformation} from '../../shared/model/password-information';
import {ApiException} from '../../error/api-exception';
import {NotificationService} from '../../shared/service/notification.service';
import {DomainGroupService} from '../../shared/service/domain-group.service';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {existingUserNameValidator} from './username-exists-validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  passwordInformation: Observable<PasswordInformation>;

  form: FormGroup;

  submitErrorCode: string;

  userNameExistsValidator: AsyncValidatorFn;

  passwordsEqualValidator: ValidatorFn;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: DomainUserService,
    private groupService: DomainGroupService,
    private domainService: DomainService) {

    this.userNameExistsValidator = (control: AbstractControl) => {
      const value = control.value;
      if (value === undefined || value === null || value === '') {
        if (this.userNameExists()) {
          this.submitErrorCode = undefined;
        }
        return of(null);
      }
      return this.userService.userExists(value).pipe(map(response => {
        return response ? {exists: true} : null;
      }));
    };

    this.passwordsEqualValidator = (fg: FormGroup) => {
      const value = fg.get('password').value;
      const repeatedValue = fg.get('repeatedPassword').value;
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

  buildForm(pwdInfo: PasswordInformation) {
    if (this.form === undefined) {
      this.form = this.formBuilder.group({
        userName: ['', [Validators.required], [this.userNameExistsValidator]],
        description: [''],
        email: [''],
        enabled: [true],
        firstName: [''],
        lastName: [''],
        mobile: [''],
        telephoneNumber: [''],
        password: ['', Validators.pattern(this.passwordPattern(pwdInfo))],
        repeatedPassword: [''],
        sendEmail: [false]
      }, {
        validators: [this.passwordsEqualValidator]
      });

      /*
      this.form.valueChanges
      .pipe(debounceTime(500),
        switchMap((value: string) => {
          return this.userService.userExists(value);
        })).subscribe((isNameExists: boolean) => {
        this.submitErrorCode = isNameExists ? ApiException.ALREADY_EXISTS : undefined;
      });

       */
    }
    return this.form;
  }

  passwordPattern(pwdInfo: PasswordInformation): string {
    if (PasswordComplexity.OFF === pwdInfo.passwordComplexity) {
      return '^(?=.{' + pwdInfo.minimumPasswordLength + ',75}$).*';
    }
    return '(?=^.{' + pwdInfo.minimumPasswordLength + ',75}$)((?=.*\\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])'
      + '|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*';
  }

  isComplexPasswordRequired(pwdInfo: PasswordInformation): boolean {
    return PasswordComplexity.OFF !== pwdInfo.passwordComplexity;
  }

  userNameExists() {
    return this.submitErrorCode === ApiException.ALREADY_EXISTS;
  }

  checkPasswordComplexity(): boolean {
    return this.submitErrorCode === ApiException.CHECK_PASSWORD_RESTRICTIONS;
  }

  addUser(): void {
    const domainUser: DomainUser = {
      _type: 'DomainUser',
      userName: this.form.get('userName').value,
      description: this.form.get('description').value,
      email: this.form.get('email').value,
      enabled: this.form.get('enabled').value,
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      mobile: this.form.get('mobile').value,
      telephoneNumber: this.form.get('telephoneNumber').value,
      password: this.form.get('password').value
    };
    this.userService.addUser(domainUser, this.form.get('sendEmail').value)
    .subscribe(response => {
      if (response instanceof ApiException) {
        const ex = response as ApiException;
        this.submitErrorCode = ex.hint;
      } else {
        this.router.navigate(['/users'])
        .then(() => this.notificationService.sendSuccessMessage('User successfully added.'));
      }
    });
  }

}
