import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {NotificationService} from '../shared/service/notification.service';
import {Observable, Subscription, of} from 'rxjs';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private successMessageSubscription: Subscription;

  private errorMessageSubscription: Subscription;

  private lastSuccessMessage: string;

  private errorMessages = new Array<string>();

  constructor(private notificationService: NotificationService) {
    // this.errorMessages.push('My first error message.');
  }

  ngOnInit() {
    this.successMessageSubscription = this.notificationService
    .getSuccessMessage()
    .subscribe(message => this.onNewSuccessMessage(message));
    this.errorMessageSubscription = this.notificationService
    .getErrorMessage()
    .subscribe(message => this.onNewErrorMessage(message));
  }

  ngOnDestroy(): void {
    this.successMessageSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }

  onNewSuccessMessage(message: string) {
    if (message === undefined || message === null || message === '') {
      this.lastSuccessMessage = undefined;
    } else {
      this.lastSuccessMessage = message;
      setTimeout(() => this.lastSuccessMessage = undefined, 3000);
    }
  }

  onNewErrorMessage(message: string) {
    console.warn('new error message: ' + message);
    if (message !== undefined && message !== null && message !== '') {
      this.errorMessages.push(message);
      console.warn('Length = ' + this.errorMessages.length);
    }
  }

  removeErrorMessage(index: number): void {
    console.warn('Remove: ' + index);
    if (index > -1 && index < this.errorMessages.length) {
      this.errorMessages.splice(index, 1);
    }
  }

}
