import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CustomHttpUrlEncodingCodec} from '../encoder';
import {DomainUser} from '../model/domain-user';
import {Password} from '../model/password';
import {ApiException} from '../../error/api-exception';

export {DomainUser} from '../model/domain-user';
export {Password} from '../model/password';

@Injectable({
  providedIn: 'root'
})
export class DomainUserService {

  private baseUrl = environment.dcConBaseUrl;

  constructor(private http: HttpClient) {
  }

  static avatarUrl(user: DomainUser, size: number): string {
    return environment.dcConBaseUrl + '/api/users/' + user.userName + '/avatar?d=' + environment.avatarDefault + '&s=' + size;
  }

  /**
   * Add domain user.
   *
   * @param body The domain user to add.
   * @param sendEmail Specifies whether to send an email or not.
   * @param language The two letter language code of the email.
   */
  addUser(body: DomainUser, sendEmail?: boolean, language?: string): Observable<DomainUser | ApiException> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling addUser.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (sendEmail !== undefined && sendEmail !== null) {
      queryParameters = queryParameters.set('email', sendEmail ? 'true' : 'false');
    }
    if (language !== undefined && language !== null) {
      queryParameters = queryParameters.set('lang', language.toUpperCase());
    } else {
      queryParameters = queryParameters.set('lang', 'en');
    }
    return this.http.post<DomainUser>(`${this.baseUrl}/api/users`,
      body,
      {
        params: queryParameters,
        headers: httpHeaders
      }
      // ).pipe(
      //   catchError(err => {
      //     if (err.status === 409) {
      //       return of(new ApiException(err, ApiException.ALREADY_EXISTS));
      //     }
      //     if (err.status === 400 && err.error && err.error.errorCode === ApiException.CHECK_PASSWORD_RESTRICTIONS) {
      //       return of(new ApiException(err, ApiException.CHECK_PASSWORD_RESTRICTIONS));
      //     }
      //     return throwError(err);
      //   })
    );
  }

  /**
   * Delete domain user.
   *
   * @param userName The user name of the domain user.
   */
  deleteUser(userName: string): Observable<boolean> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling deleteUser.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.delete<boolean>(`${this.baseUrl}/api/users/${encodeURIComponent(String(userName))}`,
      {
        headers: httpHeaders
      }
    );
  }

  /**
   * Get a domain user by name.
   *
   * @param userName The user name of the domain user.
   */
  getUser(userName: string): Observable<DomainUser> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling getUser.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<DomainUser>(`${this.baseUrl}/api/users/${encodeURIComponent(String(userName))}`,
      {
        headers: httpHeaders
      }
    );
  }

  /**
   * Get all domain users.
   *
   * @param sort The sort order.
   * @param query The query
   */
  getUsers(sort?: string, query?: string): Observable<Array<DomainUser>> {
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (sort !== undefined && sort !== null) {
      queryParameters = queryParameters.set('sort', sort);
    }
    if (query !== undefined && query !== null) {
      queryParameters = queryParameters.set('q', query);
    }
    return this.http.get<Array<DomainUser>>(`${this.baseUrl}/api/users`,
      {
        params: queryParameters,
        headers: httpHeaders
      }
    );
  }

  /**
   * Updates a domain user.
   *
   * @param body The domain user.
   * @param userName The user name of the domain user.
   * @param updateGroups Specifies whether the memberships should also be updated or not.
   */
  updateUser(body: DomainUser, userName: string, updateGroups?: boolean): Observable<DomainUser> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateUser.');
    }
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling updateUser.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (updateGroups !== undefined && updateGroups !== null) {
      queryParameters = queryParameters.set('updateGroups', updateGroups ? 'true' : 'false');
    }
    return this.http.put<DomainUser>(`${this.baseUrl}/api/users/${encodeURIComponent(String(userName))}`,
      body,
      {
        params: queryParameters,
        headers: httpHeaders
      }
    );
  }

  /**
   * Updates the password of the domain user.
   *
   * @param body The password of the domain user.
   * @param userName The user name of the domain user.
   * @param sendEmail Specifies whether to send an email or not.
   * @param language The two letter language code of the email.
   */
  updateUserPassword(body: Password, userName: string, sendEmail?: boolean, language?: string): Observable<any | ApiException> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateUserPassword.');
    }
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling updateUserPassword.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (sendEmail !== undefined && sendEmail !== null) {
      queryParameters = queryParameters.set('email', sendEmail ? 'true' : 'false');
    }
    if (language !== undefined && language !== null) {
      queryParameters = queryParameters.set('lang', language.toUpperCase());
    } else {
      queryParameters = queryParameters.set('lang', 'en');
    }
    return this.http.put<any>(`${this.baseUrl}/api/users/${encodeURIComponent(String(userName))}/password`,
      body,
      {
        params: queryParameters,
        headers: httpHeaders
      }
    ).pipe(
      catchError(err => {
        if (err.error && err.error.errorCode === ApiException.PASSWORD_NOT_MATCH) {
          return of(new ApiException(err, ApiException.PASSWORD_NOT_MATCH));
          // } else if (err.error && err.error.errorCode === ApiException.CHECK_PASSWORD_RESTRICTIONS) {
          //   return of(new ApiException(err, ApiException.CHECK_PASSWORD_RESTRICTIONS));
        } else {
          return throwError(err);
        }
      })
    );
  }

  /**
   * Checks whether a domain user exists.
   *
   * @param userName The user name of the domain user.
   */
  userExists(userName: string): Observable<boolean> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling userExists.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<boolean>(`${this.baseUrl}/api/users/${encodeURIComponent(String(userName))}/exists`,
      {
        headers: httpHeaders
      }
    );
  }

  /**
   * Checks whether a group name is in use or not.
   *
   * @param userName The user name to check.
   */
  isUserNameInUse(userName: string): Observable<boolean> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling isUserNameInUse.');
    }
    const httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json');
    return this.http.get<boolean>(`${this.baseUrl}/api/users/${encodeURIComponent(String(userName))}/in-use`,
      {
        headers: httpHeaders
      }
    );
  }

}
