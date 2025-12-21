import 'package:flutter/material.dart';
import 'package:pulseplus/metronome/engine_message.dart';
import 'package:pulseplus/metronome/metronome_engine.dart';

// Maintains higher level metronome concepts, such as meter, subdivisions, tempo changes, etc.
class MetronomeOrchestrator {
  late MetronomeEngine _engine;
  late double _bpm;
  late int _numBeats;

  late int _currBeat = -1;

  MetronomeOrchestrator(
    Function onTick,
    Function(String)? onError,
    double initBpm,
    int initNumBeats,
  ) {
    _engine = MetronomeEngine(
      _createOrchestratorOnTickCallback(onTick),
      onError,
    );
    _bpm = initBpm;
    _numBeats = initNumBeats;
  }

  Function _createOrchestratorOnTickCallback(Function userOnTick) {
    return () {
      // We need to track how many beats have elapsed - once we hit numBeats % beatsElapsed == 0, we are at the starting beat.
      // This means that if we want to switch to a different sound on the downbeat, we need to do so after the last beat (numBeats % (beatsElapsed + 1) == 0)
      _currBeat = (_currBeat + 1) % _numBeats;
      userOnTick();
    };
  }

  Future<void> play() async {
    await _validateEngineReadiness();
    await _engine.play(_bpm);
  }

  Future<void> stop() async {
    await _validateEngineReadiness();
    await _engine.stop();
    _currBeat = -1;
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
  int get currBeat => _currBeat;

  set bpm(double bpm) {
    if (bpm > 10) {
      bpm = _bpm;
    } else {
      debugPrint("Invalid param for bpm: $bpm");
    }
  }

  set numBeats(int numBeats) {
    if (numBeats > 0 && numBeats <= 16) {
      _numBeats = numBeats;
    } else {
      debugPrint("Invalid param for num beats: $numBeats");
    }
  }
}
