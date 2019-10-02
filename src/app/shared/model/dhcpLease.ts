/**
 * A dhcp lease of the dhcp server.
 */
export interface DhcpLease {

  /**
   * The start time of the lease.
   */
  begin?: Date;

  /**
   * The end time of the lease.
   */
  end?: Date;

  /**
   * The host name of the client.
   */
  hostname?: string;

  /**
   * The ip of the client.
   */
  ip?: string;

  /**
   * The mac of the client.
   */
  mac?: string;

  /**
   * The manufacturer of the client.
   */
  manufacturer?: string;
}
