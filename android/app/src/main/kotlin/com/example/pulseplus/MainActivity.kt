package com.example.pulseplus

import androidx.annotation.NonNull
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.media.MediaPlayer

class MainActivity: FlutterActivity() {
    private val CHANNEL = "us.pulsepl/engine"

    private var mediaPlayer: MediaPlayer? = null

    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            // This method is invoked on the main thread.
                call, result ->
            if (call.method == "init") {
                mediaPlayer = MediaPlayer.create(this, R.raw.clave808)
                return@setMethodCallHandler result.success(true)
            }
            if (call.method == "play") {
                if (mediaPlayer == null) {
                    result.error("Not Initiated", "Not Initiated", null)
                }
                try {
                    mediaPlayer!!.start()
                } catch (e: Error) {
                    result.error(e.message ?: "No Message" , e.message, null)
                }
            } else {
                result.notImplemented()
            }
        }
    }
}
