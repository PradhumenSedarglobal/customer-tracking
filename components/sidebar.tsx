"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePermissions } from "@/hooks/use-permissions"
import {
  BarChart3,
  Users,
  MessageSquare,
  TrendingUp,
  Settings,
  ChevronLeft,
  Home,
  UserCheck,
  AlertTriangle,
  FileText,
  Shield,
  ClipboardList,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeView: string
  onViewChange: (view: string) => void
  userRole: string
}

export function Sidebar({ isOpen, onToggle, activeView, onViewChange, userRole }: SidebarProps) {
  const permissions = usePermissions()

  const getNavigationItems = () => {
    const baseItems = [
      { id: "overview", label: "Overview", icon: Home },
      { id: "interactions", label: "Manage Interactions", icon: ClipboardList },
      { id: "interaction-timeline", label: "Timeline", icon: MessageSquare },
    ]

    const conditionalItems = [
      // Sales Person specific items
      ...(userRole === "sales_person"
        ? [
            { id: "my-customers", label: "My Customers", icon: Users },
            { id: "follow-ups", label: "Follow-ups", icon: UserCheck },
          ]
        : []),

      // Showroom Manager specific items
      ...(permissions.canViewTeamData
        ? [
            { id: "team-performance", label: "Team Performance", icon: TrendingUp },
            { id: "showroom-analytics", label: "Analytics", icon: BarChart3 },
          ]
        : []),

      // Items that require escalation permissions
      ...(permissions.canEscalateToManager || permissions.canEscalateToHeadOffice
        ? [{ id: "escalations", label: "Escalations", icon: AlertTriangle }]
        : []),

      // Analytics and reports for managers and head office
      ...(permissions.canViewAnalytics ? [{ id: "performance", label: "Performance", icon: TrendingUp }] : []),

      ...(permissions.canViewReports ? [{ id: "reports", label: "Reports", icon: FileText }] : []),

      // Head office specific items
      ...(userRole === "head_office"
        ? [
            { id: "all-escalations", label: "All Escalations", icon: AlertTriangle },
            { id: "user-management", label: "User Management", icon: Shield },
          ]
        : []),
    ]

    return [...baseItems, ...conditionalItems]
  }

  const navigationItems = getNavigationItems()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
        isOpen ? "w-64" : "w-16",
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {isOpen && <h2 className="text-lg font-semibold text-sidebar-foreground">Navigation</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                !isOpen && "px-2",
                activeView === item.id &&
                  "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* Settings at bottom - only show if user has permission */}
      {permissions.canAccessSettings && (
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
              !isOpen && "px-2",
            )}
            onClick={() => onViewChange("settings")}
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {isOpen && <span>Settings</span>}
          </Button>
        </div>
      )}
    </div>
  )
}
