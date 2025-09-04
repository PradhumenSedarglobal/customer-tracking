"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar } from "lucide-react"

// Mock analytics data
const monthlyRevenue = [
  { month: "Jan", revenue: 45000, orders: 120, customers: 89 },
  { month: "Feb", revenue: 52000, orders: 135, customers: 102 },
  { month: "Mar", revenue: 48000, orders: 128, customers: 95 },
  { month: "Apr", revenue: 61000, orders: 156, customers: 118 },
  { month: "May", revenue: 55000, orders: 142, customers: 108 },
  { month: "Jun", revenue: 67000, orders: 178, customers: 134 },
]

const productCategories = [
  { name: "Electronics", value: 35, revenue: 234000, color: "#3b82f6" },
  { name: "Home & Garden", value: 25, revenue: 167000, color: "#22c55e" },
  { name: "Fashion", value: 20, revenue: 134000, color: "#f59e0b" },
  { name: "Sports", value: 12, revenue: 80000, color: "#ef4444" },
  { name: "Books", value: 8, revenue: 53000, color: "#8b5cf6" },
]

const customerSegments = [
  { segment: "New Customers", count: 45, percentage: 30 },
  { segment: "Returning Customers", count: 78, percentage: 52 },
  { segment: "VIP Customers", count: 27, percentage: 18 },
]

const dailyTraffic = [
  { day: "Mon", visitors: 245, conversions: 23 },
  { day: "Tue", visitors: 289, conversions: 31 },
  { day: "Wed", visitors: 312, conversions: 28 },
  { day: "Thu", visitors: 278, conversions: 35 },
  { day: "Fri", visitors: 356, conversions: 42 },
  { day: "Sat", visitors: 423, conversions: 48 },
  { day: "Sun", visitors: 198, conversions: 19 },
]

export function ShowroomAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Showroom Analytics</h2>
          <p className="text-muted-foreground">Comprehensive analytics and insights for your showroom</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button>Export Analytics</Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,000</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">859</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">646</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$382</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +4.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue, orders, and customer growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                    orders: { label: "Orders", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="var(--color-revenue)"
                        fill="var(--color-revenue)"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="orders"
                        stackId="2"
                        stroke="var(--color-orders)"
                        fill="var(--color-orders)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Product category performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    electronics: { label: "Electronics", color: "#3b82f6" },
                    home: { label: "Home & Garden", color: "#22c55e" },
                    fashion: { label: "Fashion", color: "#f59e0b" },
                    sports: { label: "Sports", color: "#ef4444" },
                    books: { label: "Books", color: "#8b5cf6" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {productCategories.map((entry, index) => (
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
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Category Performance</CardTitle>
              <CardDescription>Revenue and sales data by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }}></div>
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.value}% of total sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${category.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Breakdown of customer types and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{segment.segment}</p>
                        <p className="text-sm text-muted-foreground">{segment.count} customers</p>
                      </div>
                      <Badge variant="outline">{segment.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>Monthly customer acquisition trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    customers: { label: "New Customers", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="customers" stroke="var(--color-customers)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Traffic & Conversions</CardTitle>
              <CardDescription>Visitor traffic and conversion rates throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  visitors: { label: "Visitors", color: "hsl(var(--chart-1))" },
                  conversions: { label: "Conversions", color: "hsl(var(--chart-2))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyTraffic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip />
                    <Bar dataKey="visitors" fill="var(--color-visitors)" />
                    <Bar dataKey="conversions" fill="var(--color-conversions)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
