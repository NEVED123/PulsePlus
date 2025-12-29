import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';
import 'dart:async';
import 'package:pulseplus/widgets/MetronomeBeats.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final MetronomeOrchestrator _orchestrator;
  late TextEditingController _bpmTextController;

  @override
  void initState() {
    super.initState();
    _orchestrator = MetronomeOrchestrator(_onTick, _onError, 120, 4);
    _bpmTextController = TextEditingController(
      text: _orchestrator.bpm.toString(),
    );
  }

  @override
  void dispose() {
    _bpmTextController.dispose();
    super.dispose();
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
                      Text(
                        "Beats:",
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                      ),
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Subdivisions:",
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                      ),
                      IconButton(
                        icon: Icon(Icons.remove),
                        enableFeedback: false,
                        onPressed: () => setState(() {
                          _orchestrator.numSubdivisions =
                              _orchestrator.numSubdivisions - 1;
                        }),
                      ),
                      Text(
                        _orchestrator.numSubdivisions.toString(),
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                      ),
                      IconButton(
                        icon: Icon(Icons.add),
                        enableFeedback: false,
                        onPressed: () => setState(() {
                          _orchestrator.numSubdivisions =
                              _orchestrator.numSubdivisions + 1;
                        }),
                      ),
                    ],
                  ),
                  TextField(
                    onSubmitted: (String newBpm) {
                      try {
                        _orchestrator.bpm = double.parse(newBpm);
                      } on FormatException {
                        debugPrint(
                          "new bpm must be a valid number, recieved $newBpm",
                        );
                        _bpmTextController.text = _orchestrator.bpm.toString();
                      } catch (e) {
                        debugPrint(
                          "Got exception while changing bpm: ${e.toString()}",
                        );
                      }
                    },
                    style: TextStyle(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                    keyboardType: TextInputType.number,
                    textAlign: TextAlign.center,
                    controller: _bpmTextController,
                  ),
                  MetronomeBeats(orchestrator: _orchestrator),
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
