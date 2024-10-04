// src/pages/PredictPage.tsx

import React, { useState } from "react";

const PredictPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [responseText, setResponseText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the prediction.");
      }

      const data = await response.json();
      setResponseText(data.response); // Assuming `data.response` is the response text
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setResponseText(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Ask for a Prediction</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow-lg rounded-md">
        <div className="mb-4">
          <label htmlFor="inputText" className="block text-gray-700 font-medium mb-2">
            Enter your question:
          </label>
          <input
            type="text"
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="What are some good vegetarian recipes?"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>

      {responseText && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">Prediction Response:</h2>
          <p>{responseText}</p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PredictPage;
