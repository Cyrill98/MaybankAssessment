// import { AppLoading, Font } from 'expo';
import { useState, useRef } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {apiKey} from './config'; // your google cloud api key

const apiKey = "AIzaSyA8EZU-F95hwHkKnyRikLSZ-hxHyQCRCzo";
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export default function App () {
  const placesRef = useRef();

  const getAddress = () => {
    console.log('current places -->', placesRef.current?.getAddressText());
  }

  return (
    <SafeAreaView style={{ flex : 1 }}>
      {/* <View style={{ marginTop: 20, flex: 1, justifyContent: 'center' }}> */}
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      ref = {placesRef}
      getDefaultValue={() => ''}
      
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: apiKey,
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      
      styles={{
        textInputContainer: {
          width: '80%',
          borderColor: 'lightgray',
          // borderRadius: 10,
          borderWidth: 1.5
        },
        textinput: {
          // borderRadius: 10
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
        container: {
          marginTop: 50,
          // justifyContent: 'center',
          elevation: 4,
          alignItems: 'center',
        }
      }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
    />
     {/* </View> */}
    </SafeAreaView>
  );
};


