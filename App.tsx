"use client"

import { useEffect } from "react"
import { StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import messaging from "@react-native-firebase/messaging"
import type { RootStackParamList } from "./src/types"

// Import screens
import HomeScreen from "./src/screens/HomeScreen"
import ReportIncidentScreen from "./src/screens/ReportIncidentScreen"
import IncidentAlertScreen from "./src/screens/IncidentAlertScreen"
import ResponderDashboardScreen from "./src/screens/ReportDashboardScreen"
import LoginScreen from "./src/screens/LoginScreen"

const Stack = createStackNavigator<RootStackParamList>()

async function requestFCMPermission() {
  const authStatus = await messaging().requestPermission()
  if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log("FCM Permission granted")
  }
}

const App = () => {
  useEffect(() => {
    // Request FCM permission on app start
    requestFCMPermission()

    // Handle FCM messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Notification received in foreground:", remoteMessage)
      // Handle the notification here
    })

    // Set up background message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Notification received in background:", remoteMessage)
    })

    return unsubscribe
  }, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Emergency Alert" }} />
        <Stack.Screen name="ReportIncident" component={ReportIncidentScreen} options={{ title: "Report Incident" }} />
        <Stack.Screen
          name="IncidentAlert"
          component={IncidentAlertScreen}
          options={{
            headerShown: false,
            presentation: "modal", 
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          }}
        />
        <Stack.Screen
          name="ResponderDashboard"
          component={ResponderDashboardScreen}
          options={{ title: "Responder Dashboard" }}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Responder Login" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

