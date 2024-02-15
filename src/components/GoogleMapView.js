import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch,useSelector } from 'react-redux';
import { CurrentLocation } from "../contexts/CurrentUserLocation";

export default function GoogleMapView({placeList}) {
  const [mapRegion, setmapRegion] = useState([]);


  const dispatch = useDispatch()

  const myLocation = useSelector((state) => console.log(state.location.myLocation))
  const mapMarker = useSelector((state) => console.log(state.marker.mapMarker))
  const coordinate = useSelector((state) => console.log(state.autoComplete.autoComplete))
 

  return (
    <View style={{ zIndex: 0, marginTop: 20, borderTopEndRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 20, fontWeight: 'bold' }}>Search branch</Text>
        <View style={{ borderTopEndRadius: 20 }}>
        <MapView 
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}
            style={{ borderTopEndRadius: 20, marginTop: 7, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * .72  }}>
        </MapView>

            
        </View>
    </View>
  );
}