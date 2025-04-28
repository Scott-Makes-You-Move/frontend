import requireAuth from '@/lib/auth/requireAuth';
import SessionsPage from './sessionsPage'; // we'll move your existing component here

export default async function SessionsPageWrapper() {
  await requireAuth({ callbackUrl: '/sessions' });

  return <SessionsPage />;
}
