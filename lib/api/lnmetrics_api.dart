import 'package:client/keys.dart';
import 'package:client/model/ln_node.dart';
import 'package:client/utils/graphql/graphql_client.dart';
import 'package:logger/logger.dart';

class LNMetricsAPI {
  static Logger logger = Logger();
  // TODO: Use an interface of a Client
  late GraphQLClient client;

  LNMetricsAPI({required String baseUrl}) {
    client = GraphQLClient(baseUrl: baseUrl);
    registerQuery(client);
  }

  Future<List<LNNode>> listOfNodes() async {
    var response = await client.useQuery(key: GraphQlKeys.QUERY_LIST_NODES);
    logger.d("listOfNodes return the following raw payload $response");
    List<LNNode> nodes = [];
    response.forEach((key, value) {
      if (key == "nodes") {
        for (var element in value) {
          nodes.add(LNNode(nodeId: element));
        }
      }
    });
    logger.d("N: ${nodes.length} Nodes loaded");
    return nodes;
  }

  void registerQuery(GraphQLClient client) {
    client.addQuery(GraphQlKeys.QUERY_LIST_NODES, """
        query {
            nodes
        }
        """);
  }
}
