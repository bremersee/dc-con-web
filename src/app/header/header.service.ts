import { Injectable } from '@angular/core';

export const USERS = 'Users';

export const GROUPS = 'Groups';

export const NAME_SERVER = 'NameServer';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }
}
