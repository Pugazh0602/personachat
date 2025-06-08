import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, BarChart3, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyber-magenta/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-cyber-cyan/20 bg-cyber-dark/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-cyber cyber-glow">
              <Sparkles className="h-6 w-6 text-cyber-dark" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent">PersonaChat</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/personas" className="text-cyber-grey hover:text-cyber-cyan transition-colors">
              Personas
            </Link>
            <Link href="/chat" className="text-cyber-grey hover:text-cyber-cyan transition-colors">
              Chat
            </Link>
            <Link href="/insights" className="text-cyber-grey hover:text-cyber-cyan transition-colors">
              Insights
            </Link>
            <Button asChild className="bg-gradient-cyber text-cyber-dark hover:opacity-90 cyber-glow">
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold bg-gradient-cyber bg-clip-text text-transparent mb-6">
            Chat with AI Personas
          </h2>
          <p className="text-xl text-cyber-grey/80 mb-8">
            Create custom AI personas, engage in meaningful conversations, and gain insights from multi-perspective
            discussions in a cyberpunk-inspired interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-cyber text-cyber-dark hover:opacity-90 cyber-glow">
              <Link href="/chat">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start New Chat
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 cyber-border"
            >
              <Link href="/personas">
                <Users className="mr-2 h-5 w-5" />
                Create Persona
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="cyber-card border-cyber-cyan/30 hover:border-cyber-cyan/50 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="p-3 rounded-xl bg-cyber-cyan/20 w-fit mb-4 cyber-glow">
                <MessageSquare className="h-8 w-8 text-cyber-cyan" />
              </div>
              <CardTitle className="text-cyber-grey">Multi-Persona Chat</CardTitle>
              <CardDescription className="text-cyber-grey/70">
                Engage multiple AI personas in a single conversation for diverse perspectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full text-cyber-cyan hover:bg-cyber-cyan/10">
                <Link href="/chat">Start Chatting</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card border-cyber-magenta/30 hover:border-cyber-magenta/50 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="p-3 rounded-xl bg-cyber-magenta/20 w-fit mb-4 cyber-glow-magenta">
                <Users className="h-8 w-8 text-cyber-magenta" />
              </div>
              <CardTitle className="text-cyber-grey">Custom Personas</CardTitle>
              <CardDescription className="text-cyber-grey/70">
                Create and customize AI personas with unique personalities and expertise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full text-cyber-magenta hover:bg-cyber-magenta/10">
                <Link href="/personas">Create Persona</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cyber-card border-cyber-purple/30 hover:border-cyber-purple/50 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="p-3 rounded-xl bg-cyber-purple/20 w-fit mb-4 cyber-glow-purple">
                <BarChart3 className="h-8 w-8 text-cyber-purple" />
              </div>
              <CardTitle className="text-cyber-grey">Conversation Insights</CardTitle>
              <CardDescription className="text-cyber-grey/70">
                Analyze your conversations and discover patterns in your interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="ghost" className="w-full text-cyber-purple hover:bg-cyber-purple/10">
                <Link href="/insights">View Insights</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyber-cyan/20 bg-cyber-dark/80 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center text-cyber-grey/70">
          <p>&copy; 2024 PersonaChat. Powered by AI.</p>
        </div>
      </footer>
    </div>
  )
}
