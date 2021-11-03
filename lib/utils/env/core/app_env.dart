abstract class AppEnv {
  dynamic get(String key);
  bool contains(String key);
  void clean();
}
