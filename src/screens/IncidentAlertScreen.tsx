"use client"

import { useEffect } from "react"
import { View, Text, TouchableOpacity, Vibration } from "react-native"
import Sound from "react-native-sound"
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types"

type IncidentAlertScreenNavigationProp = StackNavigationProp<RootStackParamList, "IncidentAlert">
type IncidentAlertScreenRouteProp = RouteProp<RootStackParamList, "IncidentAlert">

const IncidentAlertScreen = () => {
  const navigation = useNavigation<IncidentAlertScreenNavigationProp>()
  const route = useRoute<IncidentAlertScreenRouteProp>()
  const { title = "Emergency Alert", body = "An incident has been reported nearby." } = route.params || {}
  let alertSound: Sound

  // Set up vibration pattern
  const startVibration = () => {
    const pattern = [0, 500, 500, 500, 500]
    Vibration.vibrate(pattern, true)
  }

  useEffect(() => {
    // Initialize sound
    Sound.setCategory("Playback")
    alertSound = new Sound("alert.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (!error) {
        alertSound.setVolume(1.0)
        alertSound.setNumberOfLoops(-1) // Loop indefinitely
        alertSound.play()
      } else {
        console.log("Failed to load sound", error)
      }
    })

    // Start vibration
    startVibration()

    return () => {
      // Clean up
      if (alertSound) {
        alertSound.stop()
        alertSound.release()
      }
      Vibration.cancel()
    }
  }, [])

  const acceptIncident = () => {
    if (alertSound) {
      alertSound.stop()
    }
    Vibration.cancel()
    navigation.navigate("ResponderDashboard", { incidentDetails: { title, body } })
  }

  const declineIncident = () => {
    if (alertSound) {
      alertSound.stop()
    }
    Vibration.cancel()
    navigation.goBack()
  }

  return (
    <View className="flex-1 bg-black justify-center items-center p-6">
      <View className="bg-card p-6 rounded-3xl w-full max-w-sm items-center">
        <Text className="text-primary text-3xl font-bold mb-2">{title}</Text>
        <Text className="text-text text-lg text-center mb-8">{body}</Text>

        <View className="w-full space-y-4">
          <TouchableOpacity className="bg-secondary py-4 rounded-xl w-full items-center" onPress={acceptIncident}>
            <Text className="text-white font-bold text-lg">Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-400 py-4 rounded-xl w-full items-center" onPress={declineIncident}>
            <Text className="text-white font-bold text-lg">Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default IncidentAlertScreen

