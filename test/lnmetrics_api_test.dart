import 'package:client/api/lnmetrics_api.dart';
import 'package:client/keys.dart';
import 'package:client/utils/env/core/env_manager.dart';
import 'package:logger/logger.dart';
import 'package:test/test.dart';

void main() {
  var logger = Logger();
  String url = EnvManager.instance.get(GraphQlKeys.GRAPHQL_SERVER);
  var client = LNMetricsAPI(baseUrl: url);
  test("List nodes API test one", () async {
    var listNodes = await client.listOfNodes();
    logger.d(
        "Request to get the list of nodes return the following payload\n$listNodes");
    expect(listNodes, allOf([isNot(null), isNot({})]));
  });
}
