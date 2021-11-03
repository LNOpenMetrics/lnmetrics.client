import 'package:client/keys.dart';
import 'package:client/utils/env/core/env_manager.dart';
import 'package:client/utils/graphql/graphql_client.dart';
import 'package:logger/logger.dart';
import 'package:test/test.dart';

void main() {
  var logger = Logger();
  String url = EnvManager.instance.get(GraphQlKeys.GRAPHQL_SERVER);
  var client = GraphQLClient(baseUrl: url);
  client.addQuery(GraphQlKeys.QUERY_LIST_NODES, """
    query {
      nodes
    }
  """);
  test("graphql connection test one", () async {
    var listNodes = await client.useQuery(key: GraphQlKeys.QUERY_LIST_NODES);
    logger.d(
        "Request to get the list of nodes return the following payload\n$listNodes");
    expect(listNodes, allOf([isNot(null), isNot({})]));
  });
}
