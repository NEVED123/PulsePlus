import 'package:flutter/services.dart';
import 'package:pulseplus/audio/sound_files.dart';

class SoundEngine {
  static const platform = MethodChannel('us.pulsepl/engine');
  bool _isReady = false;

  bool isReady() {
    return _isReady;
  }

  Future<void> init() async {
    await platform.invokeMethod<bool>('init');
    _isReady = true;
  }

  Future<void> play(String soundId) async {
    if (soundId == SoundFile.silence) return;
    await platform.invokeMethod('play', {"fileName": soundId});
  }
}
