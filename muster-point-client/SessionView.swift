//
//  SessionView.swift
//  muster-point-client
//
//  Created by Rocha Silva, Fernando on 2021-05-08.
//

import SwiftUI
import Amplify
import MapKit

struct SessionView: View {
    
    @EnvironmentObject var auth: AuthService
    
    let locationManager = LocationManager()
    @ObservedObject var geofenceHandler = GeofenceHandler()
    
    @State private var centerCoordinate = CLLocationCoordinate2D()
    
    //@State private var region = MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 51.507222, longitude: -0.1275), span: MKCoordinateSpan(latitudeDelta: 0.5, longitudeDelta: 0.5))
    
    var body: some View {
        VStack{
            Spacer()
            //Map(coordinateRegion: $region, showsUserLocation: true, userTrackingMode: .constant(.follow))
            MapView(centerCoordinate: $centerCoordinate, overlays: geofenceHandler.overlays)
                    .edgesIgnoringSafeArea(.all)
            Spacer()
            Button("Sign Out", action: auth.signOut)
        }
    }
    
    init() {
        geofenceHandler.listGeofences()
    }

}

struct SessionView_Previews: PreviewProvider {
    static var previews: some View {
        SessionView()
    }
}
