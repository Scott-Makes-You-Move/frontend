'use client';

import React from 'react';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { MailIcon, CalendarIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const [state, handleSubmit] = useForm('xblowvoa');

  return (
    <footer className="bg-gray-100 text-foreground border-t border-border">
      {/* Top Section: Newsletter & Book a Coach */}
      <section className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6 px-6 py-12">
        {/* Newsletter */}
        <div className="bg-[#e8e6e1] rounded-2xl flex flex-col gap-4 shadow-sm p-8 md:p-16">
          <div className="flex flex-col items-start gap-4">
            <MailIcon className="w-6 h-6 text-foreground mt-1" />
            <div>
              <h3 className="text-xl font-bold font-title">Stay up to date</h3>
              <p className="text-muted-foreground text-sm">
                Join our newsletter to stay up to date with all that we are working on.
              </p>
            </div>
          </div>

          {state.succeeded ? (
            <p className="text-sm font-medium text-green-700 mt-4">Thanks for joining!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="w-full">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full flex-1 rounded-full px-4 py-2 border border-border bg-white text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={state.submitting}
                className="rounded-full w-full md:w-2/3"
              >
                {state.submitting ? 'Joining...' : 'Join newsletter →'}
              </Button>
            </form>
          )}
        </div>

        {/* Book a Coach */}
        <div className="bg-[#bccac1] rounded-2xl flex flex-col justify-between shadow-sm p-8 md:p-16">
          <div className="flex flex-col items-start gap-4">
            <CalendarIcon className="w-6 h-6 text-foreground mt-1" />
            <div>
              <h3 className="text-xl font-bold font-title">Book a Coaching Call</h3>
              <p className="text-muted-foreground text-sm">
                Get a session with a coach and see how it can work for you.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              as="a"
              href="https://calendly.com/scottmakesyoumove/coachcall"
              className="rounded-full px-6"
            >
              Book a Coaching Call →
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <section className="bg-primary text-background px-6 py-10">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Logo variant="white" />
            <p className="text-sm opacity-80">
              Shaping a healthier world,
              <br />
              in body and business.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-2">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="https://calendly.com/scottmakesyoumove/coachcall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Book a Coaching Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About SMYM
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          {/*           <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div> */}
        </div>
      </section>
    </footer>
  );
};

export default Footer;
