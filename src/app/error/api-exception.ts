import {HttpErrorResponse} from '@angular/common/http';

export {HttpErrorResponse} from '@angular/common/http';

export class ApiException {

  static ALREADY_EXISTS = 'already_exists';

  static CHECK_PASSWORD_RESTRICTIONS = 'check_password_restrictions';

  constructor(error?: HttpErrorResponse, hint?: string) {
  }

  get error(): HttpErrorResponse {
    return this.error;
  }

  get hint(): string {
    return this.hint;
  }

}
