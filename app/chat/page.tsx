"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Users, MessageSquare, User, Bot, X, Plus, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null)
  const [debateMode, setDebateMode] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isTtsEnabled, setIsTtsEnabled] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [displayName, setDisplayName] = useState("You")

  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight
      }, 0)
    }
    const storedLanguage = localStorage.getItem("appLanguage")
    if (storedLanguage) {
      setCurrentLanguage(storedLanguage)
    }
    const storedTtsPreference = localStorage.getItem("isTtsEnabled")
    if (storedTtsPreference !== null) {
      setIsTtsEnabled(JSON.parse(storedTtsPreference))
    }

    // Load display name from localStorage
    const storedDisplayName = localStorage.getItem("displayName")
    if (storedDisplayName && storedDisplayName.trim()) {
      setDisplayName(storedDisplayName.trim())
    }

    // Initialize speech synthesis
    if ("speechSynthesis" in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices())
      }
      updateVoices()
      window.speechSynthesis.onvoiceschanged = updateVoices
    }

    // Listen for changes to display name in settings
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "displayName" && e.newValue && e.newValue.trim()) {
        setDisplayName(e.newValue.trim())
      }
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

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
    if (!inputValue.trim() || !selectedPersonaId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: displayName,
      timestamp: new Date(),
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Call API for bot response
    try {
      const personaToSend = personas.find(p => p.id === selectedPersonaId)
      if (!personaToSend) return

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, personas: [personaToSend], language: currentLanguage }),
      })
      const data = await res.json()
      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        content: data.reply,
        sender: personaToSend.name,
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

          if (personaToSend) {
            const voiceProps = personaVoiceProps[personaToSend.name]
            if (voiceProps) {
              utterance.pitch = voiceProps.pitch
              utterance.rate = voiceProps.rate
            }

            const targetVoice = voices.find(voice => 
              voice.lang === langCode || 
              (personaToSend.name === "Happy" && voice.name.includes("Good")) ||
              (personaToSend.name === "Sad" && voice.name.includes("Bad"))
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

  const handleClearChat = () => {
    setMessages([])
  }

  const handleExportChat = () => {
    const chatContent = messages
      .map((msg) => `[${msg.timestamp.toLocaleTimeString()}] ${msg.sender}: ${msg.content}`)
      .join("\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "personachat_history.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSelectPersona = (personaId: string) => {
    setSelectedPersonaId(personaId)
    setMessages([])
  }

  const handleBackToPersonaList = () => {
    setSelectedPersonaId(null)
    setMessages([])
  }

  const getSelectedPersona = () => {
    return personas.find(p => p.id === selectedPersonaId)
  }

  return (
    <div className="flex flex-col bg-cyber-dark">
      {!selectedPersonaId ? (
        <div className="flex flex-col h-full">
          <div className="p-4 bg-cyber-dark/95 backdrop-blur-sm border-b border-cyber-cyan/20 flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="h-4 w-4 text-cyber-grey" />
            </Button>
            <h1 className="text-xl font-semibold text-cyber-grey">Select a Persona to Chat</h1>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {personas.map((persona) => (
                <Card
                  key={persona.id}
                  className="cursor-pointer transition-all duration-300 cyber-card border-cyber-grey/20 hover:border-cyber-cyan/50"
                  onClick={() => handleSelectPersona(persona.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-cyber text-cyber-dark text-lg">
                          {persona.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-lg text-cyber-grey">{persona.name}</p>
                        <p className="text-sm text-cyber-grey/70">{persona.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <>
          {/* WhatsApp-style Header */}
          <div className="fixed top-0 left-0 right-0 p-4 bg-cyber-dark/95 backdrop-blur-sm border-b border-cyber-cyan/20 z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBackToPersonaList}>
                <ArrowLeft className="h-4 w-4 text-cyber-grey" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-cyber-dark">
                <AvatarFallback className="bg-gradient-cyber text-cyber-dark text-xs">
                  {getSelectedPersona()?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-semibold text-cyber-grey">{getSelectedPersona()?.name}</h1>
                <p className="text-xs text-cyber-grey/70">AI Persona</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <MoreVertical className="h-5 w-5 text-cyber-grey" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-cyber-dark border-cyber-cyan/20 text-cyber-grey">
                <DropdownMenuItem 
                  onClick={handleClearChat}
                  className="hover:bg-cyber-cyan/10 focus:bg-cyber-cyan/10 cursor-pointer"
                >
                  Clear Chat
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleExportChat}
                  className="hover:bg-cyber-cyan/10 focus:bg-cyber-cyan/10 cursor-pointer"
                >
                  Export Chat
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => alert("Other options clicked!")}
                  className="hover:bg-cyber-cyan/10 focus:bg-cyber-cyan/10 cursor-pointer"
                >
                  Other Options
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea viewportRef={scrollAreaRef} className="h-full p-4 pb-20 pt-20">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-cyber-grey/40 mx-auto mb-4" />
                    <p className="text-cyber-grey/70 mb-2">Start a conversation with {getSelectedPersona()?.name}</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-cyber text-cyber-dark">
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.isUser 
                          ? "bg-gradient-cyber text-cyber-dark rounded-br-md" 
                          : "bg-cyber-dark-grey/60 text-cyber-grey rounded-bl-md"
                      }`}
                    >
                      {!message.isUser && (
                        <p className="text-xs font-medium mb-1 text-cyber-cyan">{message.sender}</p>
                      )}
                      {message.isUser && (
                        <p className="text-xs font-medium mb-1 text-cyber-cyan text-right">{message.sender}</p>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-right' : ''}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-cyber-cyan text-cyber-dark">
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-cyber text-cyber-dark">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-cyber-dark-grey/60 rounded-2xl rounded-bl-md p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyber-grey rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-cyber-grey rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-cyber-grey rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* WhatsApp-style Input */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-cyber-dark/95 backdrop-blur-sm border-t border-cyber-cyan/20 z-10">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={!selectedPersonaId}
                className="flex-1 bg-cyber-dark-grey/60 border-cyber-cyan/20 text-cyber-grey placeholder:text-cyber-grey/50 rounded-full"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !selectedPersonaId || isTyping}
                className="rounded-full bg-gradient-cyber text-cyber-dark hover:opacity-90 cyber-glow h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!selectedPersonaId && (
              <p className="text-xs text-red-400 mt-1 text-center">
                Select a persona to start chatting
              </p>
            )}
          </div>
        </>
      )}

      <Dialog open={isPersonaModalOpen} onOpenChange={setIsPersonaModalOpen}>
        <DialogContent className="bg-cyber-dark border-cyber-cyan/20 max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-cyber-grey">Select Personas</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2">
              {personas.map((persona) => (
                <Card
                  key={persona.id}
                  className={`cursor-pointer transition-all duration-300 cyber-card ${
                    selectedPersonaId === persona.id
                      ? "border-cyber-cyan cyber-glow bg-cyber-cyan/10"
                      : "border-cyber-grey/20 hover:border-cyber-cyan/50"
                  }`}
                  onClick={() => {
                    handleSelectPersona(persona.id)
                    setIsPersonaModalOpen(false)
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-cyber text-cyber-dark">
                          {persona.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-cyber-grey">{persona.name}</p>
                        <p className="text-xs text-cyber-grey/70">{persona.role}</p>
                      </div>
                      {selectedPersonaId === persona.id && (
                        <Badge variant="secondary" className="bg-cyber-cyan/20 text-cyber-cyan">
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-between items-center pt-4 border-t border-cyber-cyan/20">
            <div className="text-sm text-cyber-grey/70">
              {selectedPersonaId ? '1 persona selected' : '0 personas selected'}
            </div>
            <Button 
              onClick={() => setIsPersonaModalOpen(false)}
              className="bg-gradient-cyber text-cyber-dark hover:opacity-90 cyber-glow"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
