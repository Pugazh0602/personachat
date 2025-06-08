"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Users, MessageSquare, User, Bot, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Message {
  id: string
  content: string
  sender: string
  timestamp: Date
  isUser: boolean
}

interface Persona {
  id: string
  name: string
  role: string
  avatar?: string
}

const personas: Persona[] = [
  { id: "1", name: "Empathy", role: "Emotional Intelligence Expert" },
  { id: "2", name: "Logic", role: "Analytical Thinker" },
  { id: "3", name: "Creativity", role: "Innovative Mind" },
  { id: "4", name: "Optimism", role: "Positive Psychology Coach" },
  { id: "5", name: "Caution", role: "Risk Management Specialist" },
  { id: "6", name: "Intuition", role: "Insight Specialist" },
  { id: "7", name: "Happy", role: "Joy & Positivity Guide" },
  { id: "8", name: "Sad", role: "Emotional Support Guide" },
  { id: "9", name: "Depressed", role: "Mental Health Companion" },
  { id: "10", name: "Angry", role: "Emotional Regulation Coach" },
  { id: "11", name: "Love", role: "Love" },
]

const mockResponses = {
  "Empathy": [
    "I understand how challenging this must feel for you. Let's explore these emotions together...",
    "Your feelings are completely valid. I can sense the depth of your experience...",
    "I hear the emotion in your words. Would you like to talk more about how this makes you feel?",
  ],
  "Logic": [
    "Let's analyze this situation systematically. First, we need to consider the key variables...",
    "From a rational perspective, we can break this down into several logical steps...",
    "The data suggests we should approach this from a different angle. Here's why...",
  ],
  "Creativity": [
    "What if we looked at this from a completely different angle? Imagine if...",
    "This reminds me of a creative solution I saw once. Let's think outside the box...",
    "I'm getting some innovative ideas here. How about we try something unexpected...",
  ],
  "Optimism": [
    "I see so many possibilities here! Let's focus on the opportunities this presents...",
    "Every challenge is a chance to grow. I believe we can turn this into something positive...",
    "The future looks bright! Here's what we can do to make the most of this situation...",
  ],
  "Caution": [
    "Before we proceed, let's carefully consider all potential outcomes...",
    "We should be mindful of the risks involved. Here's what we need to watch out for...",
    "Let's take a measured approach to this. We need to consider several safety factors...",
  ],
  "Intuition": [
    "I'm sensing a pattern here that might be worth exploring...",
    "Something tells me there's more to this than meets the eye...",
    "My gut feeling is that we should pay attention to these subtle signals...",
  ],
  "Happy": [
    "What a wonderful opportunity to spread some joy! Let's focus on the bright side...",
    "I'm so excited to share this moment with you! Here's something that might bring a smile...",
    "Isn't it amazing how many beautiful things we can find in every situation? Let me tell you...",
  ],
  "Sad": [
    "I understand this feels heavy right now. It's okay to feel this way...",
    "Your feelings of sadness are valid. Would you like to talk about what's on your mind?",
    "Sometimes it helps to acknowledge our sadness. I'm here to listen and support you...",
  ],
  "Depressed": [
    "I hear the weight in your words. Remember, it's okay to take things one step at a time...",
    "You're not alone in this. Let's explore some gentle ways to care for yourself...",
    "I understand this feels overwhelming. Would you like to talk about some small steps we could take?",
  ],
  "Angry": [
    "I feel the intensity of your emotions. Let's channel this energy into something powerful...",
    "Your anger is telling us something important. What change would you like to see?",
    "This situation deserves your passion. How can we transform this anger into positive action?",
  ],
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(["1"])
  const [debateMode, setDebateMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isTtsEnabled, setIsTtsEnabled] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
    const storedLanguage = localStorage.getItem("appLanguage")
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage)
    }
    const storedTtsPreference = localStorage.getItem("isTtsEnabled")
    if (storedTtsPreference !== null) {
      setIsTtsEnabled(JSON.parse(storedTtsPreference))
    }

    if ("speechSynthesis" in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices())
      }
      updateVoices()
      window.speechSynthesis.addEventListener("voiceschanged", updateVoices)
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", updateVoices)
      }
    }
  }, [messages])

  const personaVoiceProps: { [key: string]: { pitch: number; rate: number } } = {
    "Empathy": { pitch: 0.9, rate: 0.95 },
    "Logic": { pitch: 1.0, rate: 1.0 },
    "Creativity": { pitch: 1.1, rate: 1.1 },
    "Optimism": { pitch: 1.2, rate: 1.15 },
    "Caution": { pitch: 0.8, rate: 0.8 },
    "Intuition": { pitch: 1.05, rate: 1.05 },
    "Happy": { pitch: 1.3, rate: 1.2 },
    "Sad": { pitch: 0.7, rate: 0.7 },
    "Depressed": { pitch: 0.6, rate: 0.65 },
    "Angry": { pitch: 1.1, rate: 1.25 },
    "Love": { pitch: 1.15, rate: 0.95 },
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "You",
      timestamp: new Date(),
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Call API for bot response
    try {
      const personasToSend = personas.filter((p) => selectedPersonas.includes(p.id))
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, personas: personasToSend, language: currentLanguage }),
      })
      const data = await res.json()
      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        content: data.reply,
        sender: personasToSend.map((p) => p.name).join(", ") || "Bot",
        timestamp: new Date(),
        isUser: false,
      }
      setMessages((prev) => {
        const updatedMessages = [...prev, botMessage]
        if (isTtsEnabled && botMessage.content && "speechSynthesis" in window) {
          window.speechSynthesis.cancel()

          const utterance = new SpeechSynthesisUtterance(botMessage.content)

          const langCode = currentLanguage === "ta" ? "ta-IN" : "en-US"
          utterance.lang = langCode

          const primaryPersonaId = selectedPersonas[0]
          const primaryPersona = personas.find(p => p.id === primaryPersonaId)

          if (primaryPersona) {
            const voiceProps = personaVoiceProps[primaryPersona.name]
            if (voiceProps) {
              utterance.pitch = voiceProps.pitch
              utterance.rate = voiceProps.rate
            }

            const targetVoice = voices.find(voice => 
              voice.lang === langCode || 
              (primaryPersona.name === "Happy" && voice.name.includes("Good")) ||
              (primaryPersona.name === "Sad" && voice.name.includes("Bad"))
            );
            if (targetVoice) {
              utterance.voice = targetVoice;
            }
          }
          window.speechSynthesis.speak(utterance)
        }
        return updatedMessages
      })
    } catch (err) {
      setMessages((prev) => [...prev, {
        id: `${Date.now()}-error`,
        content: "Error: Could not get response from API.",
        sender: "Bot",
        timestamp: new Date(),
        isUser: false,
      }])
    }
    setIsTyping(false)
  }

  const handlePersonaToggle = (personaId: string) => {
    setSelectedPersonas((prev) =>
      prev.includes(personaId) ? prev.filter((id) => id !== personaId) : [...prev, personaId],
    )
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 border-r bg-cyber-dark/80 p-4 flex flex-col">
        <div className="space-y-6 flex-1 flex flex-col">
          <div>
            <h2 className="text-lg font-semibold mb-3">Active Personas</h2>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-2">
                {personas.map((persona) => (
                  <Card
                    key={persona.id}
                    className={`cursor-pointer transition-all duration-300 cyber-card ${
                      selectedPersonas.includes(persona.id)
                        ? "border-cyber-cyan cyber-glow bg-cyber-cyan/10"
                        : "border-cyber-grey/20 hover:border-cyber-cyan/50"
                    }`}
                    onClick={() => handlePersonaToggle(persona.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{persona.name}</p>
                          <p className="text-xs text-gray-600">{persona.role}</p>
                        </div>
                        {selectedPersonas.includes(persona.id) && (
                          <Badge variant="secondary" className="text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-3">Active Personas ({selectedPersonas.length})</h3>
            <ScrollArea className="h-[150px] pr-4">
              <div className="space-y-2">
                {selectedPersonas.map((personaId) => {
                  const persona = personas.find((p) => p.id === personaId)
                  return persona ? (
                    <Card key={personaId} className="border-cyber-cyan cyber-glow bg-cyber-cyan/10">
                      <CardContent className="p-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              <User className="h-3 w-3" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-xs">{persona.name}</p>
                            <p className="text-[10px] text-gray-600">{persona.role}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePersonaToggle(personaId)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : null
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <Switch id="debate-mode" checked={debateMode} onCheckedChange={setDebateMode} />
              <Label htmlFor="debate-mode" className="text-sm">
                Debate Mode
              </Label>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Chat Statistics</h3>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Messages: {messages.length}</p>
                <p>Active Personas: {selectedPersonas.length}</p>
                <p>Mode: {debateMode ? "Debate" : "Collaborative"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-cyber-dark">
        {/* Header */}
        <div className="border-b p-4 bg-cyber-dark/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <h1 className="text-xl font-semibold">Multi-Persona Chat</h1>
          </div>
          <p className="text-sm text-cyber-grey/80 mt-1">
            Chatting with {selectedPersonas.length} persona{selectedPersonas.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-cyber-grey/40 mx-auto mb-4" />
                <p className="text-cyber-grey/70">Start a conversation with your AI personas</p>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}>
                {!message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isUser ? "chat-bubble-user text-cyber-dark" : "chat-bubble-ai text-cyber-grey"
                  }`}
                >
                  {!message.isUser && <p className="text-xs font-medium mb-1 text-cyber-cyan">{message.sender}</p>}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? "text-cyber-dark/70" : "text-cyber-grey/70"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                {message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-cyber-dark-grey/60 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4 bg-cyber-dark/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={selectedPersonas.length === 0}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || selectedPersonas.length === 0 || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {selectedPersonas.length === 0 && (
            <p className="text-xs text-red-500 mt-1">Please select at least one persona to start chatting</p>
          )}
        </div>
      </div>
    </div>
  )
}
