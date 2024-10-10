import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export default function PredictPage() {
  const [inputText, setInputText] = useState<string>("")
  const [responseText, setResponseText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch the prediction.")
      }

      const data = await response.json()
      setResponseText(data.response)
      setError(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
      setResponseText(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Ask for a Prediction</CardTitle>
            <CardDescription>Enter your question and get an AI-powered prediction</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="inputText" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Enter your question:
                  </label>
                  <Input
                    type="text"
                    id="inputText"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="What are some good vegetarian recipes?"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      {responseText && (
        <div className="max-w-md mx-auto mt-6 w-full px-4">
          <Alert>
            <AlertTitle>Prediction Response:</AlertTitle>
            <AlertDescription>{responseText}</AlertDescription>
          </Alert>
        </div>
      )}

      {error && (
        <div className="max-w-md mx-auto mt-6 w-full px-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}