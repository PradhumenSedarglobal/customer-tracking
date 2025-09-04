"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { usePermissions } from "@/hooks/use-permissions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { CustomerOverview } from "@/components/customer-overview"
import { InteractionTimeline } from "@/components/interaction-timeline"
import { InteractionManagement } from "@/components/interaction-management"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { Menu, Bell, Search, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TeamPerformance } from "@/components/team-performance"
import { ShowroomAnalytics } from "@/components/showroom-analytics"
import { AllEscalations } from "@/components/all-escalations"
import { UserManagement } from "@/components/user-management"

export function Dashboard() {
  const { user, logout } = useAuth()
  const permissions = usePermissions()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeView, setActiveView] = useState("overview")

  console.log("[v0] Dashboard rendering with user:", user)
  console.log("[v0] Dashboard permissions:", permissions)
  console.log("[v0] Dashboard activeView:", activeView)

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "sales_person":
        return "Sales Person"
      case "showroom_manager":
        return "Showroom Manager"
      case "head_office":
        return "Head Office"
      default:
        return role
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "sales_person":
        return "default"
      case "showroom_manager":
        return "secondary"
      case "head_office":
        return "destructive"
      default:
        return "default"
    }
  }

  const renderMainContent = () => {
    console.log("[v0] Rendering main content for activeView:", activeView)

    switch (activeView) {
      case "overview":
        console.log("[v0] Rendering CustomerOverview component")
        return <CustomerOverview />
      case "interactions":
        console.log("[v0] Rendering InteractionManagement component")
        return <InteractionManagement />
      case "interaction-timeline":
        console.log("[v0] Rendering InteractionTimeline component")
        return <InteractionTimeline />
      case "performance":
        console.log("[v0] Rendering PerformanceMetrics component, canViewAnalytics:", permissions.canViewAnalytics)
        return permissions.canViewAnalytics ? <PerformanceMetrics /> : <UnauthorizedView />
      case "team-performance":
        return permissions.canViewTeamData ? <TeamPerformance /> : <UnauthorizedView />
      case "showroom-analytics":
        return permissions.canViewAnalytics ? <ShowroomAnalytics /> : <UnauthorizedView />
      case "all-escalations":
        return permissions.canViewTeamData ? <AllEscalations /> : <UnauthorizedView />
      case "user-management":
        return permissions.canAccessSettings ? <UserManagement /> : <UnauthorizedView />
      case "reports":
        return permissions.canViewReports ? <ReportsView /> : <UnauthorizedView />
      case "settings":
        return permissions.canAccessSettings ? <SettingsView /> : <UnauthorizedView />
      default:
        console.log("[v0] Default case - rendering CustomerOverview component")
        return <CustomerOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeView={activeView}
        onViewChange={setActiveView}
        userRole={user?.role || "sales_person"}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        <header className="border-b border-border bg-card shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Customer Tracking Dashboard</h1>
              <Badge variant={getRoleBadgeVariant(user?.role || "")}>{getRoleDisplayName(user?.role || "")}</Badge>
              <Badge variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                {permissions.dataScope.toUpperCase()} ACCESS
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="pl-10 w-64" />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
                <Button variant="outline" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{renderMainContent()}</main>
      </div>
    </div>
  )
}

function UnauthorizedView() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Access Restricted</h3>
        <p className="text-muted-foreground">You don't have permission to view this section.</p>
      </div>
    </div>
  )
}

function ReportsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports</h2>
      <p className="text-muted-foreground">Reports functionality will be implemented in future updates.</p>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-muted-foreground">Settings functionality will be implemented in future updates.</p>
    </div>
  )
}
