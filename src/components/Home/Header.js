import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React, { useRef } from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default function Header () {
    const placesRef = useRef();
    const apiKey = "AIzaSyA8EZU-F95hwHkKnyRikLSZ-hxHyQCRCzo";
    const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


  return (
    <View style={{ flexDirection: 'row'}}>
      <Image
        source={require('../../../assets/maybank.png')}
        style={styles.logo}
      />
      <View style={{ width: '70%', marginLeft: 10, zIndex: 1, flexDirection: 'column' }}>
        <Text style={{ fontSize: 25, color: 'black'}}>maybank Assesment</Text>
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
      GooglePlacesSearchQuery={{
        rankby: "distance",
        radius: 30000
      }}
      styles={{
        container: {flex:0, position: 'absolute', width: '100%', zIndex: 2},
        listView: {backgroundColor:"lightgray", zIndex: 99}
    }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    //   predefinedPlaces={[homePlace, workPlace]}
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      // renderRightButton={() => <Text>Custom text after the input</Text>}
    />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        marginLeft: 10
    },
    searchBar: {
        borderWidth: 1,
        // width: '70%',
        borderColor: 'lightgray',
        textAlign: 'center'
    }
})