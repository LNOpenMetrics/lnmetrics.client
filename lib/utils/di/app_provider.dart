// TODO finish the implementation of a generic provider
import 'package:get_it/get_it.dart';

abstract class AppProvider {
  void registerDependence<T extends Object>(T implementation,
      {bool eager = false}) {
    GetIt.instance.registerSingleton<T>(implementation);
  }

  T get<T extends Object>() => GetIt.instance.get<T>();

  /// Main init method to initialize the Provider of the application
  /// this will call from the framework
  Future<void> init();
}
