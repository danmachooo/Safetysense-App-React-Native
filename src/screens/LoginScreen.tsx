"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import messaging from "@react-native-firebase/messaging"
import type { RootStackParamList } from "../types"

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigation = useNavigation<LoginScreenNavigationProp>()

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Missing Fields", "Please enter both email and password.")
    }

    try {
      // In a real app, you would authenticate with your backend
      // const response = await axios.post('https://your-backend.com/login', {
      //   email,
      //   password
      // });

      // For demo purposes, we'll just simulate a successful login
      const fcmToken = await messaging().getToken()
      console.log("FCM Token:", fcmToken)

      // In a real app, you would send this token to your backend
      // await axios.post('https://your-backend.com/store-token', { token: fcmToken });

      // Navigate to responder dashboard
      navigation.navigate("ResponderDashboard", {})
    } catch (error) {
      console.error("Login error:", error)
      Alert.alert("Login Failed", "Invalid email or password.")
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-6 justify-center">
        <Text className="text-3xl font-bold text-center mb-8">Responder Login</Text>

        <View className="w-full space-y-4">
          <View>
            <Text className="text-lg font-semibold mb-2">Email</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-border"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text className="text-lg font-semibold mb-2">Password</Text>
            <TextInput
              className="bg-white p-4 rounded-lg border border-border"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            className="bg-secondary py-4 px-6 rounded-xl w-full items-center mt-4"
            onPress={handleLogin}
          >
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

