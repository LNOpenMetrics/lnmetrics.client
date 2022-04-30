import 'package:client/model/ln_node.dart';
import 'package:client/model/node_metric_one.dart';
import 'package:graphql/client.dart';
import 'package:logger/logger.dart';

class LNMetricsAPI {
  static Logger logger = Logger();
  late GraphQLClient client;

  LNMetricsAPI({required String baseUrl}) {
    var link = HttpLink(baseUrl);
    client = GraphQLClient(
      cache: GraphQLCache(),
      link: link,
    );
  }

  Future<QueryResult> makeRequest(QueryOptions query) async {
    var response = await client.query(query);
    if (response.hasException) {
      logger.d(
          "Error received during the request: ${response.exception.toString()}");
      throw Exception(
          "Error received during the request: ${response.exception.toString()}");
    }
    logger.d("listOfNodes return the following raw payload ${response.data}");
    return response;
  }

  Future<List<LNNode>> listOfNodes() async {
    final query = QueryOptions(document: gql(r""" 
    query ReadNodes($networkVar: String!){
        getNodes(network: $networkVar) {
              __typename
              alias
              node_id
              address {
                type
                host
                port
              }
              os_info {
                os
                version
                architecture
              }
              timezone
              last_update
            }
      }
         """), variables: {
      "networkVar": "bitcoin",
    });

    var response = await makeRequest(query);
    var data = response.data!["getNodes"]! as List;
    logger.d("List of nodes is: $data");
    List<LNNode> nodes = [];
    try {
      for (var value in data) {
        logger.d("$value");
        var node = LNNode.fromJson(value);
        nodes.add(node);
      }
    } catch (err, stacktrace) {
      logger.e(err);
      logger.d(stacktrace);
    }
    logger.d("N: ${nodes.length} Nodes loaded");
    return nodes;
  }

  Future<NodeMetricOne> metricOneByNode(String nodeID) async {
    final query = QueryOptions(document: gql(r""" 
    query ReadMetric($networkVar: String!, $nodeID: String!){
        getMetricOneResult(network: $networkVar, 
          node_id: $nodeID) {
          version
          age
          last_update
          up_time {
            one_day
            ten_days
            thirty_days
            six_months
            full
          }
          forwards_rating {
            one_day {
              success
              failure
              internal_failure
            }
            ten_days {
              success
              failure
              internal_failure
            }
            thirty_days {
              success
              failure
              internal_failure
            }
            full {
              success
              failure
              internal_failure
            }
          }
          channels_info {
            channel_id
            node_id
            age
            forwards_rating {
            one_day {
              success
              failure
              internal_failure
            }
            ten_days {
              success
              failure
              internal_failure
            }
            thirty_days {
              success
              failure
              internal_failure
            }
            full {
              success
              failure
              internal_failure
            }
            }
            up_time {
              one_day
              ten_days
              thirty_days
              six_months
              full
            }
          }
        }
      }
         """), variables: {
      "networkVar": "bitcoin",
      "nodeID": nodeID,
    });

    var response = await makeRequest(query);
    var data = response.data!["getMetricOneResult"]!;
    logger.d("Metric Node: $data");
    try {
      return NodeMetricOne.fromJson(data);
    } catch (err, stacktrace) {
      logger.e(err);
      logger.d(stacktrace);
      rethrow;
    }
  }
}
