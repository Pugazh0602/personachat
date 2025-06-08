"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Palette, Shield, Download } from "lucide-react"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [displayName, setDisplayName] = useState("")
  const [isTtsEnabled, setIsTtsEnabled] = useState(false)

  useEffect(() => {
    const storedLanguage = localStorage.getItem("appLanguage")
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage)
    }
    const storedDisplayName = localStorage.getItem("displayName")
    if (storedDisplayName) {
      setDisplayName(storedDisplayName)
    }
    const storedTtsPreference = localStorage.getItem("isTtsEnabled")
    if (storedTtsPreference !== null) {
      setIsTtsEnabled(JSON.parse(storedTtsPreference))
    }
  }, [])

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    localStorage.setItem("appLanguage", value)
  }

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
    localStorage.setItem("displayName", e.target.value)
  }

  const handleTtsToggle = (checked: boolean) => {
    setIsTtsEnabled(checked)
    localStorage.setItem("isTtsEnabled", JSON.stringify(checked))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-2">Customize your PersonaChat experience</p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General
            </CardTitle>
            <CardDescription>Basic application settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Display Name</Label>
                <Input
                  id="username"
                  placeholder="Your name"
                  value={displayName}
                  onChange={handleDisplayNameChange}
                />
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="thanglish">Thanglish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save conversations</Label>
                <p className="text-sm text-gray-600">Automatically save your chat history</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Text-to-Speech (TTS)</Label>
                <p className="text-sm text-gray-600">Enable bot responses to be spoken aloud</p>
              </div>
              <Switch checked={isTtsEnabled} onCheckedChange={handleTtsToggle} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push notifications</Label>
                <p className="text-sm text-gray-600">Get notified about new features</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly insights</Label>
                <p className="text-sm text-gray-600">Receive weekly conversation summaries</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your privacy and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data collection</Label>
                <p className="text-sm text-gray-600">Allow anonymous usage analytics</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Conversation encryption</Label>
                <p className="text-sm text-gray-600">Encrypt stored conversations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
