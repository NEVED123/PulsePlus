import 'package:flutter/material.dart';

class Sound extends StatefulWidget {
  const Sound({super.key});

  @override
  State<Sound> createState() => _SoundState();
}

class _SoundState extends State<Sound> {
  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => debugPrint("Init Sound Not Implemented Yet"),
      child: Text("Init Sound"),
    );
  }
}
