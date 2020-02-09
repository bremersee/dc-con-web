import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SnackbarService} from '../../shared/snackbar/snackbar.service';
import {DomainGroup, DomainGroupService} from '../../shared/service/domain-group.service';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  form: FormGroup;

  groupNameExistsValidator: AsyncValidatorFn;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private snackbar: SnackbarService,
              private groupService: DomainGroupService) {

    this.groupNameExistsValidator = (control: AbstractControl) => {
      const value = control.value;
      if (value === undefined || value === null || value === '') {
        return of(null);
      }
      return this.groupService.isGroupNameInUse(value).pipe(map(response => {
        return response ? {exists: true} : null;
      }));
    };

    this.form = this.formBuilder.group({
      name: ['', [Validators.required], [this.groupNameExistsValidator]],
      description: ['']
    });
  }

  ngOnInit() {
  }

  addGroup(): void {
    const group: DomainGroup = {
      _type: 'DomainGroup',
      name: this.form.get('name').value,
      description: this.form.get('description').value
    };
    this.groupService.addGroup(group)
    .subscribe(response => {
      this.router.navigate(['/groups/' + group.name])
      .then(() => this.snackbar.show('Group successfully added.'));
    });
  }

}
