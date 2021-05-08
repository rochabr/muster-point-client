//
//  AuthService.swift
//  muster-point-client
//
//  Created by Rocha Silva, Fernando on 2021-05-08.
//

import Foundation
import Amplify

class AuthService: ObservableObject {
    @Published var isSignedIn = false
    
    func checkSessionStatus(){
        _ = Amplify.Auth.fetchAuthSession { [weak self] result in
            switch result {
            case .success(let session):
                print(session)
                DispatchQueue.main.async {
                    self?.isSignedIn = session.isSignedIn
                }
                
            case .failure(let error):
                print(error)
            }
        }
    }
        
    private var window: UIWindow {
        guard
            let scene = UIApplication.shared.connectedScenes.first,
            let windowSceneDelegate = scene.delegate as? UIWindowSceneDelegate,
            let window = windowSceneDelegate.window as? UIWindow
        else { return UIWindow() }
        
        return window
    }

    func signInWithWebUI() {
        _ = Amplify.Auth.signInWithWebUI(presentationAnchor: window) { result in
            switch result {
            case .success:
                print("Signed in")
            case .failure(let error):
                print("Sign in failed \(error)")
            }
        }
    }
    
    func signOut() {
        _ = Amplify.Auth.signOut() { result in
            switch result {
            case .success:
                print("Signed out")
            case .failure(let error):
                print("Sign out failed \(error)")
            }
        }
    }
    
    func observeAuthEvents() {
        _ = Amplify.Hub.listen(to: .auth) { [weak self] result in
            switch result.eventName {
            case HubPayload.EventName.Auth.signedIn:
                DispatchQueue.main.async {
                    self?.isSignedIn = true
                }
                
            case HubPayload.EventName.Auth.signedOut:
                DispatchQueue.main.async {
                    self?.isSignedIn = false
                }
                
            default:
                break
            }
        }
    }
}
