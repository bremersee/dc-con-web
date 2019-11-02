import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from '../../shared/security/auth.service';
import {DomainUser, DomainUserService} from '../../shared/service/domain-user.service';
import {DomainService} from '../../shared/service/domain.service';
import {Observable} from 'rxjs';
import {PasswordComplexity, PasswordInformation} from '../../shared/model/password-information';
import {ApiException} from '../../error/api-exception';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  passwordInformation: Observable<PasswordInformation>;

  form: FormGroup;

  exceptionHint: string;

  passwordsEqualValidator: ValidatorFn;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private oauthService: AuthService,
    private userService: DomainUserService,
    private domainService: DomainService) {

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
        userName: ['', Validators.required],
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
        this.exceptionHint = ex.hint;
      } else {
        this.router.navigate(['/users']);
      }
    });
  }

}
