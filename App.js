import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";
import Entypo from 'react-native-vector-icons/Entypo';
// Import Screens
import LoginScreen from './Screens/LoginScreen';
import BannersScreen from './Screens/BannersScreen';
import ProductListScreen from './Screens/ProductsListScreen';
import ProductDetails from './Screens/ProductDetails';
import CartScreen from './Screens/CartScreen';
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const App = () => {


  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
          <Stack.Screen name="Categories" component={BannersScreen} options={{ headerStyle: { backgroundColor: "#FF6666" }, headerTintColor: '#fff', 
          headerLeft: (props) => <View></View> }} />
          <Stack.Screen name="Products" component={ProductListScreen} options={{ headerStyle : { backgroundColor : "#FF6666"}, headerTintColor: '#fff'}} /> 
          <Stack.Screen name="Details" component={ProductDetails} options={{ headerStyle: { backgroundColor: "#FF6666" }, headerTintColor: '#fff' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ headerStyle: { backgroundColor: "#FF6666" }, headerTintColor: '#fff' }} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
