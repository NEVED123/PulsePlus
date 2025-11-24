import 'dart:async';
import 'dart:isolate';

import 'package:pulseplus/metronome/engine_message.dart';

class MetronomeEngine {
  late SendPort _sendPort;
  final Completer<void> _isolateReady = Completer.sync();
  static Timer? _timerref;
  late Function _onTick;
  Function(String)? _onError;

  MetronomeEngine(Function onTick, Function(String)? onError) {
    _onTick = onTick;
    _onError = onError;
  }

  Future<void> init() async {
    ReceivePort receivePort = ReceivePort();
    receivePort.listen(_handleResponsesFromIsolate);
    await Isolate.spawn(_startRemoteIsolate, receivePort.sendPort);
  }

  Future<void> close() {
    Isolate.exit(_sendPort);
  }

  void _handleResponsesFromIsolate(dynamic message) {
    if (message is SendPort) {
      _sendPort = message;
      _isolateReady.complete();
    } else if (message is EngineMessage) {
      switch (message.type) {
        case EngineMessageType.pulse:
          _handlePulseMessage(_onTick);
          break;
        case EngineMessageType.error:
          _handleErrorMessage(_onError, message);
          break;
        default:
          _handleErrorMessage(
            _onError,
            EngineMessage(
              type: EngineMessageType.error,
              body: {
                message: "Got non-message object from receive port $message",
              },
            ),
          );
      }
    } else {
      throw Exception("Got non-message object from receive port $message");
    }
  }

  // TODO: CHECK IF THIS DOESN'T NEED TO BE STATIC
  static void _startRemoteIsolate(SendPort port) {
    final receivePort = ReceivePort();
    port.send(receivePort.sendPort);

    receivePort.listen((dynamic message) async {
      if (message is EngineMessage) {
        switch (message.type) {
          case EngineMessageType.stop:
            _handleStopMessage();
            break;
          case EngineMessageType.play:
            _handlePlayMessage(port, message);
            break;
          default:
            port.send(
              EngineMessage(
                type: EngineMessageType.error,
                body: {
                  message: "Got unimplemented message type ${message.type}",
                },
              ),
            );
        }
      } else {
        port.send(
          EngineMessage(
            type: EngineMessageType.error,
            body: {message: "Got non-message object from send port $message"},
          ),
        );
      }
    });
  }

  static void _handleStopMessage() {
    if (_timerref != null) {
      _timerref!.cancel();
    }
  }

  static void _handlePlayMessage(SendPort port, EngineMessage message) {
    int bpm = message.body["bpm"];

    if (_timerref != null) {
      _timerref!.cancel();
    }
    _timerref = Timer.periodic(Duration(microseconds: _bpmToMicros(bpm)), (_) {
      port.send(EngineMessage(type: EngineMessageType.pulse));
    });
  }

  static void _handlePulseMessage(Function onTick) {
    onTick();
  }

  static void _handleErrorMessage(
    Function(String)? onError,
    EngineMessage message,
  ) {
    if (onError != null) {
      onError(message.body["message"]);
    }
  }

  Future<void> sendMessage(EngineMessage message) async {
    await _isolateReady.future;
    _sendPort.send(message);
  }

  bool isReady() {
    return _isolateReady.isCompleted;
  }

  static int _bpmToMicros(int bpm) {
    // [(x beats / 1 minute) * (1 minute / 60 seconds) * (1 second / 1000000 micros)]^-1
    return 60000000 ~/ bpm;
  }
}
