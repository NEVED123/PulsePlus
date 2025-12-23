//
//  Sound.swift
//  Swift App
//
//  Created by Deven Mallamo on 12/6/25.
//

import SwiftUI
import AVFoundation

class SoundEngine {
    
    private var audioEngine : AVAudioEngine
    private var playerNode: AVAudioPlayerNode
    private var audioFile: AVAudioFile?
    
    private var audioFileMap: [String: AVAudioFile]
    private var currentAudioFile: AVAudioFile?
    
    init(fileName: String) throws {
        do {
            
            guard let clave808 = Bundle.main.url(forResource: "clave808", withExtension: "wav") else {
                throw SoundError.audioFileNotFound
            }
            
            let clave808AUdioFile = try AVAudioFile(forReading: clave808)
            
            guard let jam_block_hi = Bundle.main.url(forResource: "jam_block_hi", withExtension: "wav") else {
                throw SoundError.audioFileNotFound
            }
            
            let jam_block_hi_AudioFIle = try AVAudioFile(forReading: jam_block_hi)
            
            audioFileMap = [
                "clave808": clave808AUdioFile,
                "jam_block_hi": jam_block_hi_AudioFIle
            ]
            
            currentAudioFile = audioFileMap[fileName]
            
            playerNode = AVAudioPlayerNode()
            audioEngine = AVAudioEngine()
    
            audioEngine.attach(playerNode)
            audioEngine.connect(playerNode,
                                to: audioEngine.outputNode,
                                format: currentAudioFile!.processingFormat)
            
            print("Audio Engine setup completed!")
        } catch let error {
            print("initSound threw error: \(error)")
            throw SoundError.initFailed
        }
    }
    
    func changeSound(fileName: String) {
        currentAudioFile = audioFileMap[fileName]
    }
    
    func playSound() throws {
        do {
            playerNode.scheduleFile(currentAudioFile!,
                                    at: nil,
                                    completionCallbackType: .dataPlayedBack)
          try audioEngine.start()
          playerNode.play()
        } catch let error {
            print("playSound threw error: \(error)")
            throw SoundError.playFailed
        }
    }
}
