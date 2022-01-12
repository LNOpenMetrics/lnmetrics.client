import 'package:client/themes/lnmetrics_dark_night.dart';
import 'package:client/utils/di/app_provider.dart';
import 'package:client/utils/di/provider_iml.dart';
import 'package:client/views/home/app_view.dart';
import 'package:client/views/home/home_view.dart';
import 'package:flutter/material.dart';

Future<void> main() async {
  var provider = await Provider().init();
  runApp(MyApp(provider: provider));
}

class MyApp extends AppView {
  const MyApp({Key? key, required AppProvider provider})
      : super(key: key, provider: provider);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    var title = "LN Open Metrics";
    return LNMetricsDarkNight(
        title: title, home: HomeView(title: title, provider: provider));
  }
}
