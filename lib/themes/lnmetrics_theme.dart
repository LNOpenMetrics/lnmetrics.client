import 'package:flutter/material.dart';

abstract class LNMetricsThemeApp extends StatelessWidget {
  const LNMetricsThemeApp({Key? key, required this.home, required this.title})
      : super(key: key);

  // The home view (root of the three of the app)
  final Widget home;
  final String title;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: title,
      themeMode: ThemeMode.dark,
      darkTheme: makeDarkTheme(context: context),
      theme: makeTheme(context: context),
      home: home,
    );
  }

  ThemeData? makeDarkTheme({required BuildContext context});

  ThemeData? makeTheme({required BuildContext context});
}
