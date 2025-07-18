'use client';

import dynamic from 'next/dynamic';
const ProgressFormLoader = dynamic(() => import('./ProgressFormLoader'), { ssr: false });

type Props = {
  accessToken: string;
  accountId: string;
};

const ProgressFormPageClient = ({ accessToken, accountId }: Props) => {
  return <ProgressFormLoader accessToken={accessToken} accountId={accountId} />;
};

export default ProgressFormPageClient;
