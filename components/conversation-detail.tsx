"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Search,
} from "lucide-react"
import { useState } from "react"

interface ConversationDetailProps {
  personId?: string
  personName?: string
  onBack: () => void
  showAllPersons?: boolean
}

export function ConversationDetail({ personId, personName, onBack, showAllPersons = false }: ConversationDetailProps) {
  const [selectedPerson, setSelectedPerson] = useState(personId || "defaultPersonId")
  const [selectedOrder, setSelectedOrder] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("arabic")

  const allSalesPersons = [
    { id: "1", name: "Ahmed Hassan", showroom: "Dubai Mall", country: "UAE" },
    { id: "2", name: "Fatima Al-Zahra", showroom: "Dubai Mall", country: "UAE" },
    { id: "3", name: "Omar Khalil", showroom: "Abu Dhabi Central", country: "UAE" },
    { id: "4", name: "Sarah Abdullah", showroom: "Riyadh Gallery", country: "Saudi Arabia" },
    { id: "5", name: "Mohammed Al-Rashid", showroom: "Jeddah Red Sea Mall", country: "Saudi Arabia" },
    { id: "6", name: "Layla Ibrahim", showroom: "Kuwait City Center", country: "Kuwait" },
  ]

  const getConversationData = (personId: string) => {
    const conversations = {
      "1": {
        person: {
          id: "1",
          name: "Ahmed Hassan",
          role: "Sales Person",
          showroom: "Dubai Mall",
          phone: "+971-50-123-4567",
          email: "ahmed.hassan@company.com",
        },
        orders: [
          { id: "ORD-001", customerName: "John Smith", value: "$2,500", status: "pending" },
          { id: "ORD-002", customerName: "Sarah Johnson", value: "$1,200", status: "completed" },
          { id: "ORD-003", customerName: "Mike Wilson", value: "$3,800", status: "in_progress" },
        ],
        messages: [
          {
            id: 1,
            orderId: "ORD-001",
            customerName: "John Smith",
            timestamp: "2024-01-15 09:30 AM",
            type: "outgoing",
            channel: "WhatsApp",
            message: {
              english:
                "Hello Mr. Smith, thank you for your interest in our premium furniture collection. I wanted to follow up on your inquiry about the dining set.",
              arabic:
                "مرحباً سيد سميث، شكراً لاهتمامك بمجموعة الأثاث المميزة لدينا. أردت متابعة استفسارك حول طقم الطعام.",
            },
            status: "delivered",
            response: null,
          },
          {
            id: 2,
            orderId: "ORD-001",
            customerName: "John Smith",
            timestamp: "2024-01-15 02:15 PM",
            type: "incoming",
            channel: "WhatsApp",
            message: {
              english:
                "Hi Ahmed, yes I'm still interested. Can you tell me more about the warranty and delivery options?",
              arabic: "مرحباً أحمد، نعم ما زلت مهتماً. هل يمكنك إخباري المزيد عن الضمان وخيارات التوصيل؟",
            },
            status: "received",
            response: "Customer showed interest, asking about warranty and delivery",
          },
          {
            id: 3,
            orderId: "ORD-001",
            customerName: "John Smith",
            timestamp: "2024-01-15 02:45 PM",
            type: "outgoing",
            channel: "WhatsApp",
            message: {
              english:
                "Great! Our dining sets come with a 5-year warranty and we offer free delivery within Dubai. Would you like to schedule a showroom visit this week?",
              arabic:
                "رائع! تأتي أطقم الطعام لدينا بضمان 5 سنوات ونقدم توصيل مجاني داخل دبي. هل تود تحديد موعد لزيارة المعرض هذا الأسبوع؟",
            },
            status: "delivered",
            response: "AI suggested follow-up with warranty details and scheduling",
          },
          {
            id: 4,
            orderId: "ORD-001",
            customerName: "John Smith",
            timestamp: "2024-01-16 10:00 AM",
            type: "outgoing",
            channel: "WhatsApp",
            message: {
              english: "Following up on our conversation yesterday. Are you available for a showroom visit this week?",
              arabic: "متابعة لمحادثتنا أمس. هل أنت متاح لزيارة المعرض هذا الأسبوع؟",
            },
            status: "delivered",
            response: "AI recommended follow-up after 24 hours",
          },
          {
            id: 5,
            orderId: "ORD-001",
            customerName: "John Smith",
            timestamp: "2024-01-16 10:00 AM",
            type: "system",
            channel: "System",
            message: {
              english: "No response received after 24 hours. Case escalated to Showroom Manager.",
              arabic: "لم يتم تلقي رد بعد 24 ساعة. تم تصعيد الحالة إلى مدير المعرض.",
            },
            status: "escalated",
            response: "Customer not responding, escalated to manager level",
          },
          {
            id: 6,
            orderId: "ORD-002",
            customerName: "Sarah Johnson",
            timestamp: "2024-01-14 11:20 AM",
            type: "outgoing",
            channel: "Telegram",
            message: {
              english:
                "Hello Sarah, thank you for visiting our showroom yesterday. I wanted to follow up on the bedroom set you were interested in.",
              arabic: "مرحباً سارة، شكراً لزيارتك معرضنا أمس. أردت متابعة طقم غرفة النوم الذي كنت مهتمة به.",
            },
            status: "delivered",
            response: "AI suggested personalized follow-up based on showroom visit",
          },
          {
            id: 7,
            orderId: "ORD-002",
            customerName: "Sarah Johnson",
            timestamp: "2024-01-14 03:30 PM",
            type: "incoming",
            channel: "Telegram",
            message: {
              english: "Hi Ahmed, I've decided to go with the oak bedroom set. Can we proceed with the order?",
              arabic: "مرحباً أحمد، لقد قررت اختيار طقم غرفة النوم من خشب البلوط. هل يمكننا المتابعة مع الطلب؟",
            },
            status: "received",
            response: "Customer confirmed purchase, ready to proceed",
          },
          {
            id: 8,
            orderId: "ORD-002",
            customerName: "Sarah Johnson",
            timestamp: "2024-01-14 04:00 PM",
            type: "outgoing",
            channel: "Telegram",
            message: {
              english:
                "Excellent choice! I'll prepare the order form and send you the payment details. The total comes to $1,200 including delivery.",
              arabic:
                "اختيار ممتاز! سأقوم بإعداد نموذج الطلب وإرسال تفاصيل الدفع لك. المجموع 1,200 دولار شامل التوصيل.",
            },
            status: "delivered",
            response: "AI confirmed order processing and payment details",
          },
        ],
      },
      // ... existing code for other persons ...
    }

    return (
      conversations[personId as keyof typeof conversations] || {
        person: {
          id: personId,
          name: "Unknown Person",
          role: "Sales Person",
          showroom: "Unknown",
          phone: "N/A",
          email: "N/A",
        },
        orders: [],
        messages: [],
      }
    )
  }

  const currentPerson = selectedPerson || personId || "1"
  const conversationData = getConversationData(currentPerson)

  const filteredMessages = conversationData.messages.filter((message) => {
    const matchesOrder = !selectedOrder || message.orderId === selectedOrder
    const messageText =
      typeof message.message === "string" ? message.message : `${message.message.english} ${message.message.arabic}`
    const matchesSearch =
      !searchQuery ||
      messageText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesOrder && matchesSearch
  })

  const getMessageIcon = (type: string, status: string) => {
    switch (type) {
      case "incoming":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "outgoing":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "system":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "received":
        return <CheckCircle className="h-3 w-3 text-blue-500" />
      case "escalated":
        return <AlertTriangle className="h-3 w-3 text-orange-500" />
      case "failed":
        return <XCircle className="h-3 w-3 text-red-500" />
      default:
        return <Clock className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to {showAllPersons ? "All Follow-ups" : "Showroom"}
        </Button>
      </div>

      {showAllPersons && (
        <Card>
          <CardHeader>
            <CardTitle>All Sales Persons Follow-up Data</CardTitle>
            <CardDescription>View conversation details for all sales persons in this showroom</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold">Sales Team Overview</h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {allSalesPersons.map((person) => {
                  const personData = getConversationData(person.id)
                  return (
                    <Card
                      key={person.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedPerson(person.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{person.name}</h4>
                            <p className="text-sm text-muted-foreground">{person.showroom}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {personData.messages.length} Messages
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {personData.orders.length} Orders
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="text-sm font-medium mb-2 block">Select Sales Person for Detailed View</label>
              <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sales person" />
                </SelectTrigger>
                <SelectContent>
                  {allSalesPersons.map((person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.name} - {person.showroom}, {person.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>{conversationData.person.name}</CardTitle>
              <CardDescription>
                {conversationData.person.role} - {conversationData.person.showroom}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{conversationData.person.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{conversationData.person.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{conversationData.messages.length} Total Messages</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Order</label>
              <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="All Orders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {conversationData.orders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.id} - {order.customerName} ({order.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Search Messages</label>
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Results</label>
              <div className="flex items-center gap-2 pt-2">
                <Badge variant="outline">{filteredMessages.length} Messages</Badge>
                <Badge variant="secondary">{conversationData.orders.length} Orders</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversation Timeline</CardTitle>
          <CardDescription>
            Detailed message history and customer interactions
            {selectedOrder && ` for Order ${selectedOrder}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="arabic">العربية</TabsTrigger>
              <TabsTrigger value="english">English</TabsTrigger>
            </TabsList>

            <TabsContent value="arabic" className="space-y-4 max-h-[600px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">لا توجد رسائل تطابق المرشحات الخاصة بك</div>
              ) : (
                filteredMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    {message.type === "system" ? (
                      <div className="flex justify-center">
                        <div className="bg-yellow-100 border border-yellow-200 rounded-lg px-4 py-2 max-w-md text-center shadow-sm">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="text-xs font-medium text-yellow-700">تنبيه النظام</span>
                          </div>
                          <p className="text-sm text-yellow-800" dir="rtl">
                            {typeof message.message === "string" ? message.message : message.message.arabic}
                          </p>
                          <div className="text-xs text-yellow-600 mt-1">{message.timestamp}</div>
                        </div>
                      </div>
                    ) : message.type === "incoming" ? (
                      <div className="flex justify-start">
                        <div className="max-w-[70%]">
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs bg-gray-100">
                                {message.orderId}
                              </Badge>
                              <span className="font-medium text-sm text-gray-800">{message.customerName}</span>
                              <Badge variant="secondary" className="text-xs">
                                {message.channel}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-900 leading-relaxed" dir="rtl">
                              {typeof message.message === "string" ? message.message : message.message.arabic}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                              {getStatusIcon(message.status)}
                            </div>
                          </div>
                          {message.response && (
                            <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 mt-2 ml-4">
                              <p className="text-xs font-medium text-gray-600 mb-1">📊 تحليل الذكي:</p>
                              <p className="text-sm text-gray-700 italic">{message.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="max-w-[70%]">
                          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 justify-end">
                              <Badge variant="outline" className="text-xs bg-blue-400 text-white border-blue-300">
                                {message.orderId}
                              </Badge>
                              <span className="font-medium text-sm">{message.customerName}</span>
                              <Badge variant="secondary" className="text-xs bg-blue-400 text-white">
                                {message.channel}
                              </Badge>
                            </div>
                            <p className="text-sm leading-relaxed text-right" dir="rtl">
                              {typeof message.message === "string" ? message.message : message.message.arabic}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-blue-100">{message.timestamp}</span>
                              <div className="text-blue-100">{getStatusIcon(message.status)}</div>
                            </div>
                          </div>
                          {message.response && (
                            <div className="bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 mt-2 mr-4">
                              <p className="text-xs font-medium text-blue-700 mb-1 text-right">🤖 قرار الذكي:</p>
                              <p className="text-sm text-blue-800 text-right italic">{message.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="english" className="space-y-4 max-h-[600px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No messages found matching your filters</div>
              ) : (
                filteredMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    {message.type === "system" ? (
                      <div className="flex justify-center">
                        <div className="bg-yellow-100 border border-yellow-200 rounded-lg px-4 py-2 max-w-md text-center shadow-sm">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="text-xs font-medium text-yellow-700">SYSTEM ALERT</span>
                          </div>
                          <p className="text-sm text-yellow-800">
                            {typeof message.message === "string" ? message.message : message.message.english}
                          </p>
                          <div className="text-xs text-yellow-600 mt-1">{message.timestamp}</div>
                        </div>
                      </div>
                    ) : message.type === "incoming" ? (
                      <div className="flex justify-start">
                        <div className="max-w-[70%]">
                          <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs bg-gray-100">
                                {message.orderId}
                              </Badge>
                              <span className="font-medium text-sm text-gray-800">{message.customerName}</span>
                              <Badge variant="secondary" className="text-xs">
                                {message.channel}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-900 leading-relaxed">
                              {typeof message.message === "string" ? message.message : message.message.english}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                              {getStatusIcon(message.status)}
                            </div>
                          </div>
                          {message.response && (
                            <div className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 mt-2 ml-4">
                              <p className="text-xs font-medium text-gray-600 mb-1">📊 AI Analysis:</p>
                              <p className="text-sm text-gray-700 italic">{message.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="max-w-[70%]">
                          <div className="bg-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-2 mb-2 justify-end">
                              <Badge variant="outline" className="text-xs bg-blue-400 text-white border-blue-300">
                                {message.orderId}
                              </Badge>
                              <span className="font-medium text-sm">{message.customerName}</span>
                              <Badge variant="secondary" className="text-xs bg-blue-400 text-white">
                                {message.channel}
                              </Badge>
                            </div>
                            <p className="text-sm leading-relaxed">
                              {typeof message.message === "string" ? message.message : message.message.english}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-blue-100">{message.timestamp}</span>
                              <div className="text-blue-100">{getStatusIcon(message.status)}</div>
                            </div>
                          </div>
                          {message.response && (
                            <div className="bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 mt-2 mr-4">
                              <p className="text-xs font-medium text-blue-700 mb-1 text-right">🤖 AI Decision:</p>
                              <p className="text-sm text-blue-800 text-right italic">{message.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
