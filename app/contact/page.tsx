// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Button } from "@/components/Button";
import { Mail, Phone } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 font-body animate-fade-in">
      <h1 className="text-4xl font-title font-bold text-primary mb-8">
        Contact Us
      </h1>
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="font-title text-primary">
            Send us a Message (NOT FUNCTIONAL)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-primary mb-1"
              >
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-1"
              >
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
              <label
                htmlFor="message"
                className="block text-sm font-medium text-primary mb-1"
              >
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

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-secondary text-background font-title transition-colors rounded-button"
            >
              Send Message
            </Button>
          </form>

          {/* <div className="mt-8 pt-8 border-t border-primary/10">
            <h2 className="text-2xl font-title font-semibold text-primary mb-4">
              Other Ways to Reach Us
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-primary mr-3" />
                <a
                  href="mailto:support@scottmakesyoumove.com"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  support@scottmakesyoumove.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-primary mr-3" />
                <span className="text-gray-700">XX-XXX-XXXX</span>
              </div>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </main>
  );
};

export default ContactPage;
