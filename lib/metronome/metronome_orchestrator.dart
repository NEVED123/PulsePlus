import 'package:flutter/material.dart';
import 'package:pulseplus/metronome/engine_message.dart';
import 'package:pulseplus/metronome/metronome_engine.dart';

class MetronomeOrchestrator {
  late MetronomeEngine _engine;
  late double _bpm;
  late int _numBeats;

  MetronomeOrchestrator(
    Function onTick,
    Function(String)? onError,
    double initBpm,
    int initNumBeats,
  ) {
    _engine = MetronomeEngine(onTick, onError);
    _bpm = initBpm;
    _numBeats = initNumBeats;
  }

  Future<void> play() async {
    await _validateEngineReadiness();
    await _engine.play(_bpm);
  }

  Future<void> stop() async {
    await _validateEngineReadiness();
    await _engine.stop();
  }

  bool isPlaying() {
    return _engine.isPlaying();
  }

  Future<void> _validateEngineReadiness() async {
    if (!_engine.isReady()) {
      await _engine.init();
    }
  }

  double get bpm => _bpm;
  int get numBeats => _numBeats;

  set bpm(double bpm) {
    if (bpm > 10) {
      bpm = _bpm;
    } else {
      debugPrint("Invalid param for bpm: $bpm");
    }
  }

  set numBeats(int numBeats) {
    if (numBeats > 0 && numBeats < 16) {
      _numBeats = numBeats;
    } else {
      debugPrint("Invalid param for bpm: $bpm");
    }
  }
}
