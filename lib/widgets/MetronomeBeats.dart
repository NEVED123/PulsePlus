import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_files.dart';
import 'package:pulseplus/metronome/beat.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';

class MetronomeBeats extends StatefulWidget {
  final List<Beat> beats;
  final int currBeat;
  final MetronomeOrchestrator orchestrator;

  const MetronomeBeats({
    super.key,
    required this.beats,
    required this.currBeat,
    required this.orchestrator,
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
    List<Widget> beatWidgets = [];
    for (int i = 0; i < widget.beats.length; i++) {
      beatWidgets.add(
        Expanded(
          child: GestureDetector(
            key: Key(i.toString()),
            onTap: () {
              setState(() {
                widget.orchestrator.toggleBeat(i);
              });
            },
            child: Container(
              decoration: BoxDecoration(
                color: i == widget.currBeat
                    ? Theme.of(context).colorScheme.primary
                    : _getBeatColor(widget.beats[i]),
              ),
            ),
          ),
        ),
      );
    }

    return beatWidgets;
  }

  Color _getBeatColor(Beat beat) {
    if (beat.subDivisions[0] == SoundFile.jamBlockHi) {
      return Theme.of(context).colorScheme.secondary;
    } else {
      return Theme.of(context).colorScheme.tertiary;
    }
  }
}
