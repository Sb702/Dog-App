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
import AiScreen from "./screens/AiScreen";
import ProgressScreen from "./screens/ProgressScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Your Dogs"
        component={DogsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatBot"
        component={AiScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Your Account"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeTabs} />
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
