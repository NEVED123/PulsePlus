class EngineMessage {
  final EngineMessageType type;
  dynamic body;

  EngineMessage({required this.type, this.body});

  @override
  String toString() => 'EngineMessage(type: $type, body: $body)';
}

enum EngineMessageType { play, stop, error, pulse }
