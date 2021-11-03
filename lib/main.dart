import 'package:client/themes/lnmetrics_dark_night.dart';
import 'package:client/views/home/home_view.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    var title = "LN Open Metrics";
    return LNMetricsDarkNight(title: title, home: HomeView(title: title));
  }
}
