import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PasswordInformation} from '../model/password-information';

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
    })
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
