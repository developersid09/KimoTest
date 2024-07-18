import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../Utils';
import { Header } from '../Components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import NavigationUrl from '../Utils/NavigationUrl';

import Dashboard from '../Screen/Dashboard';
import Surfing from '../Screen/Surfing';
import EmptyScreen from '../Screen/EmptyScreen';

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
        component={Surfing} />
      <Tab.Screen
        name="Hula"
        component={EmptyScreen} />
      <Tab.Screen
        name="Vulcano"
        component={EmptyScreen} />
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
        <Stack.Screen
          name={NavigationUrl.surfingId}
          component={Surfing}
        />
        <Stack.Screen
          name={NavigationUrl.emptyScreenId}
          component={EmptyScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
