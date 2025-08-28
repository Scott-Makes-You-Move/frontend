'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, Users, Shield, Clock } from 'lucide-react';

export default function SMYMLandingPageNL() {
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8">
          <CardContent className="space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Je bent erbij!</h2>
            <p className="text-gray-600">
              Welkom bij de SMYM 30-Dagen Pilot Challenge! Controleer je e-mail voor de volgende
              stappen en je eerste 1-minuut bewegingsherinnering.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#155da0]/5 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Stop Pijn Voordat Het Begint.{' '}
                <span className="text-[#155da0]">Voel Je Energiek op Werk.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Doe mee aan onze 30-Dagen Pilot Challenge en ontdek hoe slechts 1 minuut dagelijkse
                beweging je werkdag kan transformeren. Geen rugpijn, nekspanning of middagse
                energiedips meer.
              </p>
              <EmailCaptureForm />
            </div>
            <div className="relative">
              <Image
                src="/office-workers-mobility.png"
                alt="Kantoormedewerkers doen bureau-oefeningen"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Health Risks Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Te veel zitten schaadt je gezondheid
              </h2>
              <h3 className="text-xl font-semibold text-[#155da0]">
                De wetenschap achter dagelijkse micro-bewegingen
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Wist je dat Nederlandse kantoormedewerkers gemiddeld 9,1 uur per dag zitten? Dit
                verhoogt dramatisch het risico op hart- en vaatziekten, diabetes en rugpijn...
              </p>
              <EmailCaptureForm buttonText="Doe mee aan de 30-Dagen Pilot Challenge" />
            </div>
            <div className="relative">
              <Image
                src="/health-risks-sitting.png"
                alt="Kantoormedewerker doet mobiliteitsoefening tegen gezondheidsrisico's"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Waarom Kantoormedewerkers Kiezen voor SMYM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Drie kernpijlers speciaal ontworpen voor drukke professionals die dagelijks 7-9 uur
              zitten.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Users,
                title: 'Persoonlijk',
                desc: 'Oefeningen afgestemd op jouw specifieke pijnpunten en bewegingsniveau.',
              },
              {
                icon: Shield,
                title: 'Preventief',
                desc: 'Voorkom pijntjes met wetenschappelijk onderbouwde micro-bewegingen.',
              },
              {
                icon: Clock,
                title: 'Gemeenschap',
                desc: 'Maandelijkse virtuele evenementen met andere kantoormedewerkers.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Card
                key={title}
                className="text-center p-8 border-2 hover:border-[#155da0]/20 transition-colors"
              >
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-[#155da0]/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-[#155da0]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <EmailCaptureForm buttonText="Start Je 30-Dagen Challenge" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Hoe SMYM Werkt</h2>
            <p className="text-xl text-gray-600">
              Simpel, effectief en ontworpen voor jouw drukke schema
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              'Aanmelden',
              'Ontvang Dagelijkse Herinneringen',
              'Doe Mee aan Gemeenschapsevenementen',
            ].map((step, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#155da0] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{step}</h3>
                <p className="text-gray-600">
                  {/* Simple desc placeholder */}
                  Stap {i + 1} uitlegtekst.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <EmailCaptureForm buttonText="Begin Nu" />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vertrouwd door Vooruitstrevende Bedrijven
            </h2>
            <p className="text-xl text-gray-600">HR-managers en medewerkers zien al resultaten</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                name: 'Sarah Johnson',
                title: 'HR Directeur, TechCorp',
                quote:
                  'Ons IT-team was eerst sceptisch, maar na slechts twee weken vragen ze om meer bewegingspauzes.',
                initials: 'SJ',
              },
              {
                name: 'Mike Rodriguez',
                title: 'Compliance Manager, FinanceFirst',
                quote:
                  'Als iemand in compliance die de hele dag zit, is SMYM een game-changer geweest.',
                initials: 'MR',
              },
            ].map(({ name, title, quote, initials }, i) => (
              <Card key={i} className="p-8">
                <CardContent className="space-y-4">
                  <div
                    className="flex items-center space-x-1 text-yellow-400"
                    aria-label="Beoordeling: 5 van 5 sterren"
                  >
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">{initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{name}</p>
                      <p className="text-gray-600 text-sm">{title}</p>
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

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-[#155da0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Klaar om Je Dagelijkse Werkroutine te Transformeren?
          </h2>
          <p className="text-xl text-[#ffffffcc] mb-8">
            Doe mee met honderden kantoormedewerkers die al beter bewegen, zich beter voelen en
            beter werken.
          </p>
          <EmailCaptureForm className="mb-6" buttonText="Start 30-Dagen Challenge Nu" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">SMYM</h3>
              <p className="text-gray-400">Scott Makes You Move</p>
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
            <EmailCaptureForm buttonText="Laatste Kans - Doe Mee aan 30-Dagen Challenge" />
            <p className="text-gray-400 text-sm mt-4">
              © 2024 Scott Makes You Move. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
