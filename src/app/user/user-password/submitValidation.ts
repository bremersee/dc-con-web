/**
 * Password submit state.
 */
export interface SubmitValidation {

  loginFailed: boolean;

  passwordComplexityFailed: boolean;

  internalServerError: boolean;

}
