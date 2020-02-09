import {Component, OnInit} from '@angular/core';
import {DomainGroup, DomainGroupService} from '../shared/service/domain-group.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groupEditIcon = faEdit;

  private sortOrder: string;

  private query: string;

  groups: Observable<Array<DomainGroup>>;

  constructor(
    private route: ActivatedRoute,
    private groupService: DomainGroupService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(paramMap => {
      this.sortOrder = paramMap.get('sort') || 'name';
      this.query = paramMap.get('q') || '';
      this.groups = this.groupService.getGroups(this.sortOrder, this.query);
    });
  }

}
