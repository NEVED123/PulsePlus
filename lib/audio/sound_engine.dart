import 'package:flutter/services.dart';

class SoundEngine {
  static const platform = MethodChannel('us.pulsepl/engine');

  Future<Function> init() async {
    await platform.invokeMethod<bool>('init');
    return () {
      platform.invokeMethod('play');
    };
  }
}
