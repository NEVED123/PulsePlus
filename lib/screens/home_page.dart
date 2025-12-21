import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';
import 'dart:async';
import 'package:flutter/services.dart';
import 'package:pulseplus/widgets/MetronomeBeats.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final MetronomeOrchestrator _orchestrator;
  late final SoundEngine _soundEngine;
  Function? _soundCallback;

  Future<void> _playSound() async {
    if (_soundCallback == null) {
      _soundEngine = SoundEngine();
      _soundCallback = await _soundEngine.init();
    }

    _soundCallback!();
  }

  @override
  void initState() {
    super.initState();
    _orchestrator = MetronomeOrchestrator(_onTick, _onError, 120, 4);
  }

  Future<void> _toggleMetronome() async {
    if (!_orchestrator.isPlaying()) {
      await _orchestrator.play();
    } else {
      await _orchestrator.stop();
    }
    setState(() {});
  }

  void _onTick() {
    _playSound();
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
        child: Scaffold(
          body: Center(
            child: Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(25),
              ),
              constraints: BoxConstraints.expand(),
              margin: EdgeInsets.all(25),
              padding: EdgeInsets.all(25),
              child: Column(
                spacing: 10,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        icon: Icon(Icons.remove),
                        enableFeedback: false,
                        onPressed: () => setState(() {
                          _orchestrator.numBeats = _orchestrator.numBeats - 1;
                        }),
                      ),
                      Text(
                        _orchestrator.numBeats.toString(),
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                      ),
                      IconButton(
                        icon: Icon(Icons.add),
                        enableFeedback: false,
                        onPressed: () => setState(() {
                          _orchestrator.numBeats = _orchestrator.numBeats + 1;
                        }),
                      ),
                    ],
                  ),
                  Text(
                    _orchestrator.bpm.toString(),
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  MetronomeBeats(
                    numBeats: _orchestrator.numBeats,
                    currBeat: _orchestrator.currBeat,
                  ),
                  IconButton(
                    onPressed: _toggleMetronome,
                    enableFeedback: false,
                    icon: Icon(
                      _orchestrator.isPlaying()
                          ? Icons.pause
                          : Icons.play_arrow,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
