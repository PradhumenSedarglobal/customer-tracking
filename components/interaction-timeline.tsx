"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, MessageSquare, Phone, Mail, ArrowRight } from "lucide-react"

export function InteractionTimeline() {
  // Mock interaction data - would come from API in real app
  const interactions = [
    {
      id: "1",
      customerName: "John Smith",
      type: "call",
      message: "Initial contact regarding product inquiry. Customer interested in premium package.",
      timestamp: "2024-01-15 10:30 AM",
      status: "completed",
      assignedTo: "Sales Person",
      nextAction: "Follow up in 2 days",
      priority: "high",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      type: "email",
      message: "Sent product catalog and pricing information. Awaiting customer response.",
      timestamp: "2024-01-15 09:15 AM",
      status: "pending",
      assignedTo: "Sales Person",
      nextAction: "Call if no response by tomorrow",
      priority: "medium",
    },
    {
      id: "3",
      customerName: "Mike Wilson",
      type: "message",
      message: "Customer complaint about delivery delay. Escalated to showroom manager.",
      timestamp: "2024-01-14 04:45 PM",
      status: "escalated",
      assignedTo: "Showroom Manager",
      nextAction: "Manager to contact within 24 hours",
      priority: "high",
    },
    {
      id: "4",
      customerName: "Lisa Brown",
      type: "call",
      message: "Product demonstration completed. Customer requested quote for bulk order.",
      timestamp: "2024-01-14 02:20 PM",
      status: "in_progress",
      assignedTo: "Sales Person",
      nextAction: "Prepare and send quote",
      priority: "high",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "call":
        return <Phone className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Interaction Timeline</CardTitle>
          <CardDescription>Chronological view of all customer interactions and follow-ups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interactions.map((interaction, index) => (
              <div key={interaction.id} className="relative">
                {/* Timeline line */}
                {index < interactions.length - 1 && <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>}

                <div className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  {/* Timeline dot and icon */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-primary">
                      {getTypeIcon(interaction.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{interaction.customerName}</h4>
                        {getStatusBadge(interaction.status)}
                        {getPriorityBadge(interaction.priority)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {interaction.timestamp}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{interaction.message}</p>

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
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {interaction.status === "pending" && <Button size="sm">Take Action</Button>}
                      </div>
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
