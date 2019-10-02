import {DhcpLease} from './dhcpLease';

export {DhcpLease} from './dhcpLease';

/**
 * DNS Record
 */
export interface DnsRecord {

  /**
   * The correlated record value.
   */
  correlatedRecordValue?: string;

  dhcpLease?: DhcpLease;

  /**
   * The record raw active directory value.
   */
  recordRawValue?: string;

  /**
   * The record type.
   */
  recordType: string;

  /**
   * The record value.
   */
  recordValue?: string;

  /**
   * The serial.
   */
  serial?: number;

  /**
   * The time stamp.
   */
  timeStamp?: Date;

  /**
   * TTL in seconds.
   */
  ttlSeconds?: number;

  /**
   * The version.
   */
  version?: number;
}
