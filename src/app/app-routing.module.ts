import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ValidUserGuardService} from './shared/security/valid-user-guard.service';
import {OpeningComponent} from './opening/opening.component';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent, canActivate: [ValidUserGuardService]},
  {path: 'groups', component: GroupsComponent, canActivate: [ValidUserGuardService]},
//  {path: 'basecamp-redirect', component: BasecampRedirectComponent},
//  {path: 'opening', component: OpeningComponent},
  {path: '', pathMatch: 'full', component: OpeningComponent},
  {path: '**', redirectTo: 'opening'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
