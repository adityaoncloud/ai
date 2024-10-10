'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Plus } from "lucide-react"

type FormData = {
  ruleId: string;
  ruleAlias: string;
  type: string;
  category: string;
  subCategory: string;
  description: string;
  conditions: string;
  actions: string;
  severityLevel: string;
  effectiveDate: string;
  expiryDate: string;
  applicability: string;
  relatedDocuments: string[];
  validPrompts: string[];
  inValidPrompts: string[];
  modifiedPrompts: string[];
  reviewFrequency: string;
};

export default function PostRequestPage() {
  const [formData, setFormData] = useState<FormData>({
    ruleId: '',
    ruleAlias: '',
    type: '',
    category: '',
    subCategory: '',
    description: '',
    conditions: '',
    actions: '',
    severityLevel: '',
    effectiveDate: '',
    expiryDate: '',
    applicability: '',
    relatedDocuments: [''],
    validPrompts: [''],
    inValidPrompts: [''],
    modifiedPrompts: [''],
    reviewFrequency: '',
  });

  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData,
    index?: number
  ) => {
    if (index !== undefined) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: (prevData[field] as string[]).map((item, idx) =>
          idx === index ? e.target.value : item
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [field]: e.target.value,
      }));
    }
  };

  const handleAddField = (field: keyof FormData) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...(prevData[field] as string[]), ''],
    }));
  };

  const convertToXML = (data: FormData): string => {
    const xmlBuilder = (tag: string, value: string | string[]) => {
      if (Array.isArray(value)) {
        return `<${tag}>${value.map((v) => `<document>${v}</document>`).join('')}</${tag}>`;
      }
      return `<${tag}>${value}</${tag}>`;
    };

    return `<?xml version="1.0" encoding="UTF-8"?>
<rules>
  <rule>
    ${xmlBuilder('ruleId', data.ruleId)}
    ${xmlBuilder('ruleAlias', data.ruleAlias)}
    ${xmlBuilder('type', data.type)}
    ${xmlBuilder('category', data.category)}
    ${xmlBuilder('subCategory', data.subCategory)}
    ${xmlBuilder('description', data.description)}
    ${xmlBuilder('conditions', data.conditions)}
    ${xmlBuilder('actions', data.actions)}
    ${xmlBuilder('severityLevel', data.severityLevel)}
    ${xmlBuilder('effectiveDate', data.effectiveDate)}
    ${xmlBuilder('expiryDate', data.expiryDate)}
    ${xmlBuilder('applicability', data.applicability)}
    <relatedDocuments>
      ${data.relatedDocuments.map((doc) => `<document>${doc}</document>`).join('')}
    </relatedDocuments>
    <validPrompts>
      ${data.validPrompts.map((prompt) => `<prompt>${prompt}</prompt>`).join('')}
    </validPrompts>
    <inValidPrompts>
      ${data.inValidPrompts.map((prompt) => `<prompt>${prompt}</prompt>`).join('')}
    </inValidPrompts>
    <modifiedPrompts>
      ${data.modifiedPrompts.map((prompt) => `<prompt>${prompt}</prompt>`).join('')}
    </modifiedPrompts>
    ${xmlBuilder('reviewFrequency', data.reviewFrequency)}
  </rule>
</rules>`;
  };

  const sendPostRequest = async () => {
    setLoading(true);
    setError(null);

    const requestBody = convertToXML(formData);

    try {
      const res = await fetch('http://15.206.194.232:8082/api/v1/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: requestBody,
      });

      const contentType = res.headers.get('Content-Type') || '';

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || 'Failed to send data');
      }

      if (contentType.includes('application/xml')) {
        const textData = await res.text();
        setResponse(textData);
      } else {
        setResponse('Response received in a different format');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label: string, field: keyof FormData) => (
    <div className="space-y-2">
      <Label htmlFor={field}>{label}</Label>
      <Input
        id={field}
        value={formData[field] as string}
        onChange={(e) => handleChange(e, field)}
      />
    </div>
  );

  const renderArrayInput = (label: string, field: keyof FormData) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {(formData[field] as string[]).map((item, index) => (
        <Input
          key={index}
          value={item}
          onChange={(e) => handleChange(e, field, index)}
          className="mb-2"
        />
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => handleAddField(field)}
        className="flex items-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add {label}
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>POST Request Page (XML Format)</CardTitle>
          <CardDescription>Enter rule details to submit in XML format</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <form className="space-y-6">
              {renderInput("Rule ID", "ruleId")}
              {renderInput("Rule Alias", "ruleAlias")}
              {renderInput("Type", "type")}
              {renderInput("Category", "category")}
              {renderInput("Sub Category", "subCategory")}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange(e, 'description')}
                />
              </div>
              {renderInput("Conditions", "conditions")}
              {renderInput("Actions", "actions")}
              {renderInput("Severity Level", "severityLevel")}
              {renderInput("Effective Date", "effectiveDate")}
              {renderInput("Expiry Date", "expiryDate")}
              {renderInput("Applicability", "applicability")}
              {renderArrayInput("Related Documents", "relatedDocuments")}
              {renderArrayInput("Valid Prompts", "validPrompts")}
              {renderArrayInput("Invalid Prompts", "inValidPrompts")}
              {renderArrayInput("Modified Prompts", "modifiedPrompts")}
              {renderInput("Review Frequency", "reviewFrequency")}
            </form>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button onClick={sendPostRequest} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Card className="mt-6 max-w-4xl mx-auto border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {response && (
        <Card className="mt-6 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <pre>{response}</pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}