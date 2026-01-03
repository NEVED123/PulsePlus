import 'package:flutter/material.dart';
import 'package:pulseplus/audio/pitch_engine.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';
import 'package:pulseplus/widgets/Metronome.dart';
import 'dart:async';
import 'package:pulseplus/widgets/MetronomeBeats.dart';
import 'package:pulseplus/widgets/Sound.dart';
import 'package:pulseplus/widgets/Tuner.dart';
import 'package:pulseplus/widgets/WidgetBase.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final MetronomeOrchestrator _orchestrator;
  late final PitchEngine _pitchEngine;

  @override
  void initState() {
    super.initState();
    _orchestrator = MetronomeOrchestrator(_onTick, _onError, 120, 4);
    _pitchEngine = PitchEngine();
  }

  void _onTick() {
    setState(() {});
  }

  void _onError(String? error) {
    debugPrint(error);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color: Theme.of(context).canvasColor),
      child: SafeArea(
        bottom: false,
        child: Scaffold(
          body: PageView(
            scrollDirection: Axis.vertical,
            pageSnapping: true,
            children: [
              WidgetBase(child: Metronome(orchestrator: _orchestrator)),
              WidgetBase(child: Tuner(pitchEngine: _pitchEngine)),
              WidgetBase(child: Sound()),
            ],
          ),
          bottomNavigationBar: BottomNavigationBar(
            items: [
              BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
              BottomNavigationBarItem(
                icon: Icon(Icons.settings),
                label: 'Settings',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
