import {Component, Input, OnInit} from '@angular/core';
import {DomainGroup} from '../../shared/model/domain-group';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DomainGroupService} from '../../shared/service/domain-group.service';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.css']
})
export class GroupDeleteComponent implements OnInit {

  @Input()
  group: DomainGroup;

  form: FormGroup;

  groupNamesEqualValidator: ValidatorFn;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private groupService: DomainGroupService) {
  }

  ngOnInit() {
    this.groupNamesEqualValidator = (fg: FormGroup) => {
      const value = fg.get('groupName').value;
      if (value === this.group.name) {
        return null;
      }
      return {
        groupNamesAreNotEqual: true
      };
    };
    if (this.form === undefined) {
      this.form = this.formBuilder.group({
        groupName: ['', Validators.required]
      }, {validators: this.groupNamesEqualValidator});
    }
  }

  delete(): void {
    this.groupService.deleteGroup(this.form.get('groupName').value)
    .subscribe(response => {
      this.router.navigate(['/groups']);
    });
  }

}
