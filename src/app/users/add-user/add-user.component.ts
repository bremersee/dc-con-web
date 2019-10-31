import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/security/auth.service';
import {DomainUser, DomainUserService} from '../../shared/service/domain-user.service';
import {DomainService} from '../../shared/service/domain.service';
import {Observable} from 'rxjs';
import {PasswordInformation} from '../../shared/model/passwordInformation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  passwordInformation: Observable<PasswordInformation>;

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private oauthService: AuthService,
    private userService: DomainUserService,
    private domainService: DomainService) {
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
        password: [''],
        repeatedPassword: [''],
        sendEmail: [false]
      });
    }
    return this.form;
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
      this.router.navigate(['/users']);
    });
  }

}
