import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth/authOptions';
import { redirect } from 'next/navigation';

type RequireAuthOptions = {
  callbackUrl?: string;
};

const requireAuth = async ({ callbackUrl = '/' }: RequireAuthOptions = {}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
  }

  return session;
};

export default requireAuth;
