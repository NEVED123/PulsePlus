import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';
import 'package:pulseplus/metronome/engine_message.dart';
import 'package:pulseplus/metronome/metronome_engine.dart';

// Maintains higher level metronome concepts, such as meter, subdivisions, tempo changes, etc.,
// As well as the sound that the metronome generates.
// This may become the source of truth for metronome state in the future.
class MetronomeOrchestrator {
  late final MetronomeEngine _engine;
  late final SoundEngine _soundEngine;
  late Function _soundCallback;
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
    _soundEngine = SoundEngine();
    _bpm = initBpm;
    _numBeats = initNumBeats;
  }

  Function _createOrchestratorOnTickCallback(Function userOnTick) {
    return () {
      // We need to track how many beats have elapsed - once we hit numBeats % beatsElapsed == 0, we are at the starting beat.
      // This means that if we want to switch to a different sound on the downbeat, we need to do so after the last beat (numBeats % (beatsElapsed + 1) == 0)
      _soundCallback();
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

  Future<void> changeSound(String fileName) async {
    await _validateEngineReadiness();
    await _soundEngine.changeSound(fileName);
  }

  bool isPlaying() {
    return _engine.isPlaying();
  }

  Future<void> _validateEngineReadiness() async {
    if (!_engine.isReady()) {
      await _engine.init();
    }

    if (!_soundEngine.isReady()) {
      _soundCallback = await _soundEngine.init();
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
