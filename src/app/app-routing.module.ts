import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ValidUserGuardService} from './shared/security/valid-user-guard.service';
import {OpeningComponent} from './opening/opening.component';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
import {UserComponent} from './user/user.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {GroupComponent} from './group/group.component';
import {AddGroupComponent} from './groups/add-group/add-group.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent, canActivate: [ValidUserGuardService]},
  {path: 'add-user', component: AddUserComponent, canActivate: [ValidUserGuardService]},
  {path: 'users/:userName', component: UserComponent, canActivate: [ValidUserGuardService]},
  {path: 'profile/:userName', component: UserComponent, canActivate: [ValidUserGuardService]},
  {path: 'groups', component: GroupsComponent, canActivate: [ValidUserGuardService]},
  {path: 'add-group', component: AddGroupComponent, canActivate: [ValidUserGuardService]},
  {path: 'groups/:groupName', component: GroupComponent, canActivate: [ValidUserGuardService]},
  {path: '', pathMatch: 'full', component: WelcomeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
