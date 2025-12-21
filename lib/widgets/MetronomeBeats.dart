import 'package:flutter/material.dart';

class MetronomeBeats extends StatefulWidget {
  final int numBeats;
  final int currBeat;

  const MetronomeBeats({
    super.key,
    required this.numBeats,
    required this.currBeat,
  });

  @override
  State<MetronomeBeats> createState() => MetronomeBeatsState();
}

class MetronomeBeatsState extends State<MetronomeBeats> {
  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: BoxConstraints(minHeight: 100, maxHeight: 100),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        spacing: 10,
        children: _buildMetronomeBeats(),
      ),
    );
  }

  List<Widget> _buildMetronomeBeats() {
    List<Widget> beats = [];
    for (int i = 0; i < widget.numBeats; i++) {
      beats.add(
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              color: i == widget.currBeat
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).colorScheme.secondary,
            ),
          ),
        ),
      );
    }

    return beats;
  }
}
