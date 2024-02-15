import { useState, useRef } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const apiKey = "AIzaSyA8EZU-F95hwHkKnyRikLSZ-hxHyQCRCzo";
const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

export default function App() {
  const placesRef = useRef();

  const dispatch = useDispatch();

  const myLocation = useSelector((state) =>
    console.log(state.location.myLocation)
  );
  const mapMarker = useSelector((state) => console.log(state.marker.mapMarker));
  const coordinate = useSelector((state) =>
    console.log(state.autoComplete.autoComplete)
  );

  const getAddress = () => {
    console.log("current places -->", placesRef.current?.getAddressText());
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const result = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };
          dispatch(mapMarker.fetchMapMaker(result));
          setSearch(details.geometry.location.lat);
          dispatch(AutocompleteAction.fetchAutocomplete(result));
        }}
        ref={placesRef}
        getDefaultValue={() => ""}
        query={{
          key: apiKey,
          language: "en", // language of the results
          types: "(cities)", // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "80%",
            borderColor: "lightgray",
            // borderRadius: 10,
            borderWidth: 1.5,
          },
          textinput: {},
          description: {
            fontWeight: "bold",
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
          container: {
            marginTop: 50,
            elevation: 4,
            alignItems: "center",
          },
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          rankby: "distance",
          types: "food",
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3",
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    </SafeAreaView>
  );
}
