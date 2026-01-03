import Flutter
import UIKit

@main
@objc class AppDelegate: FlutterAppDelegate {
    
    var soundEngine: SoundEngine?
    var pitchEngine: PitchEngine?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    let audioChannel = FlutterMethodChannel(name: "us.pulsepl/engine",
                                              binaryMessenger: controller.binaryMessenger)
        
    let pitchChannel = FlutterMethodChannel(name: "us.pulsepl/pitch",
                                                  binaryMessenger: controller.binaryMessenger)
    
    audioChannel.setMethodCallHandler({
        [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
        // This method is invoked on the UI thread.
        if call.method == "init" {
            guard let args = call.arguments as? [String: Any],
                  let filename = args["fileName"] as? String else {
                result(FlutterError(code: "INVALID_ARGUMENT",
                                    message: "Expected map with 'filename' (String)",
                                    details: nil))
                return
            }
            
            do {
                try self?.soundEngine = SoundEngine(fileName: filename)
            } catch let error {
                result(FlutterError(code: "\(error)",
                                    message: "\(error)",
                                    details: nil))
                return
            }
                
            result(true)
            return
        }
        
        if call.method == "changeSound" {
            guard let args = call.arguments as? [String: Any],
                  let fileName = args["fileName"] as? String else {
                result(FlutterError(code: "INVALID_ARGUMENT",
                    message: "Expected map with 'fileName' (String)",
                    details: nil))
                return
            }
            
            self?.soundEngine?.changeSound(fileName: fileName)
            result(true)
            return
        }
        
        if call.method == "play" {
            do {
                try self?.soundEngine?.playSound()
                result(true)
            } catch let error {
                result(FlutterError(code: "\(error)",
                                    message: "\(error)",
                                    details: nil))
            }
            
            result(true)
            return
        }
        
        result(FlutterMethodNotImplemented)
        return
    })
        
    pitchChannel.setMethodCallHandler({
        [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
    
        if call.method == "init" {
            
            do {
                try self?.pitchEngine = PitchEngine()
            } catch let error {
                result(FlutterError(code: "\(error)",
                                    message: "\(error)",
                                    details: nil))
                return
            }
                
            result(true)
            return
        }
        
    })

    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}


