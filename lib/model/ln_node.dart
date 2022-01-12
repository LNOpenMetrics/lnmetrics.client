class LNNode {
  final String nodeId;
  final String alias;
  final List<Address> addresses;
  final OSInfo osInfo;
  final String timezone;
  final DateTime lastUpdate;

  const LNNode(
      {required this.nodeId,
      required this.alias,
      required this.osInfo,
      required this.addresses,
      required this.timezone,
      required this.lastUpdate});

  factory LNNode.fromJson(Map<String, dynamic> json) {
    return LNNode(
      nodeId: json["node_id"],
      alias: json["alias"],
      addresses: (json["address"] as List)
          .map<Address>((e) => Address.fromJson(e))
          .toList(),
      osInfo: OSInfo.fromJson(json["os_info"]),
      timezone: json["timezone"],
      // TODO check if the conversion is the right conversion
      lastUpdate: DateTime.fromMillisecondsSinceEpoch(json["last_update"]),
    );
  }
}

/// Address Wrapper
class Address {
  final String type;
  final String address;
  final int port;

  Address({required this.type, required this.address, required this.port});

  factory Address.fromJson(Map<String, dynamic> json) =>
      Address(type: json["type"], address: json["host"], port: json["port"]);
}

/// OSInfo wrapper
class OSInfo {
  final String os;
  final String version;
  final String architecture;

  OSInfo({required this.os, required this.version, required this.architecture});

  factory OSInfo.fromJson(Map<String, dynamic> json) => OSInfo(
      os: json["os"],
      version: json["version"],
      architecture: json["architecture"]);
}
