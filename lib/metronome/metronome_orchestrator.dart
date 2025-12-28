import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';
import 'package:pulseplus/audio/sound_files.dart';
import 'package:pulseplus/metronome/beat.dart';
import 'package:pulseplus/metronome/metronome_engine.dart';

// Maintains higher level metronome concepts, such as meter, subdivisions, tempo changes, etc.,
// As well as the sound that the metronome generates.
// This may become the source of truth for metronome state in the future.
class MetronomeOrchestrator {
  late final MetronomeEngine _metronomeEngine;
  late final SoundEngine _soundEngine;
  late double _bpm;
  late int _currBeat = -1;
  late List<Beat> _beats;

  MetronomeOrchestrator(
    Function onTick,
    Function(String)? onError,
    double initBpm,
    int initNumBeats,
  ) {
    _metronomeEngine = MetronomeEngine(
      _createOrchestratorOnTickCallback(onTick),
      onError,
    );
    _soundEngine = SoundEngine();
    _bpm = initBpm;
    _beats = [
      Beat(subDivisions: [SoundFile.clave808]),
    ];

    for (int i = 0; i < initNumBeats - 1; i++) {
      _beats.add(Beat());
    }
  }

  Function _createOrchestratorOnTickCallback(Function userOnTick) {
    return () {
      // We need to track how many beats have elapsed - once we hit numBeats % beatsElapsed == 0, we are at the starting beat.
      // This means that if we want to switch to a different sound on the downbeat, we need to do so after the last beat currBeat = numBeats - 1
      _currBeat = (_currBeat + 1) % numBeats;
      _soundEngine.play();
      userOnTick();

      String nextSound = _beats[(_currBeat + 1) % numBeats].subDivisions[0];
      _soundEngine.changeSound(nextSound);
    };
  }

  Future<void> play() async {
    await _validateEngineReadiness();
    await _metronomeEngine.play(_bpm);
  }

  Future<void> stop() async {
    await _validateEngineReadiness();
    await _metronomeEngine.stop();
    _currBeat = -1;
  }

  Future<void> changeSound(String fileName) async {
    await _validateEngineReadiness();
    await _soundEngine.changeSound(fileName);
  }

  bool isPlaying() {
    return _metronomeEngine.isPlaying();
  }

  Future<void> _validateEngineReadiness() async {
    if (!_metronomeEngine.isReady()) {
      await _metronomeEngine.init();
    }

    if (!_soundEngine.isReady()) {
      await _soundEngine.init();
    }
  }

  List<Beat> get beats => _beats;

  int get currBeat => _currBeat;

  double get bpm => _bpm;

  set bpm(double bpm) {
    if (bpm > 10) {
      _bpm = bpm;

      if (isPlaying()) {
        _metronomeEngine.play(_bpm);
      }

      debugPrint("new bpm $_bpm");
    } else {
      debugPrint("Invalid param for bpm: $bpm");
    }
  }

  int get numBeats => _beats.length;

  set numBeats(int numBeats) {
    if (numBeats > 0 && numBeats <= 16) {
      // _currBeat = _currBeat - (_numBeats - numBeats);
      int numBeatsToAdd = numBeats - _beats.length;

      for (int i = 0; i < numBeatsToAdd; i++) {
        _beats.add(Beat());
      }

      if (numBeatsToAdd < 0) {
        _beats = _beats.sublist(0, _beats.length + numBeatsToAdd);

        // If we are currently playing beats, we need to adjust this value to prevent premature wrapping to or past the beginning of the meter.
        // This will only happen if we remove beats
        if (_currBeat >= _beats.length) {
          _currBeat = _beats.length - 1;
        }
      }

      if (_currBeat != -1) {
        String nextSound = _beats[(_currBeat + 1) % numBeats].subDivisions[0];
        _soundEngine.changeSound(nextSound);
      }
    } else {
      debugPrint("Invalid param for num beats: $numBeats");
    }
  }

  void toggleBeat(int index) {
    if (index >= numBeats) {
      debugPrint("Attempted to access index greater than numBeats");
      return;
    }

    _beats[index].subDivisions[0] =
        _beats[index].subDivisions[0] == SoundFile.jamBlockHi
        ? SoundFile.clave808
        : SoundFile.jamBlockHi;

    if (_currBeat == index - 1) {
      String nextSound = _beats[index].subDivisions[0];
      _soundEngine.changeSound(nextSound);
    }
  }
}
