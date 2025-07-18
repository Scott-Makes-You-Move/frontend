import requireAuth from '@/lib/auth/requireAuth';
import ProgressFormPageClient from './ProgressFormPageClient';

const ProgressFormPage = async () => {
  const session = await requireAuth({ callbackUrl: '/progress-form' });

  return (
    <div className="max-w-screen pt-20 ">
      <ProgressFormPageClient
        accessToken={session.accessToken ?? ''}
        accountId={session.accountId ?? ''}
      />
    </div>
  );
};

export default ProgressFormPage;
