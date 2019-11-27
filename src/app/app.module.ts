import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthComponent} from './header/auth/auth.component';
import {OpeningComponent} from './opening/opening.component';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
import {UserComponent} from './user/user.component';
import {environment} from '../environments/environment';
import {TokenizerPipe} from './shared/tokenizer.pipe';
import {UserGroupsComponent} from './user/user-groups/user-groups.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserPasswordComponent} from './user/user-password/user-password.component';
import {UserDeleteComponent} from './user/user-delete/user-delete.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {GlobalErrorHandler} from './error/global-error-handler';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GroupComponent } from './group/group.component';
import { AddGroupComponent } from './groups/add-group/add-group.component';
import { GroupEditComponent } from './group/group-edit/group-edit.component';
import { GroupDeleteComponent } from './group/group-delete/group-delete.component';

// We need a factory, since localStorage is not available during AOT build time.
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SnackbarComponent,
    OpeningComponent,
    UsersComponent,
    GroupsComponent,
    UserComponent,
    TokenizerPipe,
    UserGroupsComponent,
    UserEditComponent,
    UserProfileComponent,
    UserPasswordComponent,
    UserDeleteComponent,
    AddUserComponent,
    GroupComponent,
    AddGroupComponent,
    GroupEditComponent,
    GroupDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: environment.tokenConfig.allowedUrls,
        sendAccessToken: true
      }
    })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
//    },
//    {
//      provide: HTTP_INTERCEPTORS,
//      useClass: HttpErrorInterceptor,
//      multi: true
    },
    {
      provide: OAuthStorage,
      useFactory: storageFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(fas, far);
  }
}
