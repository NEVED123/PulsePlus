import 'package:pulseplus/metronome/engine_message.dart';
import 'package:pulseplus/metronome/metronome_engine.dart';

class MetronomeOrchestrator {
  late MetronomeEngine _engine;
  late int bpm;

  MetronomeOrchestrator(Function onTick, Function(String)? onError) {
    _engine = MetronomeEngine(onTick, onError);
  }

  Future<void> play(bpm) async {
    await _validateEngineReadiness();

    await _engine.sendMessage(
      EngineMessage(type: EngineMessageType.play, body: {"bpm": bpm}),
    );
  }

  Future<void> stop() async {
    await _validateEngineReadiness();

    await _engine.sendMessage(EngineMessage(type: EngineMessageType.stop));
  }

  bool isPlaying() {
    return _engine.isPlaying();
  }

  Future<void> _validateEngineReadiness() async {
    if (!_engine.isReady()) {
      await _engine.init();
    }
  }
}
