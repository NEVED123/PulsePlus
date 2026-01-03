import 'package:flutter/services.dart';

class PitchEngine {
  static const platform = MethodChannel('us.pulsepl/pitch');
  bool _isReady = false;

  bool isReady() {
    return _isReady;
  }

  Future<void> init([String fileName = "clave808"]) async {
    await platform.invokeMethod<bool>('init', {"fileName": fileName});
    _isReady = true;
  }
}
