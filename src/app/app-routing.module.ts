import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
//  {path: 'basecamp', component: BasecampComponent, canActivate: [BasecampGuardService]},
//  {path: 'basecamp-redirect', component: BasecampRedirectComponent},
//  {path: 'opening', component: OpeningComponent},
//  {path: '', redirectTo: 'opening', pathMatch: 'full'},
//  {path: '**', redirectTo: 'opening'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
