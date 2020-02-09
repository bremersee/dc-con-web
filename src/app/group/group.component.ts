import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DomainGroup} from '../shared/model/domain-group';
import {ActivatedRoute} from '@angular/router';
import {DomainGroupService} from '../shared/service/domain-group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  private groupName: string;

  group: Observable<DomainGroup>;

  view: string;

  constructor(private route: ActivatedRoute, private groupService: DomainGroupService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.groupName = paramMap.get('groupName') || '';
      console.warn('Group name = ' + this.groupName);
      this.group = this.groupService.getGroupByName(this.groupName);
    });
    this.route.queryParamMap.subscribe(queryMap => {
      this.view = queryMap.get('view') || 'edit';
    });
  }

  onUpdatedGroup(updatedGroup: DomainGroup) {
    this.group = of(updatedGroup);
  }

  get isEditActive() {
    return this.view === 'edit';
  }

  get isDeleteActive() {
    return this.view === 'delete';
  }

}
