/**
 * The password information of the domain controller.
 */
import {PasswordComplexity} from './passwordComplexity';

export {PasswordComplexity} from './passwordComplexity';

export interface PasswordInformation {

  /**
   * The password complexity.
   */
  passwordComplexity?: PasswordComplexity;

  /**
   * Store plaintext passwords where account have 'store passwords with reversible encryption' set (on | off | default). Default is 'off'.
   */
  storePlaintextPasswords?: boolean;

  /**
   * The password history length. Default is 24.
   */
  passwordHistoryLength?: number;

  /**
   * The minimum password length. Default is 7.
   */
  minimumPasswordLength?: number;

  /**
   * The minimum password age in days. Default is 1.
   */
  minimumPasswordAgeInDays?: number;

  /**
   * The maximum password age in days. Default is 43.
   */
  maximumPasswordAgeInDays?: number;

  /**
   * The the length of time an account is locked out after exceeding the limit on bad password attempts. Default is 30.
   */
  accountLockoutDurationInMinutes?: number;

  /**
   * The number of bad password attempts allowed before locking out the account. Default is 0 (never lock out).
   */
  accountLockoutThreshold?: number;

  /**
   * After this time is elapsed, the recorded number of attempts restarts from zero. Default is 30.
   */
  resetAccountLockoutAfter?: number;

}
