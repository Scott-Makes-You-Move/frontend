'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/Input';

type Props = {
  accessToken: any;
  accountId: string;
  type: 'biometrics' | 'mobilities';
};

const ProgressForm: React.FC<Props> = ({ accessToken, accountId, type }) => {
  const isBiometric = type === 'biometrics';

  const initialState = isBiometric
    ? { measuredOn: '', weight: '', fat: '', visceralFat: '' }
    : { measuredOn: '', hips: '', shoulder: '', back: '' };

  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setErrorMessage('');

    if (!isBiometric) {
      const invalidFields = Object.entries(formData).filter(([key, value]) => {
        if (key === 'measuredOn') return false;
        const intVal = parseInt(value, 10);
        return isNaN(intVal) || intVal < 1 || intVal > 3 || value.includes('.');
      });

      if (invalidFields.length > 0) {
        setStatus('error');
        setErrorMessage('All mobility values must be whole numbers between 1 and 3.');
        setShowToast(true);
        return;
      }
    }

    const res = await fetch(
      `https://backend.scottmakesyoumove.com/api/v1/account/${accountId}/${type}`,
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
      setErrorMessage('');
    } else {
      let message;
      try {
        const data = await res.json();
        if (data && data.message) message = data.message;
      } catch (e) {
        console.error('Error parsing error response:', e);
        message = 'Something went wrong. Please try again.';
      }
      setErrorMessage(message);
      setStatus('error');
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast && errorRef.current) {
      errorRef.current.focus();
      const timeout = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 border rounded-md space-y-4"
      aria-labelledby="form-heading"
    >
      <h3 id="form-heading" className="text-lg font-semibold text-gray-800">
        Add {isBiometric ? 'Biometric' : 'Mobility'} Data
      </h3>

      {/* Date Field */}
      <div className="flex flex-col">
        <label htmlFor="measuredOn" className="mb-1 text-sm font-medium text-gray-700">
          Measurement Date
        </label>
        <Input
          id="measuredOn"
          name="measuredOn"
          type="date"
          value={formData.measuredOn}
          onChange={handleChange}
          required
          error={status === 'error' ? 'Please select a date.' : undefined}
        />
      </div>

      {/* Dynamic Fields */}
      {Object.entries(formData)
        .filter(([key]) => key !== 'measuredOn')
        .map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 text-sm font-medium text-gray-700">
              {key[0].toUpperCase() + key.slice(1)}
            </label>
            <Input
              id={key}
              name={key}
              type="number"
              step={isBiometric ? 'any' : '1'}
              min={isBiometric ? undefined : 1}
              max={isBiometric ? undefined : 3}
              value={value}
              onChange={handleChange}
              required
              error={status === 'error' ? `Please enter a valid ${key}.` : undefined}
            />
          </div>
        ))}

      <Button type="submit" variant="default" size="default">
        Submit
      </Button>

      {/* Screen Reader Announcement */}
      {status === 'success' && (
        <p className="text-green-600 mt-2" role="alert" aria-live="polite">
          Entry saved successfully.
        </p>
      )}
      {status === 'error' && (
        <p id="error-message" className="sr-only" role="alert" aria-live="assertive">
          {errorMessage ||
            'There was an error submitting the form. Check the fields and try again.'}
        </p>
      )}

      {/* Accessible Toast */}
      {showToast && (
        <Toast
          title="Submission Failed"
          message={errorMessage || 'Something went wrong. Please try again.'}
          type="error"
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      )}
    </form>
  );
};

export default ProgressForm;
