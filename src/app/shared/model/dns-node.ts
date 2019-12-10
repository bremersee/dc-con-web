import {DnsRecord} from './dns-record';

export {DnsRecord} from './dns-record';

/**
 * DNS node
 */
export interface DnsNode {

  /**
   * The model type.
   */
  _type: string;

  /**
   * The creation date.
   */
  created?: Date;

  /**
   * The distinguished name in the active directory.
   */
  distinguishedName?: string;

  /**
   * The last modification date.
   */
  modified?: Date;

  /**
   * The entry name (host name or part of the ip address).
   */
  name: string;

  /**
   * The name server records.
   */
  records?: Array<DnsRecord>;
}
