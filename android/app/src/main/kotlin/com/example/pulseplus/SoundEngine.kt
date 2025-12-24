package com.example.pulseplus

import android.content.Context
import android.media.MediaPlayer

class SoundEngine(private val context: Context, fileName: String) {

    private val audioFileMap = mutableMapOf<String, MediaPlayer>()
    private var currAudioFile: String

    init {
        audioFileMap["clave808"] = MediaPlayer.create(context, R.raw.clave808)
        audioFileMap["jam_block_hi"] = MediaPlayer.create(context, R.raw.jam_block_hi)
        currAudioFile = fileName
    }

    fun changeSound(fileName: String) {
        currAudioFile = fileName
    }

    fun playSound() {
        audioFileMap[currAudioFile]!!.start()
    }
}