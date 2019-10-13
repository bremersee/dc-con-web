import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {OAuthModule} from 'angular-oauth2-oidc';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    OpeningComponent,
    UsersComponent,
    GroupsComponent,
    UserComponent,
    TokenizerPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    library.add(fas, far);
  }
}
