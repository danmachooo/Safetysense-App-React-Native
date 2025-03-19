import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStackParamList } from "../types"

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-6 justify-center items-center">
        <Text className="text-3xl font-bold text-center mb-8">Emergency Alert App</Text>

        <View className="w-full space-y-4">
          <TouchableOpacity
            className="bg-primary py-4 px-6 rounded-xl w-full items-center"
            onPress={() => navigation.navigate("ReportIncident")}
          >
            <Text className="text-white font-bold text-lg">Report an Incident</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-secondary py-4 px-6 rounded-xl w-full items-center"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-white font-bold text-lg">Responder Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

