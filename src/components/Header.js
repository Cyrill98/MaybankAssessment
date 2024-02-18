import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useCallback, useState, useEffect } from 'react'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

import * as MyLocationAction from '../store/action/locationAction';
import * as MapMarkerAction from '../store/action/markerAction'
import * as AutocompleteAction from '../store/action/autoCompleteAction'
import * as Location from 'expo-location';

export default function Header () {
  const [search, setSearch] = useState('')

    const placesRef = useRef();
    const dispatch = useDispatch()

    const loadAutocomplete = useCallback(async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({})

        dispatch(MyLocationAction.fetchMyLocation({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }))

    },[dispatch]);

    useEffect(() => {
      loadAutocomplete()
    }, [loadAutocomplete])

    const clearSearchHandler = () => {
      // searchRef.current.clear()
      setSearch('')
  }

  return (
    <View style={{ flexDirection: 'row'}}>
      <Image
        source={require('../../assets/maybank.png')}
        style={styles.logo}
      />
      <View style={{ width: '70%', marginLeft: 10, zIndex: 1, flexDirection: 'column' }}>
      <GooglePlacesAutocomplete
      placeholder='Search Maybank branch'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        const result = {
            latitude:details.geometry.location.lat,
            longitude:details.geometry.location.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
        }

        const searchPlaces = {
          name : details.address_components[0].long_name,
          country: details.address_components[2].long_name
        }
        console.log('searchplaces -->', searchPlaces);
        dispatch(MapMarkerAction.fetchMapMaker(result))
        setSearch(details.geometry.location.lat)
        dispatch(AutocompleteAction.fetchAutocomplete(searchPlaces))
      }}
      ref = {placesRef}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEYS,
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      GooglePlacesSearchQuery={{
        rankby: "distance",
        radius: 30000
      }}
      styles={{
        container: {flex:0, position: 'absolute', width: 320, zIndex: 2},
        listView: {backgroundColor:"lightgray", zIndex: 99}
    }}
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderRightButton={() => 
      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 5}}
        onPress={() => clearSearchHandler()}
      >
        <AntDesign name="closecircle" size={24} color="black" />
      </TouchableOpacity>}
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