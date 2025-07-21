'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StructuredText, renderRule } from 'react-datocms';
import { isLink } from 'datocms-structured-text-utils';
import Link from 'next/link';

type FaqSection = {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    answer: { value: any };
  }[];
};

type FAQProps = {
  sections: FaqSection[];
};

const FAQ = ({ sections }: FAQProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };
  const { title, questions } = sections[0] || {
    title: 'Frequently Asked Questions',
    questions: [],
  };

  return (
    <section className="min-h-screen bg-background text-gray-900 font-body py-20 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title font-bold text-primary text-center mb-10">{title}</h1>

        <div className="space-y-4">
          {questions.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  id={`faq-trigger-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
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
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${faq.id}`}
                    className="px-4 pb-4 text-gray-700 text-sm bg-white"
                  >
                    <StructuredText
                      data={faq.answer.value}
                      customNodeRules={[
                        renderRule(isLink, ({ node, children, key }) => {
                          const url = node.url;
                          const target = node.meta?.find((m) => m.id === 'target')?.value;

                          return (
                            <a
                              key={key}
                              href={url}
                              target={target === '_blank' ? '_blank' : undefined}
                              rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                              className="text-primary underline hover:text-primary/80 transition-colors"
                            >
                              {children}
                            </a>
                          );
                        }),
                      ]}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button as={Link} href="/contact" variant="default" size="lg" className="rounded-full">
            Contact Support →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
