"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Eye, EyeOff, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "Successfully logged into PersonaChat",
      })
      router.push("/")
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyber-magenta/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-purple/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-cyber cyber-glow">
              <Sparkles className="h-8 w-8 text-cyber-dark" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">PersonaChat</h1>
          <p className="text-cyber-grey/70 mt-2">Enter the future of AI conversation</p>
        </div>

        {/* Login Card */}
        <Card className="cyber-card border-cyber-cyan/30 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-cyber-grey">Welcome Back</CardTitle>
            <CardDescription className="text-cyber-grey/70">Sign in to continue your AI conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-cyber-grey">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-cyber-dark-grey/50 border-cyber-cyan/30 text-cyber-grey placeholder:text-cyber-grey/50 focus:border-cyber-cyan focus:ring-cyber-cyan/20 cyber-glow"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-cyber-grey">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-cyan" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-cyber-dark-grey/50 border-cyber-cyan/30 text-cyber-grey placeholder:text-cyber-grey/50 focus:border-cyber-cyan focus:ring-cyber-cyan/20 cyber-glow"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-grey/70 hover:text-cyber-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    className="border-cyber-cyan/30 data-[state=checked]:bg-cyber-cyan data-[state=checked]:border-cyber-cyan"
                  />
                  <Label htmlFor="remember" className="text-sm text-cyber-grey/70">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-cyber-cyan hover:text-cyber-cyan/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-cyber hover:opacity-90 text-cyber-dark font-semibold py-3 cyber-glow transition-all duration-300 hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-cyber-dark/30 border-t-cyber-dark rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-cyber-grey/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-cyber-dark px-2 text-cyber-grey/50">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-cyber-dark-grey/50 border-cyber-magenta/30 text-cyber-grey hover:bg-cyber-magenta/10 hover:border-cyber-magenta cyber-glow-magenta"
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-cyber-dark-grey/50 border-cyber-purple/30 text-cyber-grey hover:bg-cyber-purple/10 hover:border-cyber-purple cyber-glow-purple"
                >
                  GitHub
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-cyber-grey/70">
                {"Don't have an account? "}
                <Link href="/signup" className="text-cyber-cyan hover:text-cyber-cyan/80 transition-colors font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-cyber-grey/50 text-sm">&copy; 2024 PersonaChat. Powered by AI.</p>
        </div>
      </div>
    </div>
  )
}
