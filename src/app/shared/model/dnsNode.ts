import {DnsRecord} from './dnsRecord';

export {DnsRecord} from './dnsRecord';

/**
 * DNS node
 */
export interface DnsNode {

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
