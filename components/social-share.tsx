"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Share2, MessageCircle, Send, Linkedin, Twitter, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SocialShareProps {
  data: {
    title: string
    summary: string
    metrics?: {
      label: string
      value: string | number
    }[]
    customerInfo?: {
      name: string
      status: string
      value: string
    }
  }
  type: "customer" | "performance" | "interaction"
}

export function SocialShare({ data, type }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const generateShareContent = () => {
    let content = `📊 ${data.title}\n\n${data.summary}\n\n`

    if (data.metrics && data.metrics.length > 0) {
      content += "Key Metrics:\n"
      data.metrics.forEach((metric) => {
        if (metric && metric.label && metric.value !== undefined) {
          content += `• ${metric.label}: ${metric.value}\n`
        }
      })
      content += "\n"
    }

    if (data.customerInfo) {
      content += `Customer: ${data.customerInfo.name}\n`
      content += `Status: ${data.customerInfo.status}\n`
      content += `Value: ${data.customerInfo.value}\n\n`
    }

    if (customMessage.trim()) {
      content += `Additional Notes:\n${customMessage}\n\n`
    }

    content += "#CustomerTracking #Sales #CRM"
    return content
  }

  const shareToWhatsApp = () => {
    const content = generateShareContent()
    const url = `https://wa.me/?text=${encodeURIComponent(content)}`
    window.open(url, "_blank")
    toast({
      title: "Shared to WhatsApp",
      description: "Content has been prepared for WhatsApp sharing",
    })
  }

  const shareToTelegram = () => {
    const content = generateShareContent()
    const url = `https://t.me/share/url?text=${encodeURIComponent(content)}`
    window.open(url, "_blank")
    toast({
      title: "Shared to Telegram",
      description: "Content has been prepared for Telegram sharing",
    })
  }

  const shareToLinkedIn = () => {
    const content = generateShareContent()
    const url = `https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(content)}`
    window.open(url, "_blank")
    toast({
      title: "Shared to LinkedIn",
      description: "Content has been prepared for LinkedIn sharing",
    })
  }

  const shareToTwitter = () => {
    const content = generateShareContent()
    // Twitter has character limits, so we'll create a shorter version
    const shortContent = `📊 ${data.title}\n\n${data.summary}\n\n#CustomerTracking #Sales`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shortContent)}`
    window.open(url, "_blank")
    toast({
      title: "Shared to Twitter",
      description: "Content has been prepared for Twitter sharing",
    })
  }

  const copyToClipboard = async () => {
    const content = generateShareContent()
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy content to clipboard",
        variant: "destructive",
      })
    }
  }

  const getShareIcon = () => {
    switch (type) {
      case "customer":
        return <MessageCircle className="h-4 w-4" />
      case "performance":
        return <Share2 className="h-4 w-4" />
      case "interaction":
        return <Send className="h-4 w-4" />
      default:
        return <Share2 className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {getShareIcon()}
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {data.title}</DialogTitle>
          <DialogDescription>Share this information with your team or clients</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{data.title}</CardTitle>
              <CardDescription className="text-xs">{data.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {data.metrics && data.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {data.metrics.map((metric, index) =>
                    metric && metric.label ? (
                      <div key={index} className="text-xs">
                        <span className="text-muted-foreground">{metric.label}:</span>
                        <span className="font-medium ml-1">{metric.value || "N/A"}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
              {data.customerInfo && (
                <div className="flex items-center gap-2 text-xs">
                  <span>{data.customerInfo.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {data.customerInfo.status}
                  </Badge>
                  <span className="text-primary font-medium">{data.customerInfo.value}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Message (Optional)</label>
            <Textarea
              placeholder="Add a personal message or context..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Social Platform Buttons */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Share to:</div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={shareToWhatsApp} className="justify-start bg-transparent">
                <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                WhatsApp
              </Button>
              <Button variant="outline" onClick={shareToTelegram} className="justify-start bg-transparent">
                <Send className="h-4 w-4 mr-2 text-blue-500" />
                Telegram
              </Button>
              <Button variant="outline" onClick={shareToLinkedIn} className="justify-start bg-transparent">
                <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                LinkedIn
              </Button>
              <Button variant="outline" onClick={shareToTwitter} className="justify-start bg-transparent">
                <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                Twitter
              </Button>
            </div>

            {/* Copy to Clipboard */}
            <Button variant="secondary" onClick={copyToClipboard} className="w-full">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
