/// Node Metric One Model
///
/// This is a wrapper model of the Metric One Output
/// defined in the following json schema.
/// https://github.com/LNOpenMetrics/lnmetrics.rfc/blob/main/schemas/metric_1_output.schema.json
class NodeMetricOne {
  final int version;
  final DateTime age;
  final DateTime lastUpdate;
  final PeerUpTimeRating upTime;

  // TODO missing the payment ratings.
  NodeMetricOne(
      {required this.version,
      required this.age,
      required this.lastUpdate,
      required this.upTime});

  factory NodeMetricOne.fromJson(Map<String, dynamic> json) => NodeMetricOne(
        version: json["version"],
        age: DateTime.fromMicrosecondsSinceEpoch(json["age"] * 1000),
        lastUpdate:
            DateTime.fromMillisecondsSinceEpoch(json["last_update"] * 1000),
        upTime: PeerUpTimeRating.fromJson(json["up_time"]),
      );
}

class PeerUpTimeRating {
  final int today;
  final int tenDays;
  final int thirtyDays;
  final int sixMonths;
  final int full;

  PeerUpTimeRating(
      {required this.today,
      required this.tenDays,
      required this.thirtyDays,
      required this.sixMonths,
      required this.full});

  factory PeerUpTimeRating.fromJson(Map<String, dynamic> json) {
    return PeerUpTimeRating(
      today: json["one_day"],
      tenDays: json["ten_days"],
      thirtyDays: json["thirty_days"],
      sixMonths: json["six_months"],
      full: json["full"],
    );
  }
}
