import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/authOptions';
import { redirect } from 'next/navigation';
import SessionsPage from './sessionsPage'; // we'll move your existing component here

export default async function SessionsPageWrapper() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/sessions');
  }

  return <SessionsPage />;
}
