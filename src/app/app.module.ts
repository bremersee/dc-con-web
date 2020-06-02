import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {CookieService} from 'ngx-cookie-service';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {GlobalErrorHandler} from './error/global-error-handler';
import {SnackbarComponent} from './shared/snackbar/snackbar.component';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AuthComponent} from './header/auth/auth.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {UsersComponent} from './users/users.component';
import {GroupsComponent} from './groups/groups.component';
import {UserComponent} from './user/user.component';
import {TokenizerPipe} from './shared/tokenizer.pipe';
import {UserGroupsComponent} from './user/user-groups/user-groups.component';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {UserPasswordComponent} from './user/user-password/user-password.component';
import {UserDeleteComponent} from './user/user-delete/user-delete.component';
import {AddUserComponent} from './users/add-user/add-user.component';
import {GroupComponent} from './group/group.component';
import {AddGroupComponent} from './groups/add-group/add-group.component';
import {GroupEditComponent} from './group/group-edit/group-edit.component';
import {GroupDeleteComponent} from './group/group-delete/group-delete.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {DnsNodesComponent} from './name-server/dns-nodes/dns-nodes.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    SnackbarComponent,
    WelcomeComponent,
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
    GroupDeleteComponent,
    ChangePasswordComponent,
    DnsNodesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    KeycloakAngularModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    CookieService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {

  constructor() {
    library.add(fas, far);
  }

  async ngDoBootstrap(app) {
    try {
      await keycloakService.init({
        config: window.location.origin + environment.keycloakConfigLocation,
        initOptions: {
          flow: 'standard',
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + environment.silentCheckSsoLocation,
          pkceMethod: 'S256'
        }
      });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
