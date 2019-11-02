import {HttpErrorResponse} from '@angular/common/http';

export {HttpErrorResponse} from '@angular/common/http';

export class ApiException {

  static ALREADY_EXISTS = 'already_exists';

  static CHECK_PASSWORD_RESTRICTIONS = 'check_password_restrictions';

  static PASSWORD_NOT_MATCH = 'password_does_not_match';

  constructor(private err?: HttpErrorResponse, private errHint?: string) {
  }

  get error(): HttpErrorResponse {
    return this.err;
  }

  get hint(): string {
    return this.errHint;
  }

}
