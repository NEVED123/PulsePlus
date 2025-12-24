package com.example.pulseplus

import android.content.Context
import android.media.MediaPlayer

class SoundEngine(private val context: Context, fileName: String) {

    private var mediaPlayer: MediaPlayer
    private val audioFileMap: Map<String, Int> = mapOf(
        "clave808" to R.raw.clave808,
        "jam_block_hi" to R.raw.jam_block_hi
    )

    init {
        mediaPlayer = MediaPlayer.create(context, audioFileMap[fileName]!!)
    }

    fun changeSound(fileName: String) {
        mediaPlayer = MediaPlayer.create(context, audioFileMap[fileName]!!)
    }

    fun playSound() {
        mediaPlayer.start()
    }
}