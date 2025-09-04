"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Users, UserPlus, Search, Shield, MapPin, Phone, Mail, Calendar, Edit, Trash2 } from "lucide-react"

// Mock user data
const users = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    email: "ahmed.rashid@company.com",
    phone: "+971-50-123-4567",
    role: "sales_person",
    showroom: "Dubai Mall",
    country: "UAE",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    joinDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: {
      canViewCustomers: true,
      canEditOrders: true,
      canEscalate: true,
      canViewReports: false,
    },
  },
  {
    id: 2,
    name: "Fatima Hassan",
    email: "fatima.hassan@company.com",
    phone: "+966-55-987-6543",
    role: "showroom_manager",
    showroom: "Riyadh Center",
    country: "Saudi Arabia",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: {
      canViewCustomers: true,
      canEditOrders: true,
      canEscalate: true,
      canViewReports: true,
    },
  },
  {
    id: 3,
    name: "Omar Khalil",
    email: "omar.khalil@company.com",
    phone: "+965-66-555-4444",
    role: "head_office",
    showroom: "Head Office",
    country: "Kuwait",
    status: "active",
    lastLogin: "2024-01-15T11:45:00Z",
    joinDate: "2022-11-20",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: {
      canViewCustomers: true,
      canEditOrders: true,
      canEscalate: true,
      canViewReports: true,
    },
  },
  {
    id: 4,
    name: "Layla Ahmed",
    email: "layla.ahmed@company.com",
    phone: "+20-10-888-7777",
    role: "sales_person",
    showroom: "Cairo Plaza",
    country: "Egypt",
    status: "inactive",
    lastLogin: "2024-01-10T16:20:00Z",
    joinDate: "2023-08-05",
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: {
      canViewCustomers: true,
      canEditOrders: false,
      canEscalate: true,
      canViewReports: false,
    },
  },
]

const userStats = {
  total: 45,
  active: 38,
  inactive: 7,
  salesPersons: 28,
  showroomManagers: 12,
  headOffice: 5,
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "sales_person":
        return (
          <Badge variant="outline" className="text-blue-600">
            Sales Person
          </Badge>
        )
      case "showroom_manager":
        return (
          <Badge variant="outline" className="text-green-600">
            Showroom Manager
          </Badge>
        )
      case "head_office":
        return (
          <Badge variant="outline" className="text-purple-600">
            Head Office
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.showroom.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesCountry = countryFilter === "all" || user.country === countryFilter

    return matchesSearch && matchesRole && matchesStatus && matchesCountry
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage users, roles, and permissions across all showrooms</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with appropriate permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Full name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="email@company.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales_person">Sales Person</SelectItem>
                    <SelectItem value="showroom_manager">Showroom Manager</SelectItem>
                    <SelectItem value="head_office">Head Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{userStats.inactive}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Persons</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{userStats.salesPersons}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managers</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userStats.showroomManagers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Head Office</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{userStats.headOffice}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or showroom..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="sales_person">Sales Person</SelectItem>
                <SelectItem value="showroom_manager">Showroom Manager</SelectItem>
                <SelectItem value="head_office">Head Office</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="UAE">UAE</SelectItem>
                <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                <SelectItem value="Kuwait">Kuwait</SelectItem>
                <SelectItem value="Egypt">Egypt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{user.name}</h4>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {user.showroom}, {user.country}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Join Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Login</p>
                    <span className="font-medium">{new Date(user.lastLogin).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Permissions</p>
                    <div className="flex gap-1 mt-1">
                      {user.permissions.canViewCustomers && (
                        <Badge variant="outline" className="text-xs">
                          View
                        </Badge>
                      )}
                      {user.permissions.canEditOrders && (
                        <Badge variant="outline" className="text-xs">
                          Edit
                        </Badge>
                      )}
                      {user.permissions.canEscalate && (
                        <Badge variant="outline" className="text-xs">
                          Escalate
                        </Badge>
                      )}
                      {user.permissions.canViewReports && (
                        <Badge variant="outline" className="text-xs">
                          Reports
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Switch checked={user.status === "active"} />
                      <span className="text-xs">{user.status === "active" ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
