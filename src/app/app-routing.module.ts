import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
import {UserComponent} from './user/user.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {GroupComponent} from './group/group.component';
import {AddGroupComponent} from './groups/add-group/add-group.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AdminUserGuardService} from './shared/security/admin-user-guard.service';
import {LocalUserGuardService} from './shared/security/local-user-guard.service';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {DnsNodesComponent} from './name-server/dns-nodes/dns-nodes.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent, canActivate: [AdminUserGuardService]},
  {path: 'add-user', component: AddUserComponent, canActivate: [AdminUserGuardService]},
  {path: 'users/:userName', component: UserComponent, canActivate: [AdminUserGuardService]},
  {path: 'groups', component: GroupsComponent, canActivate: [AdminUserGuardService]},
  {path: 'add-group', component: AddGroupComponent, canActivate: [AdminUserGuardService]},
  {path: 'groups/:groupName', component: GroupComponent, canActivate: [AdminUserGuardService]},
  {path: 'ns/nodes/:zone', component: DnsNodesComponent, canActivate: [AdminUserGuardService]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [LocalUserGuardService]},
  {path: '', pathMatch: 'full', component: WelcomeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
