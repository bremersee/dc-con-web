import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PasswordInformation} from '../model/password-information';
import {Password} from '../model/password';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private baseUrl = environment.dcConBaseUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Get password information of the domain controller.
   */
  getPasswordInformation(): Observable<PasswordInformation> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<PasswordInformation>(`${this.baseUrl}/api/domain/password-information`, {
      headers: httpHeaders
    });
  }

  /**
   * Gets random password.
   */
  getRandomPassword(): Observable<Password> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<Password>(`${this.baseUrl}/api/domain/random-password`, {
      headers: httpHeaders
    });
  }

}
