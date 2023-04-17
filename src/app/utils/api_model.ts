export interface MetricsModel {
  metrics: Array<MetricModel>;
}

export interface MetricModel {
  name: string;
  rfc: string;
  short_description: string;
}
