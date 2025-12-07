import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';
import 'dart:async';
import 'package:flutter/services.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _counter = 0;
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
    _orchestrator = MetronomeOrchestrator(_onTick, _onError);
  }

  Future<void> _toggleMetronome() async {
    debugPrint(_orchestrator.isPlaying().toString());
    if (!_orchestrator.isPlaying()) {
      await _orchestrator.play(120);
    } else {
      await _orchestrator.stop();
    }
    setState(() {});
  }

  void _onTick() {
    setState(() {
      _counter++;
    });
  }

  void _onError(String? error) {
    debugPrint(error);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            //Text("Exception: $_exceptionMessage"),
            FloatingActionButton(
              onPressed: _playSound,
              child: Text('I play sound'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _toggleMetronome,
        child: Text(_orchestrator.isPlaying() ? 'Stop' : 'Start'),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
