package com.example.pulseplus

import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.media.MediaPlayer

class MainActivity: FlutterActivity() {
    private val SOUND_CHANNEL = "us.pulsepl/engine"
    private val PITCH_CANNEL = "us.pulsepl/pitch"

    private var soundEngine: SoundEngine? = null
    private var pitchEngine: PitchEngine? = null

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, SOUND_CHANNEL).setMethodCallHandler {
            // This method is invoked on the main thread.
                call, result ->
            if (call.method == "init") {
                val fileName = call.argument<String>("fileName")
                soundEngine = SoundEngine(this, fileName!!)
                result.success(true)
                return@setMethodCallHandler
            }
            if (call.method == "play") {
                if (soundEngine == null) {
                    result.error("Not Initiated", "Not Initiated", null)
                    return@setMethodCallHandler
                }
                try {
                    soundEngine!!.playSound()
                    result.success(true)
                    return@setMethodCallHandler
                } catch (e: Error) {
                    result.error(e.message ?: "No Message" , e.message, null)
                    return@setMethodCallHandler
                }
            }
            if (call.method == "changeSound") {
                val fileName = call.argument<String>("fileName")
                soundEngine!!.changeSound(fileName!!)
                result.success(true)
                return@setMethodCallHandler
            }
            else {
                result.notImplemented()
            }
        }

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, PITCH_CANNEL).setMethodCallHandler {
            // This method is invoked on the main thread.
                call, result ->
            if (call.method == "init") {
                pitchEngine = PitchEngine()
                result.success(true)
                return@setMethodCallHandler
            }
            else {
                result.notImplemented()
            }
        }
    }
}
