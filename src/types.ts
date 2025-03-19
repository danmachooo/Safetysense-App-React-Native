// Navigation types
export type RootStackParamList = {
    Home: undefined
    ReportIncident: undefined
    IncidentAlert: {
      title?: string
      body?: string
    }
    ResponderDashboard: {
      incidentDetails?: {
        title: string
        body: string
      }
    }
    Login: undefined
  }
  
  // Incident types
  export interface Incident {
    id: string
    title: string
    description: string
    status: "active" | "completed"
    timestamp: string
    location?: string
    imageUrl?: string
  }
  
  // User types
  export interface User {
    id: string
    email: string
    name: string
    role: "responder" | "admin"
    fcmToken?: string
  }
  
  