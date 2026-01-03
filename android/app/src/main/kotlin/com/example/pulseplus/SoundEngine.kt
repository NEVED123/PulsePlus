package com.example.pulseplus

import android.content.Context
import android.media.AudioAttributes
import android.media.SoundPool
import android.util.Log

class SoundEngine(private val context: Context, fileName: String) {

    private val audioRawMap: Map<String, Int> = mapOf(
        "clave808" to R.raw.clave808,
        "jam_block_hi" to R.raw.jam_block_hi)

    private val soundPoolIdMap = mutableMapOf<String, Int>()
    private var currAudioFile: Int
    private var soundPool: SoundPool = SoundPool.Builder()
        .setAudioAttributes(AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .build())
        .setMaxStreams(100)
        .build()

    init {
        for ((key, value) in audioRawMap) {
            soundPoolIdMap[key] = soundPool.load(context, value, 1)
        }

        currAudioFile = soundPoolIdMap[fileName]!!
    }

    fun changeSound(fileName: String) {
        currAudioFile = soundPoolIdMap[fileName]!!
    }

    fun playSound() {
        soundPool.play(currAudioFile, 1F, 1F, 1, 0, 1F)
    }
}