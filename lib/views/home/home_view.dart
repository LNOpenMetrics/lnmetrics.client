import 'package:flutter/material.dart';

class HomeView extends StatelessWidget {
  const HomeView({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
          centerTitle: false,
          primary: true,
          elevation: 0,
          leading: Container(),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
        body: const Text("I'm coming soon"));
  }
}
