import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_files.dart';

class Beat {
  Beat({List<String>? subDivisions}) {
    _subDivisions = subDivisions ?? [SoundFile.jamBlockHi];
  }

  List<String> _subDivisions = [];

  List<String> get subDivisions => _subDivisions;

  set subDivisions(List<String> subDivisions) {
    if (_subDivisions.isNotEmpty) {
      _subDivisions = subDivisions;
    } else {
      debugPrint("Cannot instantiate beat with no subdivisions");
    }
  }
}
