'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

type PageQueryResult = {
  page: {
    id: string;
    sections: Array<
      | {
          __typename: 'HeroSectionRecord';
          id: string;
          heroTitle: string;
          heroSubtitle: string;
          heroDescription: string;
          buttons: Array<{
            label: string;
            primary: boolean;
            url: string;
          }>;
          image: {
            alt: string;
            height: number;
            url: string;
            title: string;
            width: number;
          } | null;
        }
      | {
          __typename: 'FeatureListSectionRecord';
          id: string;
          featuresHeader: string;
          featuresSubheader: string;
          features: Array<{
            id: string;
            featureTitle: string;
            featureDescription: string;
            featureIcon: {
              alt: string;
              title: string;
              url: string;
              height: number;
              width: number;
            };
          }>;
        }
      | {
          __typename: 'TestimonialsSectionRecord';
          id: string;
          reviewTitle: string;
          subheader: string;
          reviews: Array<{
            id: string;
            name: string;
            jobTitle: string;
            initials: string;
            rating: number;
          }>;
        }
      | {
          __typename: 'FooterLandingPageRecord';
          id: string;
          companyName: string;
          companyTagLine: string;
          copyrightText: string;
          button: {
            primary: boolean;
            label: string;
            url: string;
          };
        }
    >;
  };
};

type PilotChallengeProps = {
  page: PageQueryResult['page'];
};

const PilotChallenge = ({ page }: PilotChallengeProps) => {
  console.log('🚀 ~ PilotChallenge ~ page:', page);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const announcementRef = useRef<HTMLDivElement | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email submitted:', email);
      setIsSubmitted(true);
      setEmail('');
    }
  };

  useEffect(() => {
    if (isSubmitted && announcementRef.current) {
      announcementRef.current.focus();
    }
  }, [isSubmitted]);

  const EmailCaptureForm = ({
    className = '',
    buttonText = 'Doe mee aan de 30-Dagen Pilot Challenge',
  }: {
    className?: string;
    buttonText?: string;
  }) => (
    <form
      onSubmit={handleEmailSubmit}
      className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${className}`}
      aria-labelledby="email-signup"
    >
      <label htmlFor="email" className="sr-only">
        Werk e-mailadres
      </label>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Voer je werk e-mail in"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 h-12 text-base"
        aria-required="true"
        autoComplete="email"
      />
      <Button
        type="submit"
        size="lg"
        className="bg-[#155da0] hover:bg-[#124a85] text-white px-8 h-12 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#155da0]"
      >
        {buttonText}
      </Button>
      <div ref={announcementRef} role="status" aria-live="polite" tabIndex={-1} className="sr-only">
        {isSubmitted && 'E-mail succesvol verzonden. Controleer je inbox.'}
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {page.sections.map((section) => {
        switch (section.__typename) {
          case 'HeroSectionRecord':
            const [mainTitle, highlight] = section.heroTitle.split('|');

            return (
              <section key={section.id} className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#155da0]/5 to-white" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        {mainTitle}
                        {highlight && <span className="text-[#155da0]"> {highlight}</span>}
                      </h1>
                      {section.heroSubtitle && (
                        <p className="text-xl font-semibold text-[#155da0]">
                          {' '}
                          {section.heroSubtitle}
                        </p>
                      )}
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {section.heroDescription}
                      </p>
                      <EmailCaptureForm buttonText={section.buttons?.[0]?.label} />
                    </div>
                    {section.image && (
                      <div className="relative">
                        <Image
                          src={section.image.url}
                          alt={section.image.alt}
                          width={section.image.width}
                          height={section.image.height}
                          className="w-full h-auto rounded-lg shadow-2xl"
                          priority
                        />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );

          case 'FeatureListSectionRecord':
            return (
              <section
                key={section.id}
                className={`py-16 lg:py-24 ${section.featuresHeader === 'Hoe SMYM Werkt' ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {section.featuresHeader}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                      {section.featuresSubheader}
                    </p>
                  </div>
                  <div
                    className={`grid md:grid-cols-${
                      section.features.length > 2 ? 3 : 2
                    } gap-8 mb-12`}
                  >
                    {section.features.map((feature) => (
                      <Card
                        key={feature.id}
                        className="text-center p-8 border-2 hover:border-[#155da0]/20 transition-colors"
                      >
                        <CardContent className="space-y-4">
                          <div className="w-16 h-16 bg-[#155da0]/10 rounded-full flex items-center justify-center mx-auto">
                            <Image
                              src={feature.featureIcon.url}
                              alt={feature.featureIcon.alt}
                              width={32}
                              height={32}
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {feature.featureTitle}
                          </h3>
                          <p className="text-gray-600">{feature.featureDescription}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center">
                    <EmailCaptureForm buttonText="Start Je 30-Dagen Challenge" />
                  </div>
                </div>
              </section>
            );

          case 'TestimonialsSectionRecord':
            return (
              <section key={section.id} className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {section.reviewTitle}
                    </h2>
                    <p className="text-xl text-gray-600">{section.subheader}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {section.reviews.map((review) => (
                      <Card key={review.id} className="p-8">
                        <CardContent className="space-y-4">
                          <div
                            className="flex items-center space-x-1 text-yellow-400"
                            aria-label={`Beoordeling: ${review.rating} van 5 sterren`}
                          >
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          <p className="text-gray-600 italic">“{review.name}”</p>
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 font-semibold">{review.initials}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{review.name}</p>
                              <p className="text-gray-600 text-sm">{review.jobTitle}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="text-center">
                    <EmailCaptureForm buttonText="Doe Mee aan de Beweging" />
                  </div>
                </div>
              </section>
            );

          case 'FooterLandingPageRecord':
            return (
              <footer key={section.id} className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white">{section.companyName}</h3>
                      <p className="text-gray-400">{section.companyTagLine}</p>
                    </div>
                    <div className="flex space-x-6">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Privacybeleid
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Contact
                      </a>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <EmailCaptureForm buttonText={section.button.label} />
                    <p className="text-gray-400 text-sm mt-4">{section.copyrightText}</p>
                  </div>
                </div>
              </footer>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default PilotChallenge;
