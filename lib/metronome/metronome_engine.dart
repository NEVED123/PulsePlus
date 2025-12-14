import 'dart:async';
import 'dart:isolate';
import 'package:pulseplus/metronome/engine_message.dart';

class MetronomeEngine {
  late SendPort _sendPort;
  final Completer<void> _isolateReady = Completer.sync();
  late Completer<void> _stateChangeCompleter;
  static Timer? _timerref;
  late Function _onTick;
  Function(String)? _onError;
  bool _isPlaying = false;

  MetronomeEngine(Function onTick, Function(String)? onError) {
    _onTick = onTick;
    _onError = onError;
  }

  // ============================================================================
  // MAIN ISOLATE FUNCTIONS
  // ============================================================================

  Future<void> init() async {
    ReceivePort receivePort = ReceivePort();
    receivePort.listen(_handleResponsesFromIsolate);
    await Isolate.spawn(_startRemoteIsolate, receivePort.sendPort);
  }

  Future<void> close() {
    Isolate.exit(_sendPort);
  }

  bool isReady() {
    return _isolateReady.isCompleted;
  }

  bool isPlaying() {
    return _isPlaying;
  }

  Future<void> sendMessage(EngineMessage message) async {
    await _isolateReady.future;
    _sendPort.send(message);
  }

  Future<void> play(int bpm) {
    _stateChangeCompleter = Completer();

    sendMessage(
      EngineMessage(type: EngineMessageType.play, body: {"bpm": bpm}),
    );

    return _stateChangeCompleter.future;
  }

  Future<void> stop() {
    _stateChangeCompleter = Completer();

    sendMessage(EngineMessage(type: EngineMessageType.stop));

    return _stateChangeCompleter.future;
  }

  void _handleResponsesFromIsolate(dynamic message) {
    if (message is SendPort) {
      _sendPort = message;
      _isolateReady.complete();
      return;
    }

    if (message is EngineMessage) {
      switch (message.type) {
        case EngineMessageType.pulse:
          _handlePulseMessage(_onTick);
          break;
        case EngineMessageType.error:
          _handleErrorMessage(_onError, message);
          break;
        case EngineMessageType.started:
          _handleStartedMessage();
          break;
        case EngineMessageType.stopped:
          _handleStoppedMessage();
          break;
        default:
          _handleErrorMessage(
            _onError,
            EngineMessage(
              type: EngineMessageType.error,
              body: {
                "message":
                    "Got unimplemented message type from receive port $message",
              },
            ),
          );
      }
      return;
    }

    _handleErrorMessage(
      _onError,
      EngineMessage(
        type: EngineMessageType.error,
        body: {"message": "Got non-message object from send port $message"},
      ),
    );
  }

  void _handleStartedMessage() {
    _isPlaying = true;
    _stateChangeCompleter.complete();
  }

  void _handleStoppedMessage() {
    _isPlaying = false;
    _stateChangeCompleter.complete();
  }

  static _handlePulseMessage(Function onTick) {
    onTick();
  }

  static _handleErrorMessage(Function(String)? onError, EngineMessage message) {
    if (onError != null) {
      onError(message.body["message"]);
    }
  }

  // ============================================================================
  // REMOTE ISOLATE FUNCTIONS
  // ============================================================================

  static void _startRemoteIsolate(SendPort port) {
    final receivePort = ReceivePort();
    port.send(receivePort.sendPort);

    receivePort.listen((dynamic message) async {
      try {
        if (message is EngineMessage) {
          switch (message.type) {
            case EngineMessageType.stop:
              _handleStopMessage(port);
              break;
            case EngineMessageType.play:
              _handlePlayMessage(port, message);
              break;
            case EngineMessageType.started:
            default:
              port.send(
                EngineMessage(
                  type: EngineMessageType.error,
                  body: {
                    "message":
                        "Got unimplemented message from send port $message",
                  },
                ),
              );
          }
        } else {
          port.send(
            EngineMessage(
              type: EngineMessageType.error,
              body: {
                "message": "Got non-message object from send port $message",
              },
            ),
          );
        }
      } catch (e) {
        port.send(
          EngineMessage(
            type: EngineMessageType.error,
            body: {
              "message":
                  "Got exception while handling message from send port ${e.toString()}",
            },
          ),
        );
      }
    });
  }

  static void _handleStopMessage(SendPort port) {
    if (_timerref != null) {
      _timerref!.cancel();
    }

    port.send(EngineMessage(type: EngineMessageType.stopped));
  }

  static void _handlePlayMessage(SendPort port, EngineMessage message) {
    int bpm = message.body["bpm"];

    if (_timerref != null) {
      _timerref!.cancel();
    }

    // The first pulse is delayed by the duration of the timer, so we send one immediately
    port.send(EngineMessage(type: EngineMessageType.pulse));

    _timerref = Timer.periodic(Duration(microseconds: _bpmToMicros(bpm)), (_) {
      port.send(EngineMessage(type: EngineMessageType.pulse));
    });

    port.send(EngineMessage(type: EngineMessageType.started));
  }

  static int _bpmToMicros(int bpm) {
    // [(x beats / 1 minute) * (1 minute / 60 seconds) * (1 second / 1000000 micros)]^-1
    return 60000000 ~/ bpm;
  }
}
