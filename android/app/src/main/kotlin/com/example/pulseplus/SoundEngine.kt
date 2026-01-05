package com.example.pulseplus

import android.content.Context
import android.media.AudioAttributes
import android.media.SoundPool
import android.util.Log

class SoundEngine(private val context: Context, fileName: String) {

    private val audioRawMap: Map<String, Int> = mapOf(
        "clave808" to R.raw.clave808,
        "jam_block_hi" to R.raw.jam_block_hi,
        "epiano_wurli_c3"  to R.raw.epiano_wurli_c3,
        "epiano_wurli_db3" to R.raw.epiano_wurli_db3,
        "epiano_wurli_d3"  to R.raw.epiano_wurli_d3,
        "epiano_wurli_eb3" to R.raw.epiano_wurli_eb3,
        "epiano_wurli_e3"  to R.raw.epiano_wurli_e3,
        "epiano_wurli_f3"  to R.raw.epiano_wurli_f3,
        "epiano_wurli_gb3" to R.raw.epiano_wurli_gb3,
        "epiano_wurli_g3"  to R.raw.epiano_wurli_g3,
        "epiano_wurli_ab3" to R.raw.epiano_wurli_ab3,
        "epiano_wurli_a3"  to R.raw.epiano_wurli_a3,
        "epiano_wurli_bb3" to R.raw.epiano_wurli_bb3,
        "epiano_wurli_b3"  to R.raw.epiano_wurli_b3,
    )

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