import 'dart:ui';

import 'package:flutter/material.dart';

class WidgetBase extends StatelessWidget {
  const WidgetBase({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(25),
      ),
      constraints: BoxConstraints.expand(),
      margin: EdgeInsets.all(25),
      padding: EdgeInsets.all(25),
      child: child,
    );
  }
}
