import 'package:client/api/lnmetrics_api.dart';
import 'package:client/components/charts/uptime_barchart.dart';
import 'package:client/model/node_metric_one.dart';
import 'package:client/utils/di/app_provider.dart';
import 'package:client/views/home/app_view.dart';
import 'package:flutter/cupertino.dart';

/// Node card is a Widget that wrap the Body view
/// of oen node.
///
/// In addition this required a API call to the server to get
/// a node result
class NodeCard extends AppView {
  /// The node ID used also to query the API
  final String nodeID;
  late final LNMetricsAPI api = provider.get<LNMetricsAPI>();

  NodeCard({Key? key, required AppProvider provider, required this.nodeID})
      : super(key: key, provider: provider);

  Widget _buildMetricView(
      {required BuildContext context,
      required String nodeID,
      required NodeMetricOne metricOne}) {
    return UpTimeBarChart(rating: metricOne.upTime, aliasNode: nodeID);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<NodeMetricOne>(
        future: api.metricOneByNode(nodeID),
        builder: (BuildContext context, AsyncSnapshot<NodeMetricOne> snapshot) {
          if (snapshot.hasData) {
            var metricData = snapshot.data!;
            return Center(
                child: _buildMetricView(
                    context: context, nodeID: nodeID, metricOne: metricData));
          } else {
            return const Text("Loading metric..");
          }
        });
  }
}
