import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./context/AuthContext";
import AuthScreen from "./screens/AuthScreen";
import DogsScreen from "./screens/DogsScreen";
import UserScreen from "./screens/UserScreen";
import Dog from "./screens/Dog";
import DogEdit from "./screens/DogEdit";
import AddDogForm from "./components/home/AddDogForm";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Your Dogs" component={DogsScreen} />
      <Tab.Screen name="Your Account" component={UserScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="Login" component={AuthScreen} />
          <Stack.Screen
            name="Dogs"
            component={AddDogForm}
            options={{ presentation: "modal" }}
          />
          <Stack.Screen
            name="DogEdit"
            component={DogEdit}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
