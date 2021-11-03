import 'package:client/utils/env/core/app_env.dart';

import 'package:dotenv/dotenv.dart' show load, env;

class DotEnv extends AppEnv {
  DotEnv() {
    load();
  }

  @override
  bool contains(String key) {
    return env.containsKey(key);
  }

  @override
  get(String key) {
    return env[key];
  }

  @override
  void clean() {
    clean();
  }
}
