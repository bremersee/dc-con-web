import {Component} from '@angular/core';
import {AuthService} from './shared/security/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dc-con-web';

  constructor(private authService: AuthService) {
    this.authService.runInitialLoginSequence();
  }

}
