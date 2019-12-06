/**
 * Sid.
 */
export interface Sid {

  /**
   * The windows/samba SID.
   */
  value: string;

  /**
   * Specifies whether the entity is a system entity or not.
   */
  previousValue?: boolean;

}
