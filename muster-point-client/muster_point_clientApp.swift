//
//  muster_point_clientApp.swift
//  muster-point-client
//
//  Created by Rocha Silva, Fernando on 2021-05-08.
//

import SwiftUI

import Amplify
import AmplifyPlugins

@main
struct muster_point_clientApp: App {
    
    @ObservedObject var auth = AuthService()
    @UIApplicationDelegateAdaptor private var appDelegate: AppDelegate
    
    init () {
        configureAmplify()
        
        auth.checkSessionStatus()
        auth.observeAuthEvents()
    }
    
    var body: some Scene {
        WindowGroup {
            if auth.isSignedIn {
                SessionView().environmentObject(auth)
            } else {
                SignInView().environmentObject(auth)
            }
        }
    }
    
    func configureAmplify(){
        do {
            try Amplify.add(plugin: AWSCognitoAuthPlugin())
            try Amplify.configure()
            print("Amplify configured")
        } catch {
            print("Failed to initialize Amplify with \(error)")
        }
    }
    
}

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        

        return true
    }
}
