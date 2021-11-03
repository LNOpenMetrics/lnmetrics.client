import 'package:client/utils/env/core/app_env.dart';
import 'package:client/utils/env/core/dot_env.dart';

class EnvManager {
  static EnvManager? _instance;

  static EnvManager get instance => _instance ??= EnvManager._();

  late DotEnv _dotEnv;
  List<AppEnv> customEnvs = [];

  EnvManager._() {
    _dotEnv = DotEnv();
  }

  void addEnvLoader(AppEnv env) {
    customEnvs.add(env);
  }

  dynamic get(String key) {
    String? value;
    if (_dotEnv.contains(key)) {
      value = _dotEnv.get(key);
    }
    for (var element in customEnvs) {
      if (element.contains(key)) {
        value = element.get(key);
      }
    }
    return value;
  }
}
