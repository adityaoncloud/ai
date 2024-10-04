import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://15.206.194.232:8083/api/v1/auth/signup', formData);
      setMessage('Sign up successful!');
      console.log('Response:', response.data);
    } catch (error) {
      setMessage('Error signing up');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default SignUpPage;
