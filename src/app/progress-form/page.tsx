import requireAuth from '@/lib/auth/requireAuth';
import ProgressFormSection from './ProgressFormSection';

export default async function ProgressFormPage() {
  const session = await requireAuth({ callbackUrl: '/progress-form' });

  return (
    <div className="max-w-screen pt-20 ">
      <ProgressFormSection
        accessToken={session.accessToken}
        accountId={session.accountId ?? ''}
        type="biometrics"
      />
      <ProgressFormSection
        accessToken={session.accessToken}
        accountId={session.accountId ?? ''}
        type="mobility"
      />
    </div>
  );
}
