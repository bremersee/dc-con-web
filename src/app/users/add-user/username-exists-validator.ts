import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, of, pipe} from 'rxjs';
import {DomainUserService} from '../../shared/service/domain-user.service';
import {DomainGroupService} from '../../shared/service/domain-group.service';
import {map} from 'rxjs/operators';

export function existingUserNameValidator(userService: DomainUserService, groupService: DomainGroupService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    console.warn('Value = ' + control.value);
    const value: string = control.value;
    if (value.length === 0) {
      return of(null);
    }
    return userService.userExists(value).pipe(map(userExists => userExists ? {userNameExists: true} : null));

    /*
    return userService.userExists(value).pipe(map(userExists => {
        return userExists ? {userNameExists: true} : groupService.groupExists(value).pipe(map(groupExists => {
          return groupExists ? {userNameExists: true} : null;
        }));
      }
    ));
     */
  };
}
