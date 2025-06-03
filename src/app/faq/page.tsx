import requireAuth from '@/lib/auth/requireAuth';
import FAQ from './faq';

const faqPage = async () => {
  await requireAuth({ callbackUrl: '/faq' });

  return <FAQ />;
};

export default faqPage;
