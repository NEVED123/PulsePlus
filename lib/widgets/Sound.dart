import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';
import 'package:pulseplus/audio/sound_files.dart';

class Sound extends StatefulWidget {
  const Sound({super.key, required this.soundEngine});

  final SoundEngine soundEngine;

  @override
  State<Sound> createState() => _SoundState();
}

class _SoundState extends State<Sound> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        TextButton(
          onPressed: () => {
            if (!widget.soundEngine.isReady()) {widget.soundEngine.init()},
          },
          child: Text("Init Sound"),
        ),
        _buildKeyboard(),
      ],
    );
  }

  Widget _buildKeyboard() {
    return Container(
      padding: EdgeInsets.all(10),
      constraints: BoxConstraints.tight(Size.fromHeight(150)),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.secondary,
        borderRadius: BorderRadius.circular(10),
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          int numWhiteKeys = 7;
          double whiteKeySpacing = 2;
          double whiteKeyWidth =
              (constraints.maxWidth / numWhiteKeys) - (whiteKeySpacing);

          int numBlackKeys = 6;
          double blackKeyWidth = whiteKeyWidth * (2 / 3);
          double blackKeySpacing =
              (whiteKeyWidth + whiteKeySpacing) - blackKeyWidth;

          double blackKeyContainerWidth =
              constraints.maxWidth - (blackKeyWidth * 2) - whiteKeySpacing;

          double blackKeyContainerHeight = constraints.maxHeight * (2 / 3);
          return Stack(
            children: [
              Row(
                spacing: whiteKeySpacing,
                children: List<Widget>.generate(
                  numWhiteKeys,
                  (i) => Container(
                    color: Color.fromARGB(255, 255, 255, 255),
                    constraints: BoxConstraints.tightFor(width: whiteKeyWidth),
                    child: GestureDetector(
                      onTapDown: (_) {
                        int pitchIndex = [0, 2, 4, 5, 7, 9, 11][i];
                        _playPianoPitch(pitchIndex);
                      },
                    ),
                  ),
                ),
              ),
              Align(
                alignment: Alignment.topCenter,
                child: Container(
                  constraints: BoxConstraints.tightFor(
                    width: blackKeyContainerWidth,
                    height: blackKeyContainerHeight,
                  ),
                  child: Row(
                    spacing: blackKeySpacing,
                    children: List<Widget>.generate(
                      numBlackKeys,
                      (i) => Container(
                        color: i != 2
                            ? Color.fromARGB(255, 0, 0, 0)
                            : Color.fromARGB(0, 0, 0, 0),
                        constraints: BoxConstraints.tightFor(
                          width: blackKeyWidth,
                        ),
                        child: GestureDetector(
                          onTapDown: (_) {
                            int? pitchIndex = [1, 3, null, 6, 8, 10][i];

                            if (pitchIndex != null) {
                              _playPianoPitch(pitchIndex);
                            }
                          },
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  void _playPianoPitch(int pitchIndex) {
    final List<String> epianoWurli3 = [
      SoundFile.epianoWurliC3,
      SoundFile.epianoWurliDb3,
      SoundFile.epianoWurliD3,
      SoundFile.epianoWurliEb3,
      SoundFile.epianoWurliE3,
      SoundFile.epianoWurliF3,
      SoundFile.epianoWurliGb3,
      SoundFile.epianoWurliG3,
      SoundFile.epianoWurliAb3,
      SoundFile.epianoWurliA3,
      SoundFile.epianoWurliBb3,
      SoundFile.epianoWurliB3,
    ];

    widget.soundEngine.changeSound(epianoWurli3[pitchIndex]);
    widget.soundEngine.play();
  }
}
