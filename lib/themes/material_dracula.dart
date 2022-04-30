import 'package:client/themes/lnmetrics_theme.dart';
import 'package:flutter/material.dart';

class MaterialDracula extends LNMetricsThemeApp {
  const MaterialDracula({Key? key, required String title, required Widget home})
      : super(key: key, title: title, home: home);

  @override
  ThemeData? makeTheme({required BuildContext context}) {
    return makeDarkTheme(context: context);
  }

  @override
  ThemeData? makeDarkTheme({required BuildContext context}) {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: const Color.fromARGB(255, 40, 42, 54),
      backgroundColor: const Color.fromARGB(255, 40, 42, 54),
      cardColor: const Color.fromARGB(255, 40, 42, 54),
      selectedRowColor: const Color.fromARGB(255, 72, 79, 114),
      dialogBackgroundColor: const Color.fromARGB(255, 40, 42, 54),
      disabledColor: const Color.fromARGB(255, 98, 114, 164),
      canvasColor: const Color.fromARGB(255, 40, 42, 54),
      toggleableActiveColor: const Color.fromARGB(255, 255, 121, 197),
      unselectedWidgetColor: const Color.fromARGB(255, 98, 114, 164),
      colorScheme: const ColorScheme.dark(
        background: Color.fromARGB(255, 40, 42, 54),
        onPrimary: Color.fromARGB(255, 40, 42, 54),
        primary: Color.fromARGB(255, 255, 121, 197),
        secondary: Color.fromARGB(255, 40, 42, 54),
        primaryContainer: Color.fromARGB(255, 57, 60, 75),
      ),
      inputDecorationTheme: const InputDecorationTheme(
        enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Color.fromARGB(255, 98, 114, 164))),
        focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Color.fromARGB(255, 255, 121, 197))),
        labelStyle: TextStyle(color: Color.fromARGB(255, 98, 114, 164)),
        prefixStyle: TextStyle(color: Color.fromARGB(255, 98, 114, 164)),
        suffixStyle: TextStyle(color: Color.fromARGB(255, 98, 114, 164)),
      ),
      textTheme: const TextTheme(
        bodyText1: TextStyle(),
        bodyText2: TextStyle(),
        headline5: TextStyle(fontWeight: FontWeight.bold),
        caption: TextStyle(fontStyle: FontStyle.normal, fontSize: 13),
      ).apply(
        bodyColor: const Color.fromARGB(255, 98, 114, 164),
        decorationColor: const Color.fromARGB(255, 98, 114, 164),
      ),
      iconTheme: Theme.of(context).iconTheme.copyWith(
            color: const Color.fromARGB(255, 98, 114, 164),
          ),
      appBarTheme: const AppBarTheme(
        color: Color.fromARGB(255, 40, 42, 54),
      ),
      //visualDensity: VisualDensity.adaptivePlatformDensity,
    );
  }
}
