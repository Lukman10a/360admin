import DashboardLayout from "@/components/dashboard-layout"
import ApiExample from "@/components/examples/api-example"

export default function ApiTestPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Integration Test</h1>
          <p className="text-gray-600 mt-2">
            This page demonstrates the API integration setup with Axios and React Query.
          </p>
        </div>
        
        <ApiExample />
      </div>
    </DashboardLayout>
  )
} 