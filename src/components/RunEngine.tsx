'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function RunEnginePage() {
  const [engineForm, setEngineForm] = useState({
    ruleId: "",
    input: "",
    status: "",
    reasonForViolation: "",
  })
  const [response, setResponse] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof engineForm
  ) => {
    setEngineForm({ ...engineForm, [field]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://15.206.194.232:8082/api/v1/run-engine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(engineForm),
      })
      if (!res.ok) {
        throw new Error('Failed to run engine')
      }
      const result = await res.json()
      setResponse(JSON.stringify(result, null, 2))
    } catch (error) {
      console.error('Error running engine:', error)
      setResponse('Error: Failed to run engine')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Run Engine</CardTitle>
          <CardDescription>Manually test the Drools engine</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ruleId">Rule ID</Label>
              <Input
                id="ruleId"
                placeholder="Enter Rule ID"
                value={engineForm.ruleId}
                onChange={(e) => handleInputChange(e, 'ruleId')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="input">Input</Label>
              <Input
                id="input"
                placeholder="Enter Input"
                value={engineForm.input}
                onChange={(e) => handleInputChange(e, 'input')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                placeholder="Enter Status"
                value={engineForm.status}
                onChange={(e) => handleInputChange(e, 'status')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reasonForViolation">Reason for Violation</Label>
              <Textarea
                id="reasonForViolation"
                placeholder="Enter Reason for Violation"
                value={engineForm.reasonForViolation}
                onChange={(e) => handleInputChange(e, 'reasonForViolation')}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Run Engine</Button>
          </CardFooter>
        </form>
      </Card>

      {response && (
        <Card className="mt-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{response}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}