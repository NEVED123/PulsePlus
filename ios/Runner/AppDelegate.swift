import Flutter
import UIKit

@main
@objc class AppDelegate: FlutterAppDelegate {
    
  var soundEngine: SoundEngine?

  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

    let controller : FlutterViewController = window?.rootViewController as! FlutterViewController
    let audioChannel = FlutterMethodChannel(name: "us.pulsepl/engine",
                                              binaryMessenger: controller.binaryMessenger)
    
    audioChannel.setMethodCallHandler({
        [weak self] (call: FlutterMethodCall, result: FlutterResult) -> Void in
        // This method is invoked on the UI thread.
        if call.method == "init" {
            
            guard let args = call.arguments as? [String: Any],
                  let fileName = args["fileName"] as? String else {
                result(FlutterError(code: "INVALID_ARGUMENT",
                    message: "Expected map with 'fileName' (String)",
                    details: nil))
                return
            }
            
            do {
                try self?.soundEngine = SoundEngine(fileName: fileName)
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

    GeneratedPluginRegistrant.register(with: self)
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}


