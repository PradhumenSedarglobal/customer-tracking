"use client"

import { useAuth, type UserRole } from "@/components/auth-provider"

export interface Permission {
  canViewAllCustomers: boolean
  canViewTeamData: boolean
  canEscalateToManager: boolean
  canEscalateToHeadOffice: boolean
  canViewAnalytics: boolean
  canManageTeam: boolean
  canViewReports: boolean
  canAccessSettings: boolean
  dataScope: "own" | "showroom" | "all"
}

export function usePermissions(): Permission {
  const { user } = useAuth()

  const getPermissionsForRole = (role: UserRole): Permission => {
    switch (role) {
      case "sales_person":
        return {
          canViewAllCustomers: false,
          canViewTeamData: false,
          canEscalateToManager: true,
          canEscalateToHeadOffice: false,
          canViewAnalytics: false,
          canManageTeam: false,
          canViewReports: false,
          canAccessSettings: false,
          dataScope: "own",
        }
      case "showroom_manager":
        return {
          canViewAllCustomers: true,
          canViewTeamData: true,
          canEscalateToManager: false,
          canEscalateToHeadOffice: true,
          canViewAnalytics: true,
          canManageTeam: true,
          canViewReports: true,
          canAccessSettings: true,
          dataScope: "showroom",
        }
      case "head_office":
        return {
          canViewAllCustomers: true,
          canViewTeamData: true,
          canEscalateToManager: false,
          canEscalateToHeadOffice: false,
          canViewAnalytics: true,
          canManageTeam: true,
          canViewReports: true,
          canAccessSettings: true,
          dataScope: "all",
        }
      default:
        return {
          canViewAllCustomers: false,
          canViewTeamData: false,
          canEscalateToManager: false,
          canEscalateToHeadOffice: false,
          canViewAnalytics: false,
          canManageTeam: false,
          canViewReports: false,
          canAccessSettings: false,
          dataScope: "own",
        }
    }
  }

  return getPermissionsForRole(user?.role || "sales_person")
}

export function useDataFilter() {
  const { user } = useAuth()
  const permissions = usePermissions()

  const filterCustomerData = <
    T extends { telegram_customer_id?: string; showroom_code?: string; sales_person_id?: string },
  >(
    data: T[],
  ): T[] => {
    if (!user) return []

    switch (permissions.dataScope) {
      case "own":
        // Sales person can only see their own customers
        return data.filter(
          (item) => item.telegram_customer_id === user.telegram_customer_id || item.sales_person_id === user.id,
        )
      case "showroom":
        // Showroom manager can see all customers in their showroom
        return data.filter(
          (item) => item.showroom_code === user.showroom_code || !item.showroom_code, // Include items without showroom code
        )
      case "all":
        // Head office can see all data
        return data
      default:
        return []
    }
  }

  const filterInteractionData = <
    T extends { assigned_to?: string; telegram_customer_id?: string; showroom_code?: string },
  >(
    data: T[],
  ): T[] => {
    if (!user) return []

    switch (permissions.dataScope) {
      case "own":
        return data.filter(
          (item) => item.assigned_to === user.id || item.telegram_customer_id === user.telegram_customer_id,
        )
      case "showroom":
        return data.filter((item) => item.showroom_code === user.showroom_code || !item.showroom_code)
      case "all":
        return data
      default:
        return []
    }
  }

  return {
    filterCustomerData,
    filterInteractionData,
  }
}
