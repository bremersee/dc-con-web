import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OpeningComponent} from './opening/opening.component';

const routes: Routes = [
//  {path: 'basecamp', component: BasecampComponent, canActivate: [BasecampGuardService]},
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
