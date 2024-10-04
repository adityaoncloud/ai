import React, { useState } from 'react';
import axios from 'axios';
import { Input } from './ui/input';
import { Button } from './ui/button';

const RulesForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
    reviewFrequency: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/rules', {
        rules: [formData]
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Submit Rules</h1>
      <form onSubmit={handleSubmit}>
        {/* Create input fields for all the form data */}
        <div className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            name="ruleId"
            value={formData.ruleId}
            onChange={handleChange}
            placeholder="Rule ID"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="ruleAlias"
            value={formData.ruleAlias}
            onChange={handleChange}
            placeholder="Rule Alias"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            placeholder="Subcategory"
            className="p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="conditions"
            value={formData.conditions}
            onChange={handleChange}
            placeholder="Conditions"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="actions"
            value={formData.actions}
            onChange={handleChange}
            placeholder="Actions"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="text"
            name="severityLevel"
            value={formData.severityLevel}
            onChange={handleChange}
            placeholder="Severity Level"
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <Input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
           
          />
          <Input
            type="text"
            name="applicability"
            value={formData.applicability}
            onChange={handleChange}
            placeholder="Applicability"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <Button type="submit" className="mt-4 p-2 bg-stone-600 text-white rounded">Submit</Button>
      </form>
    </div>
  );
};

export default RulesForm;
