import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const UserRulesPage = () => {
  const [userRulesForm, setUserRulesForm] = useState([{ userId: '', ruleId: '' }]);
  const [response, setResponse] = useState('');

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedForm = [...userRulesForm];
    updatedForm[index] = { ...updatedForm[index], [field]: value };
    setUserRulesForm(updatedForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('http://15.206.194.232:8082/api/v1/user-rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userRules: userRulesForm }),
    });
    const result = await res.json();
    setResponse(JSON.stringify(result, null, 2));
  };

  const addUserRule = () => {
    setUserRulesForm([...userRulesForm, { userId: '', ruleId: '' }]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Rules</h1>
      <form onSubmit={handleSubmit}>
        {userRulesForm.map((rule, index) => (
          <div key={index} className="mb-4 space-y-2">
            <Input
              type="text"
              placeholder="User ID"
              className="border p-2 mr-2 space-y-2"
              value={rule.userId}
              onChange={(e) => handleInputChange(index, 'userId', e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Rule ID"
              className="border p-2 mr-2 space-y-2"
              value={rule.ruleId}
              onChange={(e) => handleInputChange(index, 'ruleId', e.target.value)}
              required
            />
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          onClick={addUserRule}
        >
          Add User Rule
        </Button>
        <Button type="submit" variant="ghost">Submit</Button>
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

export default UserRulesPage;
