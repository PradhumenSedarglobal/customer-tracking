"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { usePermissions, useDataFilter } from "@/hooks/use-permissions"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Clock,
  User,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Bot,
  Send,
} from "lucide-react"

interface Interaction {
  id: string
  customerName: string
  customerId: string
  type: "call" | "email" | "message" | "meeting"
  message: string
  timestamp: string
  status: "completed" | "pending" | "in_progress" | "escalated"
  assignedTo: string
  assignedToRole: string
  nextAction: string
  priority: "high" | "medium" | "low"
  telegram_customer_id?: string
  showroom_code?: string
  escalationLevel: number // 0: Sales Person, 1: Showroom Manager, 2: Head Office
  aiSummary?: string
  followUpDate?: string
}

export function InteractionManagement() {
  const { user } = useAuth()
  const permissions = usePermissions()
  const { filterInteractionData } = useDataFilter()
  const { toast } = useToast()
  const [isAddingInteraction, setIsAddingInteraction] = useState(false)
  const [selectedInteraction, setSelectedInteraction] = useState<Interaction | null>(null)
  const [newInteraction, setNewInteraction] = useState({
    customerId: "",
    customerName: "",
    type: "call" as const,
    message: "",
    priority: "medium" as const,
    nextAction: "",
    followUpDate: "",
  })

  // Mock interaction data with role-based filtering
  const allInteractions: Interaction[] = [
    {
      id: "1",
      customerName: "John Smith",
      customerId: "1",
      type: "call",
      message: "Initial contact regarding product inquiry. Customer interested in premium package.",
      timestamp: "2024-01-15 10:30 AM",
      status: "completed",
      assignedTo: "John Sales",
      assignedToRole: "sales_person",
      nextAction: "Follow up in 2 days",
      priority: "high",
      telegram_customer_id: "sales_123",
      showroom_code: "SR001",
      escalationLevel: 0,
      aiSummary:
        "Customer shows strong interest in premium package. Discussed pricing and features. Ready for follow-up call.",
      followUpDate: "2024-01-17",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerId: "2",
      type: "email",
      message: "Sent product catalog and pricing information. Awaiting customer response.",
      timestamp: "2024-01-15 09:15 AM",
      status: "pending",
      assignedTo: "John Sales",
      assignedToRole: "sales_person",
      nextAction: "Call if no response by tomorrow",
      priority: "medium",
      telegram_customer_id: "sales_456",
      showroom_code: "SR001",
      escalationLevel: 0,
      followUpDate: "2024-01-16",
    },
    {
      id: "3",
      customerName: "Mike Wilson",
      customerId: "3",
      type: "message",
      message: "Customer complaint about delivery delay. Escalated to showroom manager.",
      timestamp: "2024-01-14 04:45 PM",
      status: "escalated",
      assignedTo: "Jane Manager",
      assignedToRole: "showroom_manager",
      nextAction: "Manager to contact within 24 hours",
      priority: "high",
      telegram_customer_id: "sales_789",
      showroom_code: "SR002",
      escalationLevel: 1,
      aiSummary: "Customer complaint regarding delivery delay. Issue escalated to management level for resolution.",
    },
  ]

  const interactions = filterInteractionData(allInteractions)

  const handleAddInteraction = () => {
    if (!newInteraction.customerId || !newInteraction.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Mock AI summary generation
    const aiSummary = `AI Summary: ${newInteraction.type} interaction with ${newInteraction.customerName}. ${newInteraction.message.slice(0, 100)}...`

    const interaction: Interaction = {
      id: Date.now().toString(),
      ...newInteraction,
      timestamp: new Date().toLocaleString(),
      status: "completed",
      assignedTo: user?.name || "Unknown",
      assignedToRole: user?.role || "sales_person",
      escalationLevel: 0,
      aiSummary,
    }

    toast({
      title: "Interaction Added",
      description: "New customer interaction has been recorded",
    })

    setNewInteraction({
      customerId: "",
      customerName: "",
      type: "call",
      message: "",
      priority: "medium",
      nextAction: "",
      followUpDate: "",
    })
    setIsAddingInteraction(false)
  }

  const handleEscalate = (interaction: Interaction) => {
    const canEscalate =
      (interaction.escalationLevel === 0 && permissions.canEscalateToManager) ||
      (interaction.escalationLevel === 1 && permissions.canEscalateToHeadOffice)

    if (!canEscalate) {
      toast({
        title: "Cannot Escalate",
        description: "You don't have permission to escalate this interaction",
        variant: "destructive",
      })
      return
    }

    const nextLevel = interaction.escalationLevel + 1
    const nextRole = nextLevel === 1 ? "Showroom Manager" : "Head Office"

    toast({
      title: "Interaction Escalated",
      description: `Interaction has been escalated to ${nextRole}`,
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "meeting":
        return <User className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "in_progress":
        return <Badge variant="outline">In Progress</Badge>
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

  const getEscalationBadge = (level: number) => {
    switch (level) {
      case 0:
        return (
          <Badge variant="outline" className="text-xs">
            Sales
          </Badge>
        )
      case 1:
        return (
          <Badge variant="secondary" className="text-xs">
            Manager
          </Badge>
        )
      case 2:
        return (
          <Badge variant="destructive" className="text-xs">
            Head Office
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            Level {level}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Interaction Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interaction Management</h2>
          <p className="text-muted-foreground">Manage customer interactions and follow-ups</p>
        </div>
        <Dialog open={isAddingInteraction} onOpenChange={setIsAddingInteraction}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Interaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Interaction</DialogTitle>
              <DialogDescription>Record a new customer interaction</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input
                    id="customerId"
                    value={newInteraction.customerId}
                    onChange={(e) => setNewInteraction({ ...newInteraction, customerId: e.target.value })}
                    placeholder="Enter customer ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={newInteraction.customerName}
                    onChange={(e) => setNewInteraction({ ...newInteraction, customerName: e.target.value })}
                    placeholder="Enter customer name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Interaction Type</Label>
                  <Select
                    value={newInteraction.type}
                    onValueChange={(value) => {
                      if (
                        value &&
                        (value === "call" || value === "email" || value === "message" || value === "meeting")
                      ) {
                        setNewInteraction({ ...newInteraction, type: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="message">Message</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newInteraction.priority}
                    onValueChange={(value) => {
                      if (value && (value === "high" || value === "medium" || value === "low")) {
                        setNewInteraction({ ...newInteraction, priority: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Interaction Details</Label>
                <Textarea
                  id="message"
                  value={newInteraction.message}
                  onChange={(e) => setNewInteraction({ ...newInteraction, message: e.target.value })}
                  placeholder="Describe the interaction..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextAction">Next Action</Label>
                <Input
                  id="nextAction"
                  value={newInteraction.nextAction}
                  onChange={(e) => setNewInteraction({ ...newInteraction, nextAction: e.target.value })}
                  placeholder="What's the next step?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={newInteraction.followUpDate}
                  onChange={(e) => setNewInteraction({ ...newInteraction, followUpDate: e.target.value })}
                />
              </div>

              <Button onClick={handleAddInteraction} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Add Interaction
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Interaction Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{interactions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {interactions.filter((i) => i.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Escalated Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {interactions.filter((i) => i.status === "escalated").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">
              {interactions.filter((i) => i.status === "completed" && i.timestamp.includes("2024-01-15")).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Interactions</CardTitle>
          <CardDescription>
            {permissions.dataScope === "own"
              ? "Your customer interactions"
              : permissions.dataScope === "showroom"
                ? "Showroom interactions"
                : "All customer interactions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No interactions found with your current permissions
              </div>
            ) : (
              interactions.map((interaction, index) => (
                <div key={interaction.id} className="relative">
                  {index < interactions.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>
                  )}

                  <div className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary">
                        {getTypeIcon(interaction.type)}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{interaction.customerName}</h4>
                          {getStatusBadge(interaction.status)}
                          {getPriorityBadge(interaction.priority)}
                          {getEscalationBadge(interaction.escalationLevel)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {interaction.timestamp}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{interaction.message}</p>

                      {interaction.aiSummary && (
                        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                          <Bot className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-primary mb-1">AI Summary</p>
                            <p className="text-sm text-muted-foreground">{interaction.aiSummary}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {interaction.assignedTo}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowRight className="h-3 w-3" />
                            {interaction.nextAction}
                          </span>
                          {interaction.followUpDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Follow-up: {interaction.followUpDate}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedInteraction(interaction)}>
                            View Details
                          </Button>
                          {interaction.status === "pending" && (
                            <Button size="sm">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Button>
                          )}
                          {(interaction.escalationLevel === 0 && permissions.canEscalateToManager) ||
                          (interaction.escalationLevel === 1 && permissions.canEscalateToHeadOffice) ? (
                            <Button size="sm" variant="destructive" onClick={() => handleEscalate(interaction)}>
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Escalate
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interaction Detail Modal */}
      {selectedInteraction && (
        <Dialog open={!!selectedInteraction} onOpenChange={() => setSelectedInteraction(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Interaction Details</DialogTitle>
              <DialogDescription>
                {selectedInteraction.type} with {selectedInteraction.customerName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Customer</Label>
                  <p className="font-medium">{selectedInteraction.customerName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Type</Label>
                  <p className="font-medium capitalize">{selectedInteraction.type}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedInteraction.status)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Priority</Label>
                  <div className="mt-1">{getPriorityBadge(selectedInteraction.priority)}</div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Interaction Details</Label>
                <p className="mt-1 text-sm">{selectedInteraction.message}</p>
              </div>

              {selectedInteraction.aiSummary && (
                <div>
                  <Label className="text-xs text-muted-foreground">AI Summary</Label>
                  <div className="mt-1 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm">{selectedInteraction.aiSummary}</p>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-xs text-muted-foreground">Next Action</Label>
                <p className="mt-1 text-sm">{selectedInteraction.nextAction}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Assigned To</Label>
                  <p className="font-medium">{selectedInteraction.assignedTo}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Timestamp</Label>
                  <p className="font-medium">{selectedInteraction.timestamp}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
