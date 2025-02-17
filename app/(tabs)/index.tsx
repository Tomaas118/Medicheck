import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/AuthScreen";

const Stack = createNativeStackNavigator () ;

export default function Index () {
  return (
    <Stack.Navigator initialRouteName ="Auth" >
      <Stack.Screen name = "Auth" component = {AuthScreen} options ={{ title : "Autenticao" }} />
    </Stack.Navigator>
  ) ;
}