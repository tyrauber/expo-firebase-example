import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

import ErrorHandler from './context/ErrorHandler'


/* Navigation */


function HomeScreen({route}) {
  const [enabled, setEnabled] = useState(crashlytics().isCrashlyticsCollectionEnabled);

  async function toggleCrashlytics() {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{route?.name} Screen</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{JSON.stringify(route)}</Text>
      <Button title="Toggle Crashlytics" onPress={toggleCrashlytics} />
      <Button title="Crash" onPress={() => crashlytics().crash()} />
      <Button title="Throw" onPress={() => {
        throw new Error('some message')
      }} />
      <Text>Crashlytics is currently {enabled ? 'enabled' : 'disabled'}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const navigationRef = useNavigationContainerRef()
  const routeNameRef = React.useRef();
  return (
    <NavigationContainer
      style={styles.container}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Tab.Navigator>
        <Tab.Screen {...TabOptions({name: 'Home', icon: 'home', component: HomeScreen })} />
        <Tab.Screen {...TabOptions({name: 'Settings', icon: 'account', component: HomeScreen })} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const TabOptions = ({name, icon, component}) => {
  return {
    name: name,
    component: component,
    options: {
      tabBarLabel: name,
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name={icon} color={color} size={size} />
      ),
    }
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorHandler>
        <Navigation/>
      </ErrorHandler>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
