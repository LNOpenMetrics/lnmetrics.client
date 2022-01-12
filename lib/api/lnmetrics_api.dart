import 'package:client/model/ln_node.dart';
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
    var response = await client.query(query);
    if (response.hasException) {
      logger.d("Error received during the request: ${response.exception.toString()}");
      throw Exception(
          "Error received during the request: ${response.exception.toString()}");
    }
    logger.d("listOfNodes return the following raw payload ${response.data}");

    var data = response.data!["getNodes"]! as List;
    logger.d("List of nodes is: $data");
    List<LNNode> nodes = [];
    try {
      for (var value in data) {
        logger.d("$value");
        var node = LNNode.fromJson(value);
        nodes.add(node);
      }
    }catch(err, stacktrace) {
      logger.e(err);
      logger.d(stacktrace);
    }
    logger.d("N: ${nodes.length} Nodes loaded");
    return nodes;
  }
}
