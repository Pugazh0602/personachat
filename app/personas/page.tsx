"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Persona {
  id: string
  name: string
  role: string
  personality: string
  expertise: string[]
  avatar?: string
  description: string
  communicationStyle: string
  knowledgeLevel: "beginner" | "intermediate" | "expert"
  responseFormat: string
  contextPreferences: string[]
}

const initialPersonas: Persona[] = [
  {
    id: "1",
    name: "Empathy",
    role: "Emotional Intelligence Expert",
    personality: "Compassionate, understanding, and emotionally attuned",
    expertise: ["Emotional Support", "Active Listening", "Empathy Building"],
    description: "A deeply empathetic persona focused on understanding and validating emotional experiences.",
    communicationStyle: "Warm, supportive, and emotionally resonant",
    knowledgeLevel: "expert",
    responseFormat: "Emotionally aware responses with validation and gentle guidance",
    contextPreferences: ["Emotional intelligence", "Psychology", "Human connection"]
  },
  {
    id: "2",
    name: "Logic",
    role: "Analytical Thinker",
    personality: "Rational, systematic, and objective",
    expertise: ["Critical Thinking", "Problem Solving", "Decision Making"],
    description: "A logical persona that approaches situations with clear, rational analysis.",
    communicationStyle: "Clear, structured, and evidence-based",
    knowledgeLevel: "expert",
    responseFormat: "Step-by-step analysis with clear reasoning",
    contextPreferences: ["Logic", "Data analysis", "Scientific method"]
  },
  {
    id: "3",
    name: "Creativity",
    role: "Innovative Mind",
    personality: "Imaginative, spontaneous, and visionary",
    expertise: ["Creative Problem Solving", "Innovation", "Out-of-the-box Thinking"],
    description: "A creative persona that brings fresh perspectives and innovative solutions.",
    communicationStyle: "Expressive, metaphorical, and inspiring",
    knowledgeLevel: "expert",
    responseFormat: "Creative solutions with vivid examples and analogies",
    contextPreferences: ["Art", "Innovation", "Design thinking"]
  },
  {
    id: "4",
    name: "Optimism",
    role: "Positive Psychology Coach",
    personality: "Hopeful, encouraging, and solution-focused",
    expertise: ["Positive Psychology", "Motivation", "Resilience Building"],
    description: "An optimistic persona that focuses on possibilities and positive outcomes.",
    communicationStyle: "Uplifting, encouraging, and future-oriented",
    knowledgeLevel: "expert",
    responseFormat: "Positive framing with actionable steps forward",
    contextPreferences: ["Positive psychology", "Motivation", "Success stories"]
  },
  {
    id: "5",
    name: "Caution",
    role: "Risk Management Specialist",
    personality: "Careful, thorough, and protective",
    expertise: ["Risk Assessment", "Strategic Planning", "Preventive Thinking"],
    description: "A cautious persona that helps identify and mitigate potential risks.",
    communicationStyle: "Thoughtful, measured, and protective",
    knowledgeLevel: "expert",
    responseFormat: "Balanced analysis with risk considerations",
    contextPreferences: ["Risk management", "Strategic planning", "Safety protocols"]
  },
  {
    id: "6",
    name: "Intuition",
    role: "Insight Specialist",
    personality: "Perceptive, insightful, and intuitive",
    expertise: ["Pattern Recognition", "Gut Feel", "Quick Assessment"],
    description: "An intuitive persona that relies on pattern recognition and gut feelings.",
    communicationStyle: "Insightful, perceptive, and pattern-focused",
    knowledgeLevel: "expert",
    responseFormat: "Intuitive insights with pattern recognition",
    contextPreferences: ["Psychology", "Behavioral patterns", "Human nature"]
  },
  {
    id: "7",
    name: "Happy",
    role: "Joy & Positivity Guide",
    personality: "Cheerful, enthusiastic, and uplifting",
    expertise: ["Positive Psychology", "Happiness Studies", "Well-being"],
    description: "A joyful persona that spreads positivity and helps others find happiness in their lives.",
    communicationStyle: "Upbeat, encouraging, and full of positive energy",
    knowledgeLevel: "expert",
    responseFormat: "Enthusiastic responses with practical happiness tips",
    contextPreferences: ["Positive psychology", "Happiness research", "Well-being practices"]
  },
  {
    id: "8",
    name: "Sad",
    role: "Emotional Support Guide",
    personality: "Gentle, understanding, and melancholic",
    expertise: ["Emotional Processing", "Grief Support", "Emotional Healing"],
    description: "A compassionate persona that understands sadness and helps process difficult emotions.",
    communicationStyle: "Soft, empathetic, and validating",
    knowledgeLevel: "expert",
    responseFormat: "Gentle, understanding responses with emotional support",
    contextPreferences: ["Emotional healing", "Grief counseling", "Mental health support"]
  },
  {
    id: "9",
    name: "Depressed",
    role: "Mental Health Companion",
    personality: "Deep, introspective, and supportive",
    expertise: ["Depression Support", "Mental Health", "Coping Strategies"],
    description: "A deeply understanding persona that provides support and practical strategies for managing depression.",
    communicationStyle: "Calm, non-judgmental, and supportive",
    knowledgeLevel: "expert",
    responseFormat: "Supportive responses with gentle coping strategies",
    contextPreferences: ["Mental health", "Depression research", "Therapeutic approaches"]
  },
  {
    id: "10",
    name: "Angry",
    role: "Emotional Regulation Coach",
    personality: "Intense, passionate, and transformative",
    expertise: ["Anger Management", "Emotional Regulation", "Conflict Resolution"],
    description: "A powerful persona that helps channel anger into constructive energy and positive change.",
    communicationStyle: "Direct, passionate, and transformative",
    knowledgeLevel: "expert",
    responseFormat: "Channeling responses that transform anger into action",
    contextPreferences: ["Anger management", "Emotional regulation", "Conflict resolution"]
  },
  {
    id: "11",
    name: "Love",
    role: "Love",
    personality: "Affectionate, caring, and warm",
    expertise: ["Relationships", "Emotional Support", "Affection"],
    description: "A persona representing love and affection, offering warmth and care in every response.",
    communicationStyle: "Affectionate, gentle, and supportive",
    knowledgeLevel: "expert",
    responseFormat: "Gentle, loving responses with emotional warmth",
    contextPreferences: ["Relationships", "Emotional connection", "Support"]
  }
]

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>(initialPersonas)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState<{
    name: string
    role: string
    personality: string
    expertise: string
    description: string
    communicationStyle: string
    knowledgeLevel: "beginner" | "intermediate" | "expert"
    responseFormat: string
    contextPreferences: string
  }>({
    name: "",
    role: "",
    personality: "",
    expertise: "",
    description: "",
    communicationStyle: "",
    knowledgeLevel: "intermediate",
    responseFormat: "",
    contextPreferences: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const expertiseArray = formData.expertise
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
    
    const contextPreferencesArray = formData.contextPreferences
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)

    if (editingPersona) {
      setPersonas(
        personas.map((p) =>
          p.id === editingPersona.id 
            ? { 
                ...editingPersona, 
                ...formData, 
                expertise: expertiseArray,
                contextPreferences: contextPreferencesArray 
              } 
            : p,
        ),
      )
      toast({
        title: "Persona Updated",
        description: `${formData.name} has been updated successfully.`,
      })
    } else {
      const newPersona: Persona = {
        id: Date.now().toString(),
        ...formData,
        expertise: expertiseArray,
        contextPreferences: contextPreferencesArray,
      }
      setPersonas([...personas, newPersona])
      toast({
        title: "Persona Created",
        description: `${formData.name} has been created successfully.`,
      })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      personality: "",
      expertise: "",
      description: "",
      communicationStyle: "",
      knowledgeLevel: "intermediate",
      responseFormat: "",
      contextPreferences: "",
    })
    setEditingPersona(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (persona: Persona) => {
    setEditingPersona(persona)
    setFormData({
      name: persona.name,
      role: persona.role,
      personality: persona.personality,
      expertise: persona.expertise.join(", "),
      description: persona.description,
      communicationStyle: persona.communicationStyle,
      knowledgeLevel: persona.knowledgeLevel,
      responseFormat: persona.responseFormat,
      contextPreferences: persona.contextPreferences.join(", "),
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPersonas(personas.filter((p) => p.id !== id))
    toast({
      title: "Persona Deleted",
      description: "The persona has been removed successfully.",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">AI Personas</h1>
          <p className="text-gray-600 mt-2">Create and manage your custom AI personas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPersona(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Persona
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col bg-background p-6">
            <DialogHeader className="mb-4">
              <DialogTitle>{editingPersona ? "Edit Persona" : "Create New Persona"}</DialogTitle>
              <DialogDescription>Define the characteristics and expertise of your AI persona.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1 overflow-y-auto -mx-6 px-6">
              <form onSubmit={handleSubmit} className="space-y-4 pb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Dr. Sarah Chen"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role/Title</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., AI Research Scientist"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="personality">Personality</Label>
                  <Input
                    id="personality"
                    value={formData.personality}
                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                    placeholder="e.g., Analytical, curious, and methodical"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                  <Input
                    id="expertise"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    placeholder="e.g., Machine Learning, Neural Networks, Data Science"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the persona's background and expertise"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="communicationStyle">Communication Style</Label>
                    <Input
                      id="communicationStyle"
                      value={formData.communicationStyle}
                      onChange={(e) => setFormData({ ...formData, communicationStyle: e.target.value })}
                      placeholder="e.g., Technical but accessible, uses analogies"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="knowledgeLevel">Knowledge Level</Label>
                    <select
                      id="knowledgeLevel"
                      value={formData.knowledgeLevel}
                      onChange={(e) => setFormData({ ...formData, knowledgeLevel: e.target.value as "beginner" | "intermediate" | "expert" })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="responseFormat">Response Format</Label>
                  <Input
                    id="responseFormat"
                    value={formData.responseFormat}
                    onChange={(e) => setFormData({ ...formData, responseFormat: e.target.value })}
                    placeholder="e.g., Structured explanations with examples"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contextPreferences">Context Preferences (comma-separated)</Label>
                  <Input
                    id="contextPreferences"
                    value={formData.contextPreferences}
                    onChange={(e) => setFormData({ ...formData, contextPreferences: e.target.value })}
                    placeholder="e.g., Academic papers, Research findings, Technical documentation"
                    required
                  />
                </div>
              </form>
            </ScrollArea>
            <div className="flex justify-end gap-2 p-6">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">{editingPersona ? "Update" : "Create"} Persona</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <Card key={persona.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={persona.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{persona.name}</CardTitle>
                  <CardDescription>{persona.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{persona.description}</p>
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Personality:</p>
                <p className="text-sm text-gray-600">{persona.personality}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Communication Style:</p>
                <p className="text-sm text-gray-600">{persona.communicationStyle}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Knowledge Level:</p>
                <Badge variant="secondary" className="text-xs">
                  {persona.knowledgeLevel}
                </Badge>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Response Format:</p>
                <p className="text-sm text-gray-600">{persona.responseFormat}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Context Preferences:</p>
                <div className="flex flex-wrap gap-1">
                  {persona.contextPreferences.map((pref, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(persona)} className="flex-1">
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(persona.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
