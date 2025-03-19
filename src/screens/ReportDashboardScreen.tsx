"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRoute, type RouteProp } from "@react-navigation/native"
import type { RootStackParamList, Incident } from "../types"

type ResponderDashboardScreenRouteProp = RouteProp<RootStackParamList, "ResponderDashboard">

const ResponderDashboardScreen = () => {
  const route = useRoute<ResponderDashboardScreenRouteProp>()
  const { incidentDetails } = route.params || {}

  // Sample data - in a real app, this would come from your backend
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "1",
      title: "Fire Emergency",
      description: "Building fire reported at 123 Main St.",
      status: "active",
      timestamp: "2023-09-15T14:30:00Z",
    },
    {
      id: "2",
      title: "Medical Emergency",
      description: "Person collapsed at Central Park.",
      status: "active",
      timestamp: "2023-09-15T15:45:00Z",
    },
    {
      id: "3",
      title: "Traffic Accident",
      description: "Multi-car collision on Highway 101.",
      status: "completed",
      timestamp: "2023-09-14T09:15:00Z",
    },
  ])

  // If we received a new incident from the alert screen, add it to our list
  useEffect(() => {
    if (incidentDetails) {
      const newIncident: Incident = {
        id: Date.now().toString(),
        title: incidentDetails.title,
        description: incidentDetails.body,
        status: "active",
        timestamp: new Date().toISOString(),
      }

      setIncidents((prev) => [newIncident, ...prev])
    }
  }, [incidentDetails])

  const renderIncidentItem = ({ item }: { item: Incident }) => {
    const isActive = item.status === "active"

    return (
      <TouchableOpacity className={`p-4 mb-4 rounded-lg ${isActive ? "bg-red-100" : "bg-gray-100"}`}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-gray-700 mt-1">{item.description}</Text>
            <Text className="text-gray-500 text-sm mt-2">{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${isActive ? "bg-primary" : "bg-gray-400"}`}>
            <Text className="text-white font-medium text-xs">{isActive ? "ACTIVE" : "COMPLETED"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 p-6">
        <Text className="text-2xl font-bold mb-6">Active Incidents</Text>

        <FlatList
          data={incidents.filter((incident) => incident.status === "active")}
          keyExtractor={(item) => item.id}
          renderItem={renderIncidentItem}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Text className="text-gray-500">No active incidents</Text>
            </View>
          }
        />

        <Text className="text-2xl font-bold mt-6 mb-6">Incident History</Text>

        <FlatList
          data={incidents.filter((incident) => incident.status === "completed")}
          keyExtractor={(item) => item.id}
          renderItem={renderIncidentItem}
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Text className="text-gray-500">No completed incidents</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default ResponderDashboardScreen

