'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 font-body animate-fade-in">
      <h1 className="text-4xl font-title font-bold text-primary mb-8">Contact Us</h1>
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="font-title text-primary">
            Send us a Message (NOT FUNCTIONAL)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-primary/20 focus:border-secondary focus:ring-secondary"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-primary/20 focus:border-secondary focus:ring-secondary"
                required
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
                value={formData.message}
                onChange={handleChange}
                className="border-primary/20 focus:border-secondary focus:ring-secondary"
                required
              />
            </div>
            <Button type="submit" variant="default" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ContactForm;
