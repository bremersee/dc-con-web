import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
import {UserComponent} from './user/user.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {GroupComponent} from './group/group.component';
import {AddGroupComponent} from './groups/add-group/add-group.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {DnsNodesComponent} from './name-server/dns-nodes/dns-nodes.component';
import {environment} from '../environments/environment';
import {AppAuthGuard} from './app.authguard';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'users/:userName',
    component: UserComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'add-group',
    component: AddGroupComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'groups/:groupName',
    component: GroupComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'ns/nodes/:zone',
    component: DnsNodesComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.adminRoles
    }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AppAuthGuard],
    data: {
      roles: environment.localUserRoles
    }
  },
  {
    path: '',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
