import 'package:flutter/material.dart';
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
  static const platform = MethodChannel('samples.flutter.dev/battery');

  String _batteryLevel = 'Unknown battery level.';

  Future<void> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final result = await platform.invokeMethod<int>('getBatteryLevel');
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }

    setState(() {
      _batteryLevel = batteryLevel;
    });
  }

  @override
  void initState() {
    super.initState();
    _orchestrator = MetronomeOrchestrator(_onTick, _onError);
    _getBatteryLevel();
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
            Text("Battery level: $_batteryLevel"),
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
