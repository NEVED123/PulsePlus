import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_engine.dart';

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
          onPressed: () => debugPrint("Init Sound Not Implemented Yet"),
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
                      onTap: () => debugPrint(
                        ["C", "D", "E", "F", "G", "A", "B"][i].toString(),
                      ),
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
                          onTap: () => debugPrint(
                            [
                              "C#/Db",
                              "D#/Eb",
                              null,
                              "F#/Gb",
                              "G#/Ab",
                              "A#/Bb",
                            ][i].toString(),
                          ),
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
}
