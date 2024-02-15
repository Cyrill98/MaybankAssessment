import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { CurrentLocation } from "../contexts/CurrentUserLocation";
// import { UserLocationContext } from "../../Context/UserLocationContext";
// import PlaceMarker from "./PlaceMarker";
// import Colors from "../../Shared/Colors";

export default function GoogleMapView({placeList}) {
  const [mapRegion, setmapRegion] = useState([]);
  const { location, setLocation } = useContext(CurrentLocation);

  console.log('location curr ->', location);

  useEffect(()=>{
    if(location)
    {
        setmapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
        })
    }
  },[location])
 

  return (
    // <View style={{ marginTop: 20 }}>
    //   <Text style={{ fontSize: 20, 
    //     marginBottom: 10, fontWeight: "600",fontFamily:'raleway-bold' }}>
    //     Top Near By Places
    //   </Text>
    //   <View style={{ borderRadius: 20, overflow: "hidden" }}>
    // {location?    <MapView
    //       style={{
    //         width: Dimensions.get("screen").width * 0.89,
    //         height: Dimensions.get("screen").height * 0.23,
    //       }}
    //       provider={PROVIDER_GOOGLE}
    //       showsUserLocation={true}
    //       region={mapRegion}
    //     >
    //         <Marker 
    //         title="You" 
    //         coordinate={mapRegion}
    //          />
    //         {placeList.map((item,index)=>index<=4&&(
    //             <PlaceMarker item={item} key={index} />
    //         ))}
           
    //     </MapView>:null} 
        
    //   </View>
     
    // </View>

    <View style={{ zIndex: 0, marginTop: 20, borderTopEndRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 20, fontWeight: 'bold' }}>Search branch</Text>
        <View style={{ borderTopEndRadius: 20 }}>
        <MapView 
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}
            style={{ borderTopEndRadius: 20, marginTop: 7, width: Dimensions.get('screen').width, height: Dimensions.get('screen').height * .72  }}>
                <Marker 
            title="You" 
            coordinate={mapRegion}
             />
            <Marker title="Your location"
                coordinate={mapRegion}
            />
        </MapView>

            
        </View>
    </View>
  );
}