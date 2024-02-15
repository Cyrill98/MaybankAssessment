import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './src/navigations/TabNavigation'
import * as Location from 'expo-location';
import rootStore from './src/store';
import { Provider } from 'react-redux';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  return (
    <Provider store={rootStore}>
      <NavigationContainer>
        <TabNavigation/>
      </NavigationContainer>
    </Provider>
  )
}