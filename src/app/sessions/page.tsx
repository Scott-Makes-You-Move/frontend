import requireAuth from '@/lib/auth/requireAuth';
import SessionsPage from './sessionsPage';

export default async function SessionsPageWrapper() {
  const session = await requireAuth({ callbackUrl: '/sessions' });

  return (
    <SessionsPage accountId={session.accountId ?? ''} accessToken={session.accessToken ?? ''} />
  );
}
