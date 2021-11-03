import 'package:client/utils/graphql/protocols/graphql_communication_protocol.dart';
import 'package:client/utils/graphql/protocols/http_com_protocol.dart';

class GraphQLClient {
  // The base URL of the graphql server.
  late String baseUrl;
  GraphQLProtocol protocol;
  Map<String, String> queries = {};

  GraphQLClient(
      {required this.baseUrl, this.protocol = const HttpComProtocol()});

  void addQuery(String key, String body) {
    queries[key] = body;
  }

  Future<Map<String, dynamic>> useQuery(
      {required String key, Map<String, dynamic> variables = const {}}) async {
    if (!queries.containsKey(key)) {
      throw Exception("Query with key $key it is unknown");
    }
    var query = queries[key]!;
    var request = {"query": query};
    return await protocol.runQuery(url: baseUrl, body: request);
  }
}
