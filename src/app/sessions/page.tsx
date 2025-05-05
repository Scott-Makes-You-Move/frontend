import requireAuth from '@/lib/auth/requireAuth';
import SessionsPage from './sessionsPage';

export default async function SessionsPageWrapper() {
  await requireAuth({ callbackUrl: '/sessions' });

  return <SessionsPage />;
}
