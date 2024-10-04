import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const RunEnginePage = () => {
  const [engineForm, setEngineForm] = useState({
    ruleId: '',
    input: '',
    status: '',
    reasonForViolation: '',
  });
  const [response, setResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setEngineForm({ ...engineForm, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://15.206.194.232:8082/api/v1/run-engine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(engineForm),
    });
    const result = await res.json();
    setResponse(JSON.stringify(result, null, 2));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Run Engine</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 space-y-2 ">
          <Input
            type="text"
            placeholder="Rule ID"
            className="border p-2 mr-2"
            value={engineForm.ruleId}
            onChange={(e) => handleInputChange(e, 'ruleId')}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Input"
            className="border p-2 mr-2"
            value={engineForm.input}
            onChange={(e) => handleInputChange(e, 'input')}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Status"
            className="border p-2 mr-2"
            value={engineForm.status}
            onChange={(e) => handleInputChange(e, 'status')}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Reason for Violation"
            className="border p-2 mr-2"
            value={engineForm.reasonForViolation}
            onChange={(e) => handleInputChange(e, 'reasonForViolation')}
            required
          />
        </div>
        <Button type="submit" className="bg-stone-600 text-white p-2">Submit</Button>
      </form>

      {response && (
        <div className="mt-8 bg-gray-200 p-4">
          <h2 className="text-xl">API Response</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default RunEnginePage;
