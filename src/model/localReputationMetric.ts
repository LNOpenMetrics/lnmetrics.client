/**
 * Definition of types for the Local Reputation Metrics
 * Defined in the RFC 001
 *
 * https://github.com/LNOpenMetrics/lnmetrics.rfc
 */

export type Node = {
  node_id: string;
  color: string;
  alias: string;
  network: string;
  address: {
    type: string;
    host: string;
    port: number;
  };
  node_info: {
    implementation: string;
    version: string;
  };
  last_update: number;
  timezone: string;
};
