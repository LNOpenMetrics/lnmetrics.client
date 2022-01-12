import 'package:client/api/lnmetrics_api.dart';
import 'package:client/utils/di/app_provider.dart';

/// Specific implementation of the App Provider where the user can
/// init the dependencies.
///
/// and the method is called by the user
class Provider extends AppProvider {
  @override
  Future<Provider> init() async {
    registerDependence<LNMetricsAPI>(
        LNMetricsAPI(baseUrl: "https://api.lnmetrics.info/query"));
    return this;
  }
}
