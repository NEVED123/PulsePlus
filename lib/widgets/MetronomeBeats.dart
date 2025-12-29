import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_files.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';

class MetronomeBeats extends StatefulWidget {
  final MetronomeOrchestrator orchestrator;

  const MetronomeBeats({super.key, required this.orchestrator});

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
    for (int i = 0; i < widget.orchestrator.numBeats; i++) {
      beatWidgets.add(
        Expanded(
          child: Column(spacing: 5, children: _buildSubdivisionBeats(i)),
        ),
      );
    }

    return beatWidgets;
  }

  List<Widget> _buildSubdivisionBeats(int beatIndex) {
    List<Widget> beatSubdivisions = [];
    for (int i = 0; i < widget.orchestrator.numSubdivisions; i++) {
      beatSubdivisions.add(
        Expanded(
          child: GestureDetector(
            key: Key(i.toString()),
            onTap: () {
              setState(() {
                widget.orchestrator.toggleBeat(beatIndex, i);
              });
            },
            child: Container(
              decoration: BoxDecoration(
                color:
                    beatIndex == widget.orchestrator.currBeat &&
                        i == widget.orchestrator.currSubdivision
                    ? Theme.of(context).colorScheme.primary
                    : _getBeatColor(
                        widget.orchestrator.beats[beatIndex].subDivisions[i],
                      ),
              ),
            ),
          ),
        ),
      );
    }

    return beatSubdivisions;
  }

  Color _getBeatColor(int soundId) {
    switch (soundId) {
      case 0:
        return Theme.of(context).colorScheme.secondary;
      case 1:
        return Theme.of(context).colorScheme.tertiary;
      case 2:
        return Theme.of(context).colorScheme.primary.withAlpha(128);
      default:
        return Color.fromARGB(11, 255, 0, 242);
    }
  }
}
