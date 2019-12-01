import {Injectable} from '@angular/core';
import {OAuthStorage} from 'angular-oauth2-oidc';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService extends OAuthStorage {

  constructor(private cookieService: CookieService) {
    super();
  }

  getItem(key: string): string | null {
    const data = this.cookieService.get(key);
    console.warn('get ' + key + ' = ' + data);
    return data;
  }

  removeItem(key: string): void {
    this.cookieService.delete(key);
  }

  setItem(key: string, data: string): void {
    console.warn('save ' + key + ' = ' + data);
    // this.cookieService.set(key, data);
    this.cookieService.set(key, data, undefined, undefined, undefined, false, 'Strict');
  }
}
