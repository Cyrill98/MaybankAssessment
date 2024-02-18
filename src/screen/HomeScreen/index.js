import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import GoogleMapView from '../../components/GoogleMapView'
import styles from './styles'

export default function Home() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Maybank</Text>
      <Header/>
      <GoogleMapView/>
    </View>
  )
}