import 'package:flutter/services.dart';

class SoundEngine {
  static const platform = MethodChannel('us.pulsepl/engine');
  bool _isReady = false;

  bool isReady() {
    return _isReady;
  }

  Future<Function> init([String fileName = "jam_block_hi"]) async {
    await platform.invokeMethod<bool>('init', {"fileName": fileName});
    _isReady = true;
    return () {
      platform.invokeMethod('play');
    };
  }

  Future<void> changeSound(String fileName) async {
    await platform.invokeMethod<bool>('changeSound', {"fileName": fileName});
  }
}
