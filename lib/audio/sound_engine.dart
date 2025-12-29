import 'package:flutter/services.dart';
import 'package:pulseplus/audio/sound_files.dart';

class SoundEngine {
  static const platform = MethodChannel('us.pulsepl/engine');
  bool _isReady = false;
  late String currentSound;

  bool isReady() {
    return _isReady;
  }

  Future<void> init([String fileName = "clave808"]) async {
    await platform.invokeMethod<bool>('init', {"fileName": fileName});
    _isReady = true;
    currentSound = fileName;
  }

  Future<void> changeSound(int soundId) async {
    currentSound = SoundFile.allSounds[soundId];

    if (currentSound == SoundFile.silence) return;

    await platform.invokeMethod<bool>('changeSound', {
      "fileName": SoundFile.allSounds[soundId],
    });
  }

  Future<void> play() async {
    if (currentSound == SoundFile.silence) return;
    await platform.invokeMethod('play');
  }
}
