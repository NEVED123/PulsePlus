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
  int _currBeat = -1;
  int _currSubdivision = -1;
  late List<Beat> _beats;

  MetronomeOrchestrator(
    SoundEngine soundEngine,
    Function onTick,
    Function(String)? onError,
    double initBpm,
    int initNumBeats,
  ) {
    _metronomeEngine = MetronomeEngine(
      _createOrchestratorOnTickCallback(onTick),
      onError,
    );
    _soundEngine = soundEngine;
    _bpm = initBpm;

    _beats = [
      Beat(subDivisions: [1, 0, 0, 0]),
    ];

    for (int i = 0; i < initNumBeats - 1; i++) {
      _beats.add(Beat());
    }
  }

  Function _createOrchestratorOnTickCallback(Function userOnTick) {
    return () {
      // We need to track how many beats have elapsed - once we hit numBeats % beatsElapsed == 0, we are at the starting beat.
      // This means that if we want to switch to a different sound on the downbeat, we need to do so after the last beat currBeat = numBeats - 1
      _currSubdivision = (_currSubdivision + 1) % numSubdivisions;
      if (_currSubdivision == 0) {
        _currBeat = (_currBeat + 1) % numBeats;
      }
      _soundEngine.play();
      _setNextSound();
      userOnTick();
    };
  }

  Future<void> play() async {
    await _validateEngineReadiness();
    await _metronomeEngine.play(_bpm * numSubdivisions);
  }

  Future<void> stop() async {
    await _validateEngineReadiness();
    await _metronomeEngine.stop();
    _currBeat = -1;
    _currSubdivision = -1;
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

    await _setNextSound();
  }

  List<Beat> get beats => _beats;

  int get currBeat => _currBeat;

  int get currSubdivision => _currSubdivision;

  double get bpm => _bpm;

  set bpm(double bpm) {
    if (bpm > 10) {
      _bpm = bpm;

      if (isPlaying()) {
        _metronomeEngine.play(_bpm * numSubdivisions);
      }

      debugPrint("new bpm $_bpm");
    } else {
      debugPrint("Invalid param for bpm: $bpm");
    }
  }

  int get numBeats => _beats.length;

  set numBeats(int newNumBeats) {
    if (newNumBeats > 0 && newNumBeats <= 16) {
      int oldNumBeats = numBeats;
      int numBeatsToAdd = newNumBeats - oldNumBeats;

      if (numBeatsToAdd > 0) {
        for (int i = 0; i < numBeatsToAdd; i++) {
          _beats.add(
            Beat(subDivisions: List.filled(numSubdivisions, 0, growable: true)),
          );
        }
      }

      if (numBeatsToAdd < 0) {
        _beats = _beats.sublist(0, _beats.length + numBeatsToAdd);

        // If we are currently playing beats, we need to adjust this value to prevent premature wrapping to or past the beginning of the meter.
        // This will only happen if we remove beats
        if (_currBeat >= newNumBeats) {
          _currBeat = newNumBeats - 1;
        }
      }

      if (_currBeat != -1) {
        _setNextSound();
      }
    } else {
      debugPrint("Invalid param for num beats: $newNumBeats");
    }
  }

  int get numSubdivisions => _beats[0].subDivisions.length;

  set numSubdivisions(int newNumSubdivisions) {
    if (newNumSubdivisions > 0 && newNumSubdivisions <= 6) {
      int oldNumSubdivisions = numSubdivisions;
      int numSubdivisionsToAdd = newNumSubdivisions - oldNumSubdivisions;

      for (int i = 0; i < _beats.length; i++) {
        if (numSubdivisionsToAdd > 0) {
          for (int j = 0; j < numSubdivisionsToAdd; j++) {
            _beats[i].subDivisions.add(0);
          }
        }

        if (numSubdivisionsToAdd < 0) {
          _beats[i].subDivisions = _beats[i].subDivisions.sublist(
            0,
            oldNumSubdivisions + numSubdivisionsToAdd,
          );
        }
      }

      if (_currSubdivision >= newNumSubdivisions) {
        _currSubdivision = newNumSubdivisions - 1;
      }

      if (_currSubdivision != -1) {
        _setNextSound();
        _metronomeEngine.play(_bpm * newNumSubdivisions);
      }
    } else {
      debugPrint("Invalid param for num subdivisions: $newNumSubdivisions");
    }
  }

  void toggleBeat(int beatIndex, int subDivisionIndex) {
    if (beatIndex >= numBeats) {
      debugPrint("Attempted to access index greater than numBeats");
      return;
    }

    if (subDivisionIndex >= numSubdivisions) {
      debugPrint("Attempted to access index greater than currSubdivisions");
      return;
    }

    int currBeatId = _beats[beatIndex].subDivisions[subDivisionIndex];
    _beats[beatIndex].subDivisions[subDivisionIndex] =
        (currBeatId + 1) % SoundFile.allSounds.length;

    _setNextSound();
  }

  Future<void> _setNextSound() async {
    int nextSound;

    if (_currBeat == -1 || _currSubdivision == -1) {
      nextSound = _beats[0].subDivisions[0];
    } else {
      int nextSubdivision = (_currSubdivision + 1) % numSubdivisions;
      nextSound = nextSubdivision == 0
          ? _beats[(_currBeat + 1) % numBeats].subDivisions[0]
          : _beats[_currBeat].subDivisions[nextSubdivision];
    }

    await _soundEngine.changeSound(nextSound);
  }
}
