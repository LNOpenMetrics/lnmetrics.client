/**
 * Definition of types for the Local Reputation Metrics
 * Defined in the RFC 001
 *
 * https://github.com/LNOpenMetrics/lnmetrics.rfc
 */

export type Address = {
  type: string;
  host: string;
  port: number;
};

export type Node = {
  node_id: string;
  color: string;
  alias: string;
  network: string;
  address: Array<Address>;
  node_info: {
    implementation: string;
    version: string;
  };
  last_update: number;
  timezone: string;
};

export type ForwardsRating = {
  success: number;
  failure: number;
  local_failure: number;
};

export type Uptime = {
  one_day: number;
  ten_days: number;
  thirty_days: number;
  six_months: number;
  full: number;
};

export type Limit = {
  min: number;
  max: number;
};

export type ChannelInfo = {
  age: number;
  node_id: string;
  direction: string;
  limits: Limit;
  channel_id: string;
  capacity: string;
  forwards_rating: {
    one_day: ForwardsRating;
    ten_days: ForwardsRating;
    thirty_days: ForwardsRating;
    six_months: ForwardsRating;
    full: ForwardsRating;
  };
  up_time: Uptime;
};

export type AllForwards = {
  ten_days: ForwardsRating;
  thirty_days: ForwardsRating;
};

export type LocalReputation = {
  last_update: number;
  up_time: Uptime;
  forwards_rating: AllForwards;
  channels_info: Array<ChannelInfo>;
};
