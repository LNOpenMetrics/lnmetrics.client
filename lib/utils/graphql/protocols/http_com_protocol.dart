import 'dart:convert';

import 'package:http/http.dart' as http;

import 'package:client/utils/graphql/protocols/graphql_communication_protocol.dart';

//TODO: adding authentication method in case we want export it as dart package.
class HttpComProtocol extends GraphQLProtocol {
  const HttpComProtocol() : super();

  @override
  Future<Map<String, dynamic>> runQuery(
      {required String url,
      required body,
      Map<String, String> headers = const {
        "Content-Type": "application/json"
      }}) async {
    var uri = Uri.parse(url);
    var response =
        await http.post(uri, body: json.encode(body), headers: headers);
    return jsonDecode(utf8.decode(response.bodyBytes)) as Map<String, dynamic>;
  }
}
