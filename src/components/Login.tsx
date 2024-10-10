'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [message, setMessage] = useState<string | null>(null)
  const router = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://15.206.194.232:8083/api/v1/auth/login', formData)

      // Assuming the response contains the token
      const { token } = response.data

      // Store the token in localStorage (or sessionStorage if preferred)
      localStorage.setItem('authToken', token)

      setMessage('Login successful!')
      console.log('Response:', response.data)

      // Redirect to the protected route (e.g., dashboard)
      router('/dashboard')
    } catch (error) {
      setMessage('Error logging in')
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Login</Button>
          </CardFooter>
        </form>
        {message && (
          <Alert variant={message.includes('Error') ? 'destructive' : 'default'} className="mt-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>
  )
}