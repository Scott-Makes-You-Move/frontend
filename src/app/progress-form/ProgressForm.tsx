'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

type Props = {
  accessToken: any;
  accountId: string;
  type: 'biometrics' | 'mobility';
};

const ProgressForm: React.FC<Props> = ({ accessToken, accountId, type }) => {
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
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 border rounded-md space-y-4"
      aria-labelledby="form-heading"
    >
      <h3 id="form-heading" className="text-lg font-semibold text-gray-800">
        Add {isBiometric ? 'Biometric' : 'Mobility'} Data
      </h3>

      {/* Date field */}
      <div className="flex flex-col">
        <label htmlFor="measuredOn" className="mb-1 text-sm font-medium text-gray-700">
          Measurement Date {/* TODO: use CMS content */}
        </label>
        <input
          id="measuredOn"
          type="date"
          name="measuredOn"
          value={formData.measuredOn}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Dynamic fields */}
      {Object.entries(formData)
        .filter(([key]) => key !== 'measuredOn')
        .map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 text-sm font-medium text-gray-700">
              {key[0].toUpperCase() + key.slice(1)}
            </label>
            <input
              id={key}
              type="number"
              step="any"
              name={key}
              value={value}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              aria-describedby={`${key}-desc`}
            />
            <span id={`${key}-desc`} className="sr-only">
              Enter {key} as a number {/* TODO: use CMS content */}
            </span>
          </div>
        ))}

      <Button type="submit" variant="default" size="default">
        Submit
      </Button>

      {/* Status messages */}
      <div role="status" aria-live="polite">
        {status === 'success' && (
          <p className="text-green-800 mt-2" role="alert">
            Entry saved successfully. {/* TODO: use CMS content */}
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mt-2" role="alert">
            Something went wrong. Try again. {/* TODO: use CMS content */}
          </p>
        )}
      </div>
    </form>
  );
};

export default ProgressForm;
