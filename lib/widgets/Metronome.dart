import 'package:flutter/material.dart';
import 'package:pulseplus/metronome/metronome_orchestrator.dart';
import 'package:pulseplus/widgets/MetronomeBeats.dart';

class Metronome extends StatefulWidget {
  const Metronome({super.key, required this.orchestrator});

  final MetronomeOrchestrator orchestrator;

  @override
  State<Metronome> createState() => _MetronomeState();
}

class _MetronomeState extends State<Metronome> {
  late TextEditingController _bpmTextController;

  Future<void> _toggleMetronome() async {
    if (!widget.orchestrator.isPlaying()) {
      await widget.orchestrator.play();
    } else {
      await widget.orchestrator.stop();
    }
    setState(() {});
  }

  void _onTick() {
    setState(() {});
  }

  @override
  void dispose() {
    _bpmTextController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _bpmTextController = TextEditingController(
      text: widget.orchestrator.bpm.toString(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 10,
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Beats:",
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
            ),
            IconButton(
              icon: Icon(Icons.remove),
              enableFeedback: false,
              onPressed: () => setState(() {
                widget.orchestrator.numBeats = widget.orchestrator.numBeats - 1;
              }),
            ),
            Text(
              widget.orchestrator.numBeats.toString(),
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
            ),
            IconButton(
              icon: Icon(Icons.add),
              enableFeedback: false,
              onPressed: () => setState(() {
                widget.orchestrator.numBeats = widget.orchestrator.numBeats + 1;
              }),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Subdivisions:",
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
            ),
            IconButton(
              icon: Icon(Icons.remove),
              enableFeedback: false,
              onPressed: () => setState(() {
                widget.orchestrator.numSubdivisions =
                    widget.orchestrator.numSubdivisions - 1;
              }),
            ),
            Text(
              widget.orchestrator.numSubdivisions.toString(),
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
            ),
            IconButton(
              icon: Icon(Icons.add),
              enableFeedback: false,
              onPressed: () => setState(() {
                widget.orchestrator.numSubdivisions =
                    widget.orchestrator.numSubdivisions + 1;
              }),
            ),
          ],
        ),
        TextField(
          onSubmitted: (String newBpm) {
            try {
              widget.orchestrator.bpm = double.parse(newBpm);
            } on FormatException {
              debugPrint("new bpm must be a valid number, recieved $newBpm");
              _bpmTextController.text = widget.orchestrator.bpm.toString();
            } catch (e) {
              debugPrint("Got exception while changing bpm: ${e.toString()}");
            }
          },
          style: TextStyle(color: Theme.of(context).colorScheme.onSurface),
          keyboardType: TextInputType.number,
          textAlign: TextAlign.center,
          controller: _bpmTextController,
        ),
        MetronomeBeats(orchestrator: widget.orchestrator),
        IconButton(
          onPressed: _toggleMetronome,
          enableFeedback: false,
          icon: Icon(
            widget.orchestrator.isPlaying() ? Icons.pause : Icons.play_arrow,
          ),
        ),
      ],
    );
  }
}
