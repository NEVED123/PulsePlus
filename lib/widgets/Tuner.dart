import 'package:flutter/material.dart';
import 'package:pulseplus/audio/pitch_engine.dart';

class Tuner extends StatefulWidget {
  const Tuner({super.key, required this.pitchEngine});

  final PitchEngine pitchEngine;

  @override
  State<Tuner> createState() => _TunerState();
}

class _TunerState extends State<Tuner> {
  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => widget.pitchEngine.init(),
      child: Text("Init Pitch Not Implemented Yet"),
    );
  }
}
