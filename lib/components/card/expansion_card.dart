import 'package:flutter/material.dart';

class ExpandedCard extends StatelessWidget {
  final Border? shape;
  final double elevation;
  final EdgeInsets margin;
  final Widget child;
  final Widget expandedChild;

  const ExpandedCard(
      {Key? key,
      this.shape,
      this.elevation = 2,
      this.margin = const EdgeInsets.all(12.0),
      required this.child,
      required this.expandedChild})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: shape ??
          const RoundedRectangleBorder(
              borderRadius: BorderRadius.all(Radius.circular(15.0))),
      elevation: elevation,
      margin: margin,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ExpansionTile(
          title: child,
          trailing: const SizedBox(),
          children: <Widget>[expandedChild],
        ),
      ),
    );
  }
}
