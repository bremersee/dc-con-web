import {DnsNode} from './dns-node';
import {DnsRecord} from './dns-record';

export {DnsNode} from './dns-node';
export {DnsRecord} from './dns-record';

/**
 * DNS node
 */
export interface DnsNodeRecord {

  node: DnsNode;

  /**
   * The name server records.
   */
  record: DnsRecord;

  recordIndex: number;

}
