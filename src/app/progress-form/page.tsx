import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/authOptions';
import { redirect } from 'next/navigation';
import ProgressForm from './ProgressForm';

export default async function ProgressFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/progress-form');
  }

  return (
    <div className="max-w-screen-sm mx-auto pt-20 px-4">
      <ProgressForm accessToken={session.accessToken} accountId="1234" type="biometrics" />
      <ProgressForm accessToken={session.accessToken} accountId="1234" type="mobility" />
    </div>
  );
}
