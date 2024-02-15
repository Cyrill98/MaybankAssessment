import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import GoogleMapView from '../../components/GoogleMapView'

export default function Home() {
  return (
    <View style={{ paddingTop: 20, backgroundColor: 'orange', height: Dimensions.get('screen').height }}>
      <Header/>
      <GoogleMapView/>
    </View>
  )
}