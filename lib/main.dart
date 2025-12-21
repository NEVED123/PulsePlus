import 'package:flutter/material.dart';
import 'package:pulseplus/screens/home_page.dart';

void main() {
  runApp(const PulsePlus());
}

class PulsePlus extends StatelessWidget {
  const PulsePlus({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 0, 24, 109),
          brightness: Brightness.dark,
        ),
      ),
      home: const HomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
