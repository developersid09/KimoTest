import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationUrl from '../Utils/NavigationUrl';
import { Colors } from '../Utils';
import { Header } from '../Components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Dashboard from '../Screen/Dashboard';
import { Image, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
            return (<Image
              style={styles.logoImage}
              resizeMode='center'
              source={focused
                ? require(`../Assets/Images/home_sel.png`)
                : require(`../Assets/Images/home.png`)} />)
          } else if (route.name === 'Surfing') {
            iconName = 'surfing';
            return (<Image
              style={styles.logoImage}
              resizeMode='center'
              source={focused
                ? require(`../Assets/Images/surfing_sel.png`)
                : require(`../Assets/Images/surfing.png`)} />)
          } else if (route.name === 'Hula') {
            iconName = 'hula';
            return (<Image
              style={styles.logoImage}
              resizeMode='center'
              source={require(`../Assets/Images/hula.png`)} />)
          } else if (route.name === 'Vulcano') {
            iconName = 'vulcano';
            return (<Image
              style={styles.logoImage}
              resizeMode='center'
              source={require(`../Assets/Images/vulcano.png`)} />)
          }

        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.colorPrimary,
        inactiveTintColor: Colors.colorBlack,
        style: { borderBottomColor: Colors.colorPrimary, borderBottomWidth: 3 },
        indicatorStyle: {
          backgroundColor: 'red',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard} />
      <Tab.Screen
        name="Surfing"
        component={Dashboard} />
      <Tab.Screen
        name="Hula"
        component={Dashboard} />
      <Tab.Screen
        name="Vulcano"
        component={Dashboard} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  logoImage: {
    width: RFValue(20),
    height: RFValue(20),
  },
});

const AppContainer = ({ }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NavigationUrl.tabNavigatorId}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.colorWhite,
          },
          headerTitle: () => <Header />,
        }}>
        <Stack.Screen
          name={NavigationUrl.tabNavigatorId}
          component={TabNavigator}
        />
        <Stack.Screen
          name={NavigationUrl.dashboardId}
          component={Dashboard}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
