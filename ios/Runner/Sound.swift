//
//  Sound.swift
//  Swift App
//
//  Created by Deven Mallamo on 12/6/25.
//

import SwiftUI
import AVFoundation

class SoundEngine {
    
    private var engine = AVAudioEngine()
    private var players: [String: AVAudioPlayerNode] = [:]
    private var buffers: [String: AVAudioPCMBuffer] = [:]

    private var currentAudioFile: String
    
    init(fileName: String) throws {
        do {
            let session = AVAudioSession.sharedInstance()
            try session.setCategory(.playback, options: [.mixWithOthers])
            try session.setPreferredIOBufferDuration(0.0029)
            try session.setPreferredSampleRate(44100)
            try session.setActive(true)
            
            for name in ["clave808", "jam_block_hi"] {
                let url = Bundle.main.url(forResource: name, withExtension: "wav")!
                let file = try AVAudioFile(forReading: url)

                let buffer = AVAudioPCMBuffer(
                    pcmFormat: file.processingFormat,
                    frameCapacity: AVAudioFrameCount(file.length)
                )!
                try file.read(into: buffer)

                let player = AVAudioPlayerNode()
                engine.attach(player)
                engine.connect(player, to: engine.mainMixerNode, format: buffer.format)

                buffers[name] = buffer
                players[name] = player
            }

            try engine.start()

            for player in players.values {
                player.play()
            }

            currentAudioFile = fileName
            
            print("Audio Engine setup completed!")
        } catch let error {
            print("initSound threw error: \(error)")
            throw SoundError.initFailed
        }
    }
    
    func changeSound(fileName: String) {
        currentAudioFile = fileName
    }
    
    func playSound() throws {
        guard let buffer = buffers[currentAudioFile],
              let player = players[currentAudioFile] else { return }

        player.scheduleBuffer(buffer, at: nil, options: .interrupts)
    }
}
