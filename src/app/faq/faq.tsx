'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: 'How do I know which exercise to do today?',
    answer:
      'You’ll receive a short video prompt every weekday via notification or calendar invite. Just click, follow along, and move for 1–2 minutes. The exercises are tailored to your mobility level.',
  },
  {
    question: 'What happens if I skip a day or forget to move?',
    answer:
      'No worries! The program is designed for long-term consistency. Just jump back in the next day — your streak will continue, and your body will thank you.',
  },
  {
    question: 'Where can I see my progress?',
    answer:
      'Go to the ‘Progress’ tab in the app. You’ll find your mobility scores, weekly CR10 stress ratings, and your daily streak tracker — all in one place.',
  },
  {
    question: 'How will I know when the monthly check-up or event is happening?',
    answer:
      'You’ll receive a calendar invite and reminder email. The check-up takes place at your office and lasts about 60–90 minutes. Just check your calendar to stay updated.',
  },
  {
    question: 'I can’t make it to the monthly check-up. What should I do?',
    answer: (
      <>
        No problem. You can book a personal re-check moment using this link:{' '}
        <a
          href="https://calendly.com/scottmakesyoumove/coachcall"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Coach Call via Calendly
        </a>
        .
      </>
    ),
  },
  {
    question: 'How do I earn points, and how does the leaderboard work?',
    answer:
      'You earn 1 point for each completed daily Micro-Movement. Your total is displayed in the ‘Leaderboard’ tab in the app. Prefer to stay anonymous? You can toggle that on in your settings.',
  },
  {
    question: 'How can I change or pause my daily notifications?',
    answer:
      'Go to your app settings or calendar (Google/Outlook) and adjust or pause the “Micro-Movement” events. You can always turn them back on later.',
  },
  {
    question: 'What should I bring to my intake or check-up?',
    answer:
      'Remove your shoes, watch, and anything in your pockets before testing. Wear comfortable clothing. Your mobility and biometric scores will be shared with you in the app or via email.',
  },
  {
    question: 'How do I get help if I have questions about exercises or scores?',
    answer: (
      <>
        You can email us at:{' '}
        <a href="mailto:scottmakesyoumove@gmail.com" className="text-primary underline">
          scottmakesyoumove@gmail.com
        </a>{' '}
        <br />
        Or book a free 1-on-1 coach call:{' '}
        <a
          href="https://calendly.com/scottmakesyoumove/coachcall"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          Book a Coach Call
        </a>
      </>
    ),
  },
  {
    question: 'What happens after the 12-week program ends?',
    answer:
      'You’ll receive a personal progress report showing your mobility gains, stress trends, and movement consistency. Your company will then decide — together with you — if there’s a follow-up or continuation.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-background text-gray-900 font-body py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title font-bold text-primary text-center mb-10">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-700 text-sm bg-white">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="default" size="lg" className="rounded-full">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
