abstract class GraphQLProtocol {
  const GraphQLProtocol();

  Future<Map<String, dynamic>> runQuery({required String url, required body});
}
