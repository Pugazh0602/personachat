"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, MessageSquare, Users, TrendingUp, Clock, Brain } from "lucide-react"

const mockData = {
  totalChats: 47,
  totalMessages: 1284,
  activePersonas: 8,
  avgSessionTime: "12m 34s",
  topPersonas: [
    { name: "Dr. Sarah Chen", interactions: 156, percentage: 35 },
    { name: "Marcus Thompson", interactions: 134, percentage: 30 },
    { name: "Elena Rodriguez", interactions: 98, percentage: 22 },
    { name: "Prof. Williams", interactions: 58, percentage: 13 },
  ],
  conversationTopics: [
    { topic: "AI & Technology", count: 23, percentage: 49 },
    { topic: "Creative Projects", count: 15, percentage: 32 },
    { topic: "Business Strategy", count: 9, percentage: 19 },
  ],
  weeklyActivity: [
    { day: "Mon", messages: 45 },
    { day: "Tue", messages: 62 },
    { day: "Wed", messages: 38 },
    { day: "Thu", messages: 71 },
    { day: "Fri", messages: 55 },
    { day: "Sat", messages: 29 },
    { day: "Sun", messages: 33 },
  ],
}

export default function InsightsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Conversation Insights</h1>
        <p className="text-gray-600 mt-2">Analyze your AI persona interactions and discover patterns</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalChats}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalMessages.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Personas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.activePersonas}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.avgSessionTime}</div>
            <p className="text-xs text-muted-foreground">+2m from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Personas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Most Engaged Personas
            </CardTitle>
            <CardDescription>Your most frequently used AI personas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topPersonas.map((persona, index) => (
                <div key={persona.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{persona.name}</p>
                      <p className="text-sm text-gray-600">{persona.interactions} interactions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{persona.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversation Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Popular Topics
            </CardTitle>
            <CardDescription>Most discussed conversation themes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.conversationTopics.map((topic) => (
                <div key={topic.topic} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{topic.topic}</span>
                    <span className="text-sm text-gray-600">{topic.count} chats</span>
                  </div>
                  <Progress value={topic.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Activity
          </CardTitle>
          <CardDescription>Your conversation activity over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-64 gap-4">
            {mockData.weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="bg-purple-600 rounded-t w-full transition-all hover:bg-purple-700"
                  style={{
                    height: `${(day.messages / Math.max(...mockData.weeklyActivity.map((d) => d.messages))) * 200}px`,
                    minHeight: "20px",
                  }}
                />
                <div className="text-center">
                  <p className="text-sm font-medium">{day.messages}</p>
                  <p className="text-xs text-gray-600">{day.day}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
