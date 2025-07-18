'use client';

import { useEffect, useState } from 'react';
import { User, Move } from 'lucide-react';
import ProgressFormSection from './ProgressFormSection';
import Toast from '@/components/ui/Toast';
import Spinner from '@/components/ui/Spinner';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tabs';

type Props = {
  accessToken: string;
  accountId: string;
};

const ProgressFormLoader = ({ accessToken, accountId }: Props) => {
  const [ready, setReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const ensureAccountExists = async () => {
      try {
        const res = await fetch('https://backend.scottmakesyoumove.com/api/v1/account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ accountId }),
        });

        if (!res.ok) {
          const data = await res.json();
          const message = data?.message || 'Account registration failed';

          // TODO: Handle this in the backend to avoid duplicates
          // Fallback for now: if it’s a known duplicate, skip the error
          if (
            message.includes('already associated with the session') ||
            message.includes('already exists')
          ) {
            setReady(true);
            return;
          }

          throw new Error(message);
        }

        setReady(true);
      } catch (err: any) {
        setErrorMessage(err.message || 'Something went wrong');
        setShowToast(true);
      }
    };

    if (accountId && accessToken) {
      ensureAccountExists();
    }
  }, [accountId, accessToken]);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-gray-700">
        <Spinner className="w-10 h-10 text-primary mb-4" />
        <p className="text-sm">Preparing your forms...</p>

        {showToast && (
          <Toast
            title="Account Error"
            message={errorMessage}
            type="error"
            onClose={() => setShowToast(false)}
            duration={6000}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10">
      <Tabs defaultValue="biometrics">
        <TabList>
          <Tab value="biometrics">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sm font-medium" />
              <span>Biometric Data</span>
            </div>
          </Tab>

          <Tab value="mobilities">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-sm font-medium" />
              <span>Mobility Scores</span>
            </div>
          </Tab>
        </TabList>

        <TabPanel value="biometrics">
          <ProgressFormSection accessToken={accessToken} accountId={accountId} type="biometrics" />
        </TabPanel>

        <TabPanel value="mobilities">
          <ProgressFormSection accessToken={accessToken} accountId={accountId} type="mobilities" />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProgressFormLoader;
