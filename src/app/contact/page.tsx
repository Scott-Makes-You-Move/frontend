import requireAuth from '@/lib/auth/requireAuth';
import ContactForm from './ContactForm';

export default async function ContactPage() {
  await requireAuth({ callbackUrl: '/contact' });

  return <ContactForm />;
}
