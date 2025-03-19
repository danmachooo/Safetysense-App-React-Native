"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native"
import { launchCamera, ImagePickerResponse, CameraOptions } from "react-native-image-picker"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RootStackParamList } from "../types"

type ReportIncidentScreenNavigationProp = StackNavigationProp<RootStackParamList, "ReportIncident">

const ReportIncidentScreen = () => {
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [image, setImage] = useState<string | null>(null)
  const navigation = useNavigation<ReportIncidentScreenNavigationProp>()

  const pickImage = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    }

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera")
      } else if (response.errorCode) {
        console.log("Camera Error: ", response.errorMessage)
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri
        setImage(imageUri || null)
      }
    })
  }

  const submitReport = async () => {
    if (!description) {
      return Alert.alert("Missing Description", "Please provide a description of the incident.")
    }

    if (!image) {
      return Alert.alert("Missing Photo", "Please take a photo of the incident.")
    }

    try {
      // In a real app, you would upload the image to a server
      // and send the incident details to your backend

      // Simulating API call
      // await axios.post('https://your-backend.com/report-incident', {
      //   description,
      //   location,
      //   image
      // });

      Alert.alert(
        "Report Submitted",
        "Your incident report has been submitted successfully. Emergency responders have been notified.",
        [{ text: "OK", onPress: () => navigation.goBack() }],
      )
    } catch (error) {
      console.error("Error submitting report:", error)
      Alert.alert("Error", "Failed to submit report. Please try again.")
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        <Text className="text-xl font-bold mb-2">Describe the Incident</Text>
        <TextInput
          className="bg-white p-4 rounded-lg border border-border mb-4"
          placeholder="What happened? Please be specific."
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text className="text-xl font-bold mb-2">Location</Text>
        <TextInput
          className="bg-white p-4 rounded-lg border border-border mb-4"
          placeholder="Where is this happening?"
          value={location}
          onChangeText={setLocation}
        />

        <Text className="text-xl font-bold mb-2">Take a Photo</Text>
        <TouchableOpacity className="bg-secondary py-3 px-6 rounded-lg self-start mb-4" onPress={pickImage}>
          <Text className="text-white font-bold">Take Photo</Text>
        </TouchableOpacity>

        {image && (
          <View className="mb-4">
            <Image source={{ uri: image }} className="w-full h-64 rounded-lg" resizeMode="cover" />
          </View>
        )}

        <TouchableOpacity className="bg-primary py-4 px-6 rounded-xl w-full items-center mt-4" onPress={submitReport}>
          <Text className="text-white font-bold text-lg">Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReportIncidentScreen

