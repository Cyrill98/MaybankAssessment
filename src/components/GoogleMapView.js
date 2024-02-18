import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch,useSelector } from 'react-redux';
import { CurrentLocation } from "../contexts/CurrentUserLocation";

export default function GoogleMapView({placeList}) {
  const mapRef = useRef(null);
  const dispatch = useDispatch()

  const myLocation = useSelector((state) => state.location.myLocation)
  const mapMarker = useSelector((state) => state.marker.mapMarker)
  const coordinate = useSelector((state) => state.autoComplete.autocomplete)

  return (
    <View style={{ zIndex: 0, marginTop: 20, overflow: 'hidden'  }}>
      <View style={{ marginLeft: 15}}>
        <Text style={{fontSize: 16, fontWeight: 'bold' }}>Search history</Text>
        {
          coordinate.country ?
          <Text>{coordinate?.name}, {coordinate?.country}</Text>
          : <Text style={{ marginLeft: 5 }}>No history</Text>
        }
      </View>
        <View style={{ borderTopLeftRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
          <MapView 
            // ref={mapRef.current.animateToRegion(myLocation)}
            ref={myLocation}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={{
              latitude: mapMarker?.latitude,
              longitude: mapMarker?.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
            style={{ borderTopLeftRadius: 50, marginTop: 7, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * .72  }}>
              {
          mapMarker.longitude ? <Marker
          coordinate={{
            latitude: parseFloat(mapMarker?.latitude),
            longitude: parseFloat(mapMarker?.longitude),
          }}
          />
          : null}
          </MapView>
        </View>
    </View>
  );
}