import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/authOptions';
import { redirect } from 'next/navigation';
import ProgressFormSection from './ProgressFormSection';

export default async function ProgressFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/progress-form');
  }

  return (
    <div className="max-w-screen pt-20 ">
      <ProgressFormSection accessToken={session.accessToken} accountId="1234" type="biometrics" />
      <ProgressFormSection accessToken={session.accessToken} accountId="1234" type="mobility" />
    </div>
  );
}
