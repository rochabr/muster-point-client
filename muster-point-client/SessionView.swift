//
//  SessionView.swift
//  muster-point-client
//
//  Created by Rocha Silva, Fernando on 2021-05-08.
//

import SwiftUI
import Amplify

struct SessionView: View {
    
    @EnvironmentObject var auth: AuthService
    
    var body: some View {
        VStack{
            Spacer()
            Text("Hello, \(Amplify.Auth.getCurrentUser()?.username ?? "")")
            Spacer()
            Button("Sign Out", action: auth.signOut)
        }
    }
}

struct SessionView_Previews: PreviewProvider {
    static var previews: some View {
        SessionView()
    }
}
