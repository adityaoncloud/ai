'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function UserRulesPage() {
  const [userRulesForm, setUserRulesForm] = useState([{ userId: '', ruleId: '' }])
  const [response, setResponse] = useState('')

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedForm = [...userRulesForm]
    updatedForm[index] = { ...updatedForm[index], [field]: value }
    setUserRulesForm(updatedForm)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://15.206.194.232:8082/api/v1/user-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userRules: userRulesForm }),
    })
    const result = await res.json()
    setResponse(JSON.stringify(result, null, 2))
  }

  const addUserRule = () => {
    setUserRulesForm([...userRulesForm, { userId: '', ruleId: '' }])
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>User Rules</CardTitle>
          <CardDescription>Manage user rules by adding rule associations</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {userRulesForm.map((rule, index) => (
              <div key={index} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`userId-${index}`}>User ID</Label>
                  <Input
                    id={`userId-${index}`}
                    type="text"
                    placeholder="Enter User ID"
                    value={rule.userId}
                    onChange={(e) => handleInputChange(index, 'userId', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`ruleId-${index}`}>Rule ID</Label>
                  <Input
                    id={`ruleId-${index}`}
                    type="text"
                    placeholder="Enter Rule ID"
                    value={rule.ruleId}
                    onChange={(e) => handleInputChange(index, 'ruleId', e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={addUserRule}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add User Rule
            </Button>
            <Button type="submit">Submit</Button>
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