import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DogsScreen from "./DogsScreen";
import UserScreen from "./UserScreen";

const Tab = createBottomTabNavigator();

function HomeScreen() {


  return (
    <Tab.Navigator>
      <Tab.Screen name="Dogs" component={DogsScreen} />
      <Tab.Screen name="Your Account" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
