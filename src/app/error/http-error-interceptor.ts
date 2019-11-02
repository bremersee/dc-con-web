import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(environment.dcConBaseUrl)) {
      return next.handle(request);
    }
    return next.handle(request)
    .pipe(
      retry(environment.retry),
      catchError((error: HttpErrorResponse) => {
        console.warn('Unexpected http response: ' + JSON.stringify(error));
        /*
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          if (error.status >= 500) {

          }
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
         */
        return throwError(error);
      })
    );
  }
}
