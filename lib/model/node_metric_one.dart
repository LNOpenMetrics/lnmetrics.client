/// Node Metric One Model
///
/// This is a wrapper model of the Metric One Output
/// defined in the following json schema.
/// https://github.com/LNOpenMetrics/lnmetrics.rfc/blob/main/schemas/metric_1_output.schema.json
class NodeMetricOne {
  final int version;
  final DateTime age;
  final DateTime lastUpdate;

  // TODO missing the payment ratings.
  NodeMetricOne(
      {required this.version, required this.age, required this.lastUpdate});

  factory NodeMetricOne.fromJson(Map<String, dynamic> json) => NodeMetricOne(
      version: json["version"],
      age: DateTime.fromMillisecondsSinceEpoch(json["age"]),
      lastUpdate: DateTime.fromMillisecondsSinceEpoch(json["last_update"]));
}
