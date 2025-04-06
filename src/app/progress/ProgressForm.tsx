'use client';

import React, { useState } from 'react';

interface ProgressFormProps {
  type: 'biometrics' | 'mobility';
  accountId: string;
  accessToken: string;
}

const ProgressForm: React.FC<ProgressFormProps> = ({ type, accountId, accessToken }) => {
  const isBiometric = type === 'biometrics';
  const initialState = isBiometric
    ? { measuredOn: '', weight: '', fat: '', visceralFat: '' }
    : { measuredOn: '', hips: '', shoulder: '', back: '' };

  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    const res = await fetch(
      `https://smym-backend-service.azurewebsites.net/api/v1/account/${accountId}/${type}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // parse floats just in case the backend expects it
          ...Object.fromEntries(
            Object.entries(formData).map(([k, v]) => [
              k,
              k === 'measuredOn' ? v : parseFloat(v as string),
            ]),
          ),
        }),
      },
    );

    if (res.ok) {
      setStatus('success');
      setFormData(initialState);
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">
        Add {isBiometric ? 'Biometric' : 'Mobility'} Data
      </h3>

      <input
        type="date"
        name="measuredOn"
        value={formData.measuredOn}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {Object.entries(formData)
        .filter(([key]) => key !== 'measuredOn')
        .map(([key, value]) => (
          <input
            key={key}
            type="number"
            step="any"
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={key[0].toUpperCase() + key.slice(1)}
            required
            className="w-full p-2 border rounded"
          />
        ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>

      {status === 'success' && <p className="text-green-600">Entry saved successfully.</p>}
      {status === 'error' && <p className="text-red-600">Something went wrong. Try again.</p>}
    </form>
  );
};

export default ProgressForm;
