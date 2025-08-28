"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { SocialShare } from "@/components/social-share"

export function PerformanceMetrics() {
  const { user } = useAuth()

  const monthlyPerformanceData = [
    { month: "Jan", interactions: 45, conversions: 12, escalations: 3 },
    { month: "Feb", interactions: 52, conversions: 18, escalations: 2 },
    { month: "Mar", interactions: 38, conversions: 15, escalations: 5 },
    { month: "Apr", interactions: 61, conversions: 22, escalations: 4 },
    { month: "May", interactions: 55, conversions: 19, escalations: 3 },
    { month: "Jun", interactions: 67, conversions: 25, escalations: 2 },
  ]

  const responseTimeData = [
    { timeRange: "0-1h", count: 45, percentage: 35 },
    { timeRange: "1-4h", count: 38, percentage: 30 },
    { timeRange: "4-24h", count: 25, percentage: 20 },
    { timeRange: "1-3d", count: 15, percentage: 12 },
    { timeRange: "3d+", count: 4, percentage: 3 },
  ]

  const escalationFlowData = [
    { stage: "Sales Person", resolved: 85, escalated: 15 },
    { stage: "Showroom Manager", resolved: 70, escalated: 30 },
    { stage: "Head Office", resolved: 95, escalated: 5 },
  ]

  const customerStatusData = [
    { status: "Active", count: 156, color: "hsl(var(--chart-1))" },
    { status: "Pending", count: 45, color: "hsl(var(--chart-2))" },
    { status: "Escalated", count: 18, color: "hsl(var(--chart-3))" },
    { status: "Completed", count: 234, color: "hsl(var(--chart-4))" },
  ]

  const getRoleSpecificMetrics = () => {
    switch (user?.role) {
      case "sales_person":
        return {
          title: "Your Performance Metrics",
          description: "Personal performance analytics and targets",
          showTeamData: false,
        }
      case "showroom_manager":
        return {
          title: "Team Performance Metrics",
          description: "Team performance analytics and showroom insights",
          showTeamData: true,
        }
      case "head_office":
        return {
          title: "Company-wide Performance Analytics",
          description: "Comprehensive performance metrics across all teams and showrooms",
          showTeamData: true,
        }
      default:
        return {
          title: "Performance Metrics",
          description: "Performance analytics",
          showTeamData: false,
        }
    }
  }

  const metrics = getRoleSpecificMetrics()

  const performanceShareData = {
    title: "Performance Analytics Report",
    summary: `${metrics.title} - Key performance indicators and trends`,
    metrics: [
      { label: "Avg Response Time", value: "2.4h" },
      { label: "Conversion Rate", value: "34.2%" },
      { label: "Escalation Rate", value: "12.5%" },
      { label: "Customer Satisfaction", value: "4.7/5" },
    ],
  }

  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
              <span className="font-bold text-muted-foreground">{label}</span>
            </div>
          </div>
          <div className="grid gap-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm capitalize">{entry.dataKey}:</span>
                <span className="font-bold">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const total = customerStatusData.reduce((sum, item) => sum + item.count, 0)
      const percentage = Math.round((data.count / total) * 100)

      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="text-sm">{data.status}:</span>
            <span className="font-bold">
              {data.count} ({percentage}%)
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {typeof label === "string"
                  ? label.includes("h") || label.includes("d")
                    ? "Time Range"
                    : "Stage"
                  : "Category"}
              </span>
              <span className="font-bold text-muted-foreground">{label}</span>
            </div>
          </div>
          <div className="grid gap-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm capitalize">{entry.dataKey}:</span>
                <span className="font-bold">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2.4h</div>
            <p className="text-xs text-muted-foreground">-15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">34.2%</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Escalation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12.5%</div>
            <p className="text-xs text-muted-foreground">-3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">4.7/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Performance Trend */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Monthly Performance Trend</CardTitle>
              <CardDescription>Interactions, conversions, and escalations over time</CardDescription>
            </div>
            <SocialShare data={performanceShareData} type="performance" />
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
                escalations: {
                  label: "Escalations",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<CustomLineTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-1))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversions"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-2))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="escalations"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--chart-3))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Customer Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Status Distribution</CardTitle>
            <CardDescription>Current status breakdown of all customers</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                active: {
                  label: "Active",
                  color: "hsl(var(--chart-1))",
                },
                pending: {
                  label: "Pending",
                  color: "hsl(var(--chart-2))",
                },
                escalated: {
                  label: "Escalated",
                  color: "hsl(var(--chart-3))",
                },
                completed: {
                  label: "Completed",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ status, count }) => {
                      const total = customerStatusData.reduce((sum, item) => sum + item.count, 0)
                      const percentage = Math.round((count / total) * 100)
                      return `${status}: ${percentage}%`
                    }}
                  >
                    {customerStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Analysis</CardTitle>
            <CardDescription>Distribution of response times across all interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeRange" />
                  <YAxis />
                  <ChartTooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Escalation Flow Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Escalation Flow Analysis</CardTitle>
            <CardDescription>Resolution vs escalation rates at each stage</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                resolved: {
                  label: "Resolved",
                  color: "hsl(var(--chart-1))",
                },
                escalated: {
                  label: "Escalated",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={escalationFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <ChartTooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="resolved" stackId="a" fill="hsl(var(--chart-1))" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="escalated" stackId="a" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Table */}
      {metrics.showTeamData && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Breakdown</CardTitle>
            <CardDescription>
              {user?.role === "head_office" ? "All teams and showrooms" : "Your team performance"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <div>Team Member</div>
                <div>Interactions</div>
                <div>Conversions</div>
                <div>Avg Response</div>
                <div>Escalations</div>
                <div>Rating</div>
              </div>
              {[
                {
                  name: "John Sales",
                  interactions: 45,
                  conversions: 12,
                  avgResponse: "2.1h",
                  escalations: 3,
                  rating: 4.8,
                },
                {
                  name: "Sarah Johnson",
                  interactions: 52,
                  conversions: 18,
                  avgResponse: "1.8h",
                  escalations: 2,
                  rating: 4.9,
                },
                {
                  name: "Mike Wilson",
                  interactions: 38,
                  conversions: 15,
                  avgResponse: "3.2h",
                  escalations: 5,
                  rating: 4.5,
                },
              ].map((member, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 text-sm py-2 border-b">
                  <div className="font-medium">{member.name}</div>
                  <div>{member.interactions}</div>
                  <div className="text-chart-1">{member.conversions}</div>
                  <div>{member.avgResponse}</div>
                  <div className="text-destructive">{member.escalations}</div>
                  <div className="text-chart-4">{member.rating}/5</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
