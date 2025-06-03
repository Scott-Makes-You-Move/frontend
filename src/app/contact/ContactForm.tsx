'use client';

import { useForm, ValidationError } from '@formspree/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xgvyejjk');

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 font-body animate-fade-in">
      <h1 className="text-4xl font-title font-bold text-primary mb-8">Contact Us</h1>
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="font-title text-primary">Send us a Message</CardTitle>
        </CardHeader>

        <CardContent>
          {state.succeeded ? (
            <p className="text-green-600 text-lg">Thanks! Your message has been sent.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="border-primary/20 focus:border-secondary focus:ring-secondary"
                />
                <ValidationError
                  field="name"
                  prefix="Name"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="border-primary/20 focus:border-secondary focus:ring-secondary"
                />
                <ValidationError
                  field="email"
                  prefix="Email"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="border-primary/20 focus:border-secondary focus:ring-secondary"
                />
                <ValidationError
                  field="message"
                  prefix="Message"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full rounded-full"
                disabled={state.submitting}
              >
                {state.submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactForm;
