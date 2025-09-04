"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { usePermissions, useDataFilter } from "@/hooks/use-permissions"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { SocialShare } from "@/components/social-share"
import { ConversationDetail } from "@/components/conversation-detail" // Added import for ConversationDetail
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  MapPin,
  Building2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"
import { useState } from "react"

export function CustomerOverview() {
  const { user } = useAuth()
  const permissions = usePermissions()
  const { filterCustomerData } = useDataFilter()

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedShowroom, setSelectedShowroom] = useState<string | null>(null)
  const [showConversationDetail, setShowConversationDetail] = useState(false)
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null)
  const [selectedPersonName, setSelectedPersonName] = useState<string | null>(null)
  const [showAllPersonsConversations, setShowAllPersonsConversations] = useState(false)
  const [showPersonOrderList, setShowPersonOrderList] = useState(false)
  const [selectedPersonOrders, setSelectedPersonOrders] = useState<any[]>([])

  const countries = [
    {
      code: "AE",
      name: "United Arab Emirates",
      flag: "🇦🇪",
      showrooms: ["Dubai Mall", "Abu Dhabi Central", "Sharjah City Centre"],
    },
    {
      code: "SA",
      name: "Saudi Arabia",
      flag: "🇸🇦",
      showrooms: ["Riyadh Gallery", "Jeddah Red Sea Mall", "Dammam Corniche"],
    },
    {
      code: "KW",
      name: "Kuwait",
      flag: "🇰🇼",
      showrooms: ["Kuwait City Center", "Hawally Branch"],
    },
    {
      code: "EG",
      name: "Egypt",
      flag: "🇪🇬",
      showrooms: ["Cairo Festival City", "Alexandria Plaza"],
    },
    {
      code: "IQ",
      name: "Iraq",
      flag: "🇮🇶",
      showrooms: ["Baghdad Central", "Erbil Mall"],
    },
    {
      code: "MA",
      name: "Morocco",
      flag: "🇲🇦",
      showrooms: ["Casablanca Twin Center", "Rabat Agdal"],
    },
    {
      code: "BH",
      name: "Bahrain",
      flag: "🇧🇭",
      showrooms: ["Manama City Centre"],
    },
    {
      code: "SD",
      name: "Sudan",
      flag: "🇸🇩",
      showrooms: ["Khartoum Plaza"],
    },
    {
      code: "QA",
      name: "Qatar",
      flag: "🇶🇦",
      showrooms: ["Doha Festival City", "Villaggio Mall"],
    },
    {
      code: "OM",
      name: "Oman",
      flag: "🇴🇲",
      showrooms: ["Muscat Grand Mall"],
    },
    {
      code: "CA",
      name: "Canada",
      flag: "🇨🇦",
      showrooms: ["Toronto Eaton Centre", "Vancouver Pacific Centre"],
    },
    {
      code: "IT",
      name: "Italy",
      flag: "🇮🇹",
      showrooms: ["Milan Design Center"],
    },
  ]

  const getShowroomDetails = (countryCode: string, showroomName: string) => {
    return {
      name: showroomName,
      country: countries.find((c) => c.code === countryCode)?.name,
      salesPersons: [
        {
          id: 1,
          name: "Ahmed Hassan",
          followUps: 12,
          conversions: 3,
          status: "active",
          orders: [
            { id: "ORD001", customerName: "John Smith", value: "$2,500", status: "active", lastMessage: "2 hours ago" },
            {
              id: "ORD002",
              customerName: "Sarah Johnson",
              value: "$1,200",
              status: "pending",
              lastMessage: "1 day ago",
            },
            {
              id: "ORD003",
              customerName: "Mike Wilson",
              value: "$3,800",
              status: "escalated",
              lastMessage: "3 hours ago",
            },
          ],
        },
        {
          id: 2,
          name: "Fatima Al-Zahra",
          followUps: 8,
          conversions: 5,
          status: "active",
          orders: [
            { id: "ORD004", customerName: "Emma Davis", value: "$1,800", status: "active", lastMessage: "30 min ago" },
            {
              id: "ORD005",
              customerName: "David Brown",
              value: "$2,200",
              status: "completed",
              lastMessage: "2 days ago",
            },
          ],
        },
        {
          id: 3,
          name: "Omar Khalil",
          followUps: 15,
          conversions: 2,
          status: "pending",
          orders: [
            {
              id: "ORD006",
              customerName: "Lisa Anderson",
              value: "$4,200",
              status: "pending",
              lastMessage: "4 hours ago",
            },
            {
              id: "ORD007",
              customerName: "Robert Taylor",
              value: "$1,600",
              status: "active",
              lastMessage: "1 hour ago",
            },
            {
              id: "ORD008",
              customerName: "Jennifer White",
              value: "$2,900",
              status: "escalated",
              lastMessage: "6 hours ago",
            },
          ],
        },
      ],
      managers: [
        { id: 1, name: "Sarah Abdullah", followUps: 25, escalations: 4, status: "active" },
        { id: 2, name: "Mohammed Al-Rashid", followUps: 18, escalations: 2, status: "active" },
      ],
      metrics: {
        totalCustomers: Math.floor(Math.random() * 200) + 50,
        activeFollowUps: Math.floor(Math.random() * 30) + 10,
        monthlyConversions: Math.floor(Math.random() * 50) + 20,
        avgResponseTime: `${Math.floor(Math.random() * 4) + 1}h ${Math.floor(Math.random() * 60)}m`,
      },
    }
  }

  const dailyInteractionData = [
    { day: "Mon", interactions: 12, conversions: 3 },
    { day: "Tue", interactions: 18, conversions: 5 },
    { day: "Wed", interactions: 15, conversions: 4 },
    { day: "Thu", interactions: 22, conversions: 7 },
    { day: "Fri", interactions: 19, conversions: 6 },
    { day: "Sat", interactions: 8, conversions: 2 },
    { day: "Sun", interactions: 5, conversions: 1 },
  ]

  const getStatsForRole = () => {
    switch (user?.role) {
      case "sales_person":
        return {
          totalCustomers: 24,
          pendingFollowups: 3,
          escalatedCases: 1,
          completedToday: 8,
        }
      case "showroom_manager":
        return {
          totalCustomers: 156,
          pendingFollowups: 12,
          escalatedCases: 5,
          completedToday: 34,
        }
      case "head_office":
        return {
          totalCustomers: 1247,
          pendingFollowups: 45,
          escalatedCases: 18,
          completedToday: 127,
        }
      default:
        return {
          totalCustomers: 0,
          pendingFollowups: 0,
          escalatedCases: 0,
          completedToday: 0,
        }
    }
  }

  const stats = getStatsForRole()

  const allCustomers = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1234567890",
      status: "pending",
      lastInteraction: "2 hours ago",
      priority: "high",
      orderValue: "$2,500",
      telegram_customer_id: "sales_123", // Matches sales person
      showroom_code: "SR001",
      sales_person_id: "1",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567891",
      status: "in_progress",
      lastInteraction: "1 day ago",
      priority: "medium",
      orderValue: "$1,200",
      telegram_customer_id: "sales_456", // Different sales person
      showroom_code: "SR001",
      sales_person_id: "2",
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1234567892",
      status: "escalated",
      lastInteraction: "3 days ago",
      priority: "high",
      orderValue: "$5,800",
      telegram_customer_id: "sales_789", // Different sales person
      showroom_code: "SR002", // Different showroom
      sales_person_id: "3",
    },
  ]

  // Apply role-based filtering
  const recentCustomers = filterCustomerData(allCustomers)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "in_progress":
        return <Badge variant="default">In Progress</Badge>
      case "escalated":
        return <Badge variant="destructive">Escalated</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="destructive" className="text-xs">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="text-xs">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="text-xs">
            Low
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {priority}
          </Badge>
        )
    }
  }

  const overviewShareData = {
    title: "Customer Overview Summary",
    summary: `Current customer status overview for ${user?.name || "team"}`,
    metrics: [
      { label: "Total Customers", value: stats.totalCustomers },
      { label: "Pending Follow-ups", value: stats.pendingFollowups },
      { label: "Escalated Cases", value: stats.escalatedCases },
      { label: "Completed Today", value: stats.completedToday },
    ],
  }

  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
              <span className="font-bold text-muted-foreground">{label}</span>
            </div>
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex flex-col">
                <span className="text-[0.70rem] uppercase text-muted-foreground">
                  {entry.dataKey === "interactions" ? "Interactions" : "Conversions"}
                </span>
                <span className="font-bold" style={{ color: entry.color }}>
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (showConversationDetail) {
    return (
      <ConversationDetail
        personId={selectedPersonId || undefined}
        personName={selectedPersonName || undefined}
        showAllPersons={showAllPersonsConversations}
        onBack={() => {
          setShowConversationDetail(false)
          setSelectedPersonId(null)
          setSelectedPersonName(null)
          setShowAllPersonsConversations(false)
        }}
      />
    )
  }

  if (showPersonOrderList && selectedPersonOrders.length > 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowPersonOrderList(false)
              setSelectedPersonOrders([])
              setSelectedPersonId(null)
              setSelectedPersonName(null)
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Sales Persons
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">{selectedPersonName} - Order List</h2>
            <p className="text-muted-foreground">{selectedPersonOrders.length} Active Orders</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Orders & Conversations</CardTitle>
            <CardDescription>Click on any order to view the detailed conversation history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedPersonOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{order.customerName}</h4>
                      <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
                      <p className="text-xs text-muted-foreground">Last message: {order.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">{order.value}</div>
                      <Badge
                        variant={
                          order.status === "active"
                            ? "default"
                            : order.status === "completed"
                              ? "secondary"
                              : order.status === "escalated"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setShowConversationDetail(true)
                        setShowPersonOrderList(false)
                      }}
                    >
                      View Conversation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Conditional rendering for head office country/showroom view
  if (user?.role === "head_office" && selectedShowroom && selectedCountry) {
    const showroomDetails = getShowroomDetails(selectedCountry, selectedShowroom)

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedShowroom(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {countries.find((c) => c.code === selectedCountry)?.name}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">{showroomDetails.name}</h2>
            <p className="text-muted-foreground">{showroomDetails.country}</p>
          </div>
        </div>

        {/* Showroom Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{showroomDetails.metrics.totalCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{showroomDetails.metrics.activeFollowUps}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{showroomDetails.metrics.monthlyConversions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">{showroomDetails.metrics.avgResponseTime}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Persons */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sales Persons Follow-up List</CardTitle>
                <CardDescription>Individual sales person performance and follow-ups</CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAllPersonsConversations(true)
                  setShowConversationDetail(true)
                }}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {showroomDetails.salesPersons.map((person) => (
                <div key={person.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{person.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Sales Person • {person.orders?.length || 0} Orders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{person.followUps} Follow-ups</div>
                      <div className="text-sm text-muted-foreground">{person.conversions} Conversions</div>
                    </div>
                    <Badge variant={person.status === "active" ? "default" : "secondary"}>{person.status}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedPersonId(person.id.toString())
                        setSelectedPersonName(person.name)
                        setSelectedPersonOrders(person.orders || [])
                        setShowPersonOrderList(true)
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Showroom Managers */}
        <Card>
          <CardHeader>
            <CardTitle>Showroom Managers Follow-up List</CardTitle>
            <CardDescription>Manager escalations and oversight activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {showroomDetails.managers.map((manager) => (
                <div key={manager.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{manager.name}</h4>
                      <p className="text-sm text-muted-foreground">Showroom Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{manager.followUps} Follow-ups</div>
                      <div className="text-sm text-muted-foreground">{manager.escalations} Escalations</div>
                    </div>
                    <Badge variant={manager.status === "active" ? "default" : "secondary"}>{manager.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Conditional rendering for head office country view with showroom list
  if (user?.role === "head_office" && selectedCountry && !selectedShowroom) {
    const country = countries.find((c) => c.code === selectedCountry)

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCountry(null)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Countries
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-4xl">{country?.flag}</span>
          <div>
            <h2 className="text-2xl font-bold">{country?.name}</h2>
            <p className="text-muted-foreground">{country?.showrooms.length} Showrooms</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Showrooms in {country?.name}</CardTitle>
            <CardDescription>Click on a showroom to view detailed sales and manager follow-up lists</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {country?.showrooms.map((showroom) => (
                <Card
                  key={showroom}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedShowroom(showroom)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{showroom}</h4>
                          <p className="text-sm text-muted-foreground">Active Showroom</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Head office country overview as default view
  if (user?.role === "head_office" && !selectedCountry) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Global Operations</h2>
            <p className="text-muted-foreground">Select a country to view showrooms and performance</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Countries & Regions</CardTitle>
            <CardDescription>Our showrooms and design centers worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {countries.map((country) => (
                <Card
                  key={country.code}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedCountry(country.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <h4 className="font-medium">{country.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {country.showrooms.length} {country.showrooms.length === 1 ? "Location" : "Locations"}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Data Scope:{" "}
            {permissions.dataScope === "own"
              ? "Personal"
              : permissions.dataScope === "showroom"
                ? "Showroom"
                : "Company-wide"}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          {recentCustomers.length} of {allCustomers.length} customers visible
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Active interactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.pendingFollowups}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Escalated Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.escalatedCases}</div>
            <p className="text-xs text-muted-foreground">Need higher attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">{stats.completedToday}</div>
            <p className="text-xs text-muted-foreground">Interactions closed</p>
          </CardContent>
        </Card>
      </div>

      {permissions.canViewAnalytics && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Daily Interaction Trends</CardTitle>
              <CardDescription>Customer interactions and conversions over the past week</CardDescription>
            </div>
            <SocialShare data={overviewShareData} type="performance" />
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                interactions: {
                  label: "Interactions",
                  color: "hsl(var(--chart-1))",
                },
                conversions: {
                  label: "Conversions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyInteractionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<CustomTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="interactions"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stackId="2"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Recent Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Interactions</CardTitle>
          <CardDescription>
            {permissions.dataScope === "own"
              ? "Your assigned customer activities"
              : permissions.dataScope === "showroom"
                ? "Showroom customer activities requiring attention"
                : "Latest customer activities requiring attention"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No customers visible with your current permissions
              </div>
            ) : (
              recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{customer.name}</h4>
                        {getStatusBadge(customer.status)}
                        {getPriorityBadge(customer.priority)}
                        {permissions.dataScope !== "own" && (
                          <Badge variant="outline" className="text-xs">
                            {customer.showroom_code}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-primary">{customer.orderValue}</div>
                      <div className="text-sm text-muted-foreground">{customer.lastInteraction}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      {(permissions.canEscalateToManager || permissions.canEscalateToHeadOffice) &&
                        customer.status === "pending" && (
                          <Button size="sm" variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Escalate
                          </Button>
                        )}
                      <SocialShare
                        data={{
                          title: `Customer Update: ${customer.name}`,
                          summary: `Customer interaction update and current status`,
                          customerInfo: {
                            name: customer.name,
                            status: customer.status,
                            value: customer.orderValue,
                          },
                        }}
                        type="customer"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
