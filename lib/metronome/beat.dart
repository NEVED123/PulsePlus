import 'package:flutter/material.dart';
import 'package:pulseplus/audio/sound_files.dart';

class Beat {
  Beat({List<int>? subDivisions}) {
    _subDivisions = subDivisions ?? List.filled(4, 0, growable: true);
  }

  List<int> _subDivisions = [];

  List<int> get subDivisions => _subDivisions;

  set subDivisions(List<int> subDivisions) {
    if (_subDivisions.isNotEmpty) {
      _subDivisions = subDivisions;
    } else {
      debugPrint("Cannot instantiate beat with no subdivisions");
    }
  }
}
