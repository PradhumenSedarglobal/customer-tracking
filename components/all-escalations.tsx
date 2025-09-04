"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, Clock, MapPin, Search, TrendingUp, Users, CheckCircle } from "lucide-react"

// Mock escalation data
const escalations = [
  {
    id: "ESC-001",
    customerName: "Ahmed Al-Mansouri",
    orderId: "ORD-2024-001",
    issue: "Product delivery delay",
    priority: "high",
    status: "pending",
    escalatedFrom: "Sales Person",
    escalatedTo: "Showroom Manager",
    assignedTo: "Fatima Hassan",
    showroom: "Dubai Mall",
    country: "UAE",
    createdAt: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-15T14:20:00Z",
    responseTime: "3h 50m",
    description:
      "Customer is complaining about delayed delivery of electronics order. Expected delivery was 3 days ago.",
  },
  {
    id: "ESC-002",
    customerName: "Sarah Johnson",
    orderId: "ORD-2024-002",
    issue: "Product quality concern",
    priority: "medium",
    status: "in-progress",
    escalatedFrom: "Showroom Manager",
    escalatedTo: "Head Office",
    assignedTo: "Omar Khalil",
    showroom: "Riyadh Center",
    country: "Saudi Arabia",
    createdAt: "2024-01-14T09:15:00Z",
    lastUpdate: "2024-01-15T11:45:00Z",
    responseTime: "1d 2h",
    description: "Customer received damaged product and requesting replacement or refund.",
  },
  {
    id: "ESC-003",
    customerName: "Mohammed Al-Rashid",
    orderId: "ORD-2024-003",
    issue: "Payment processing error",
    priority: "urgent",
    status: "resolved",
    escalatedFrom: "Sales Person",
    escalatedTo: "Head Office",
    assignedTo: "Layla Ahmed",
    showroom: "Kuwait City",
    country: "Kuwait",
    createdAt: "2024-01-13T16:20:00Z",
    lastUpdate: "2024-01-14T10:30:00Z",
    responseTime: "18h 10m",
    description: "Payment was charged twice for the same order. Customer requesting immediate refund.",
  },
]

const escalationStats = {
  total: 156,
  pending: 23,
  inProgress: 45,
  resolved: 88,
  avgResponseTime: "4.2 hours",
  criticalCount: 8,
}

export function AllEscalations() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-orange-600">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="text-blue-600">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="text-green-600">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const filteredEscalations = escalations.filter((escalation) => {
    const matchesSearch =
      escalation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escalation.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      escalation.issue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || escalation.status === statusFilter
    const matchesPriority = priorityFilter === "all" || escalation.priority === priorityFilter
    const matchesCountry = countryFilter === "all" || escalation.country === countryFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesCountry
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">All Escalations</h2>
          <p className="text-muted-foreground">Monitor and manage all customer escalations across all showrooms</p>
        </div>
        <Button>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Create Escalation
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Escalations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escalationStats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{escalationStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{escalationStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Being handled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{escalationStats.resolved}</div>
            <p className="text-xs text-muted-foreground">Successfully closed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escalationStats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Escalations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by customer, order ID, or issue..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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

      {/* Escalations List */}
      <Card>
        <CardHeader>
          <CardTitle>Escalations ({filteredEscalations.length})</CardTitle>
          <CardDescription>All customer escalations requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEscalations.map((escalation) => (
              <div key={escalation.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{escalation.customerName}</h4>
                      <Badge variant="outline">{escalation.orderId}</Badge>
                      {getPriorityBadge(escalation.priority)}
                      {getStatusBadge(escalation.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{escalation.issue}</p>
                    <p className="text-xs text-muted-foreground">{escalation.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Escalated From</p>
                    <p className="font-medium">{escalation.escalatedFrom}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Assigned To</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {escalation.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{escalation.assignedTo}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="font-medium">
                        {escalation.showroom}, {escalation.country}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{escalation.responseTime}</span>
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
