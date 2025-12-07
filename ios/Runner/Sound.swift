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
    
    init() throws {
        do {
            playerNode = AVAudioPlayerNode()
            audioEngine = AVAudioEngine()
            
            guard let audioFileURL = Bundle.main.url(forResource: "Clave808", withExtension: "wav") else {
                throw SoundError.audioFileNotFound
            }
            
            audioFile = try AVAudioFile(forReading: audioFileURL)

            // Attach the player node to the audio engine.
            audioEngine.attach(playerNode)

            // Connect the player node to the output node.
            audioEngine.connect(playerNode,
                                to: audioEngine.outputNode,
                                format: audioFile!.processingFormat)
            

        
            print("Audio Engine setup completed!")
        } catch let error {
            print("initSound threw error: \(error)")
            throw SoundError.initFailed
        }
    }
    
    func playSound() throws {
        do {
            playerNode.scheduleFile(audioFile!,
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
