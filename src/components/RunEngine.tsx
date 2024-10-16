import React, { useState } from 'react';

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

const PostRequestPage: React.FC = () => {
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
    e: React.ChangeEvent<HTMLInputElement>,
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

  // Helper function to convert form data to XML
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
    </rules>
`;
  };

  const sendPostRequest = async () => {
    setLoading(true);
    setError(null);

    const requestBody = convertToXML(formData);

    try {
      const res = await fetch('http://localhost:8082/api/v1/rules', {
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">POST Request Page (XML Format)</h1>

      {/* Input Form */}
      <form className="space-y-4">
        <div>
          <label>Rule ID:</label>
          <input
            type="text"
            value={formData.ruleId}
            onChange={(e) => handleChange(e, 'ruleId')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Rule Alias:</label>
          <input
            type="text"
            value={formData.ruleAlias}
            onChange={(e) => handleChange(e, 'ruleAlias')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Type:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => handleChange(e, 'type')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Category:</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleChange(e, 'category')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Sub Category:</label>
          <input
            type="text"
            value={formData.subCategory}
            onChange={(e) => handleChange(e, 'subCategory')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => handleChange(e, 'description')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Conditions:</label>
          <input
            type="text"
            value={formData.conditions}
            onChange={(e) => handleChange(e, 'conditions')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Actions:</label>
          <input
            type="text"
            value={formData.actions}
            onChange={(e) => handleChange(e, 'actions')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Severity Level:</label>
          <input
            type="text"
            value={formData.severityLevel}
            onChange={(e) => handleChange(e, 'severityLevel')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Effective Date:</label>
          <input
            type="text"
            value={formData.effectiveDate}
            onChange={(e) => handleChange(e, 'effectiveDate')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            value={formData.expiryDate}
            onChange={(e) => handleChange(e, 'expiryDate')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label>Applicability:</label>
          <input
            type="text"
            value={formData.applicability}
            onChange={(e) => handleChange(e, 'applicability')}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Related Documents */}
        <div>
          <label>Related Documents:</label>
          {formData.relatedDocuments.map((doc, index) => (
            <input
              key={index}
              type="text"
              value={doc}
              onChange={(e) => handleChange(e, 'relatedDocuments', index)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField('relatedDocuments')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Related Document
          </button>
        </div>

        {/* Valid Prompts */}
        <div>
          <label>Valid Prompts:</label>
          {formData.validPrompts.map((prompt, index) => (
            <input
              key={index}
              type="text"
              value={prompt}
              onChange={(e) => handleChange(e, 'validPrompts', index)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField('validPrompts')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Valid Prompt
          </button>
        </div>

        {/* Invalid Prompts */}
        <div>
          <label>Invalid Prompts:</label>
          {formData.inValidPrompts.map((prompt, index) => (
            <input
              key={index}
              type="text"
              value={prompt}
              onChange={(e) => handleChange(e, 'inValidPrompts', index)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField('inValidPrompts')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Invalid Prompt
          </button>
        </div>

        {/* Modified Prompts */}
        <div>
          <label>Modified Prompts:</label>
          {formData.modifiedPrompts.map((prompt, index) => (
            <input
              key={index}
              type="text"
              value={prompt}
              onChange={(e) => handleChange(e, 'modifiedPrompts', index)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddField('modifiedPrompts')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Modified Prompt
          </button>
        </div>

        <div>
          <label>Review Frequency:</label>
          <input
            type="text"
            value={formData.reviewFrequency}
            onChange={(e) => handleChange(e, 'reviewFrequency')}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={sendPostRequest}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Response Display */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {response && <div className="mt-4 border p-4">{response}</div>}
    </div>
  );
};

export default PostRequestPage;
