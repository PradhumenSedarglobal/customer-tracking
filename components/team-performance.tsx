"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Users, Target, Clock, Award } from "lucide-react"

// Mock data for team performance
const teamMembers = [
  {
    id: 1,
    name: "Ahmed Al-Rashid",
    role: "Senior Sales Person",
    avatar: "/placeholder.svg?height=40&width=40",
    totalOrders: 45,
    completedOrders: 38,
    responseTime: "2.3 hours",
    conversionRate: 84,
    escalations: 3,
    performance: "excellent",
  },
  {
    id: 2,
    name: "Fatima Hassan",
    role: "Sales Person",
    avatar: "/placeholder.svg?height=40&width=40",
    totalOrders: 32,
    completedOrders: 28,
    responseTime: "3.1 hours",
    conversionRate: 78,
    escalations: 5,
    performance: "good",
  },
  {
    id: 3,
    name: "Omar Khalil",
    role: "Junior Sales Person",
    avatar: "/placeholder.svg?height=40&width=40",
    totalOrders: 28,
    completedOrders: 22,
    responseTime: "4.2 hours",
    conversionRate: 65,
    escalations: 8,
    performance: "average",
  },
]

const weeklyPerformance = [
  { day: "Mon", orders: 12, conversions: 9 },
  { day: "Tue", orders: 15, conversions: 12 },
  { day: "Wed", orders: 18, conversions: 14 },
  { day: "Thu", orders: 14, conversions: 11 },
  { day: "Fri", orders: 20, conversions: 16 },
  { day: "Sat", orders: 16, conversions: 13 },
  { day: "Sun", orders: 10, conversions: 8 },
]

const performanceDistribution = [
  { name: "Excellent", value: 35, color: "#22c55e" },
  { name: "Good", value: 45, color: "#3b82f6" },
  { name: "Average", value: 15, color: "#f59e0b" },
  { name: "Needs Improvement", value: 5, color: "#ef4444" },
]

export function TeamPerformance() {
  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
      case "average":
        return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Team Performance</h2>
          <p className="text-muted-foreground">Monitor and analyze your team's sales performance</p>
        </div>
        <Button>Export Report</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2h</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -0.5h from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ahmed</div>
            <p className="text-xs text-muted-foreground">84% conversion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance Trend</CardTitle>
            <CardDescription>Orders vs Conversions over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: { label: "Orders", color: "hsl(var(--chart-1))" },
                conversions: { label: "Conversions", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} />
                  <Line type="monotone" dataKey="conversions" stroke="var(--color-conversions)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Distribution</CardTitle>
            <CardDescription>Team performance levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                excellent: { label: "Excellent", color: "#22c55e" },
                good: { label: "Good", color: "#3b82f6" },
                average: { label: "Average", color: "#f59e0b" },
                needs: { label: "Needs Improvement", color: "#ef4444" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members Performance</CardTitle>
          <CardDescription>Individual performance metrics for each team member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{member.totalOrders}</p>
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium">{member.completedOrders}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium">{member.responseTime}</p>
                    <p className="text-xs text-muted-foreground">Avg Response</p>
                  </div>

                  <div className="text-center min-w-[100px]">
                    <div className="flex items-center gap-2">
                      <Progress value={member.conversionRate} className="w-16" />
                      <span className="text-sm font-medium">{member.conversionRate}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Conversion</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-red-600">{member.escalations}</p>
                    <p className="text-xs text-muted-foreground">Escalations</p>
                  </div>

                  {getPerformanceBadge(member.performance)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
