import {Injectable, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {GlobalErrorHandler} from '../../error/global-error-handler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private successMessage = new Subject<string>();

  private errorMessage = new Subject<string>();

  constructor() {
  }

  sendSuccessMessage(message: string): void {
    this.successMessage.next(message);
  }

  getSuccessMessage(): Observable<string> {
    return this.successMessage.asObservable();
  }

  sendErrorMessage(message: string): void {
    console.warn('got error message: ' + message);
    this.errorMessage.next(message);
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessage.asObservable();
  }

}
