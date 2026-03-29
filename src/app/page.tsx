'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Clock,
  Heart,
  Users,
  Zap,
  BarChart3,
  Shield,
  ChevronDown,
  Menu,
  X,
  Target,
  Brain,
  Activity,
  TrendingUp,
  Mail,
  CheckCircle,
} from 'lucide-react';

// CDN image URLs
const IMAGES = {
  hero: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663194524829/A9jJ2eztE6JMn4drZjufYC/smym-hero-87TzqfEYGo3CfcPbACsP7G.webp',
  problem:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663194524829/A9jJ2eztE6JMn4drZjufYC/smym-problem-PT97a76oE6e3jzMUPx66BD.webp',
  solution:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663194524829/A9jJ2eztE6JMn4drZjufYC/smym-solution-Baz2iV4Nj3MnsNb9eFegFi.webp',
  community:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663194524829/A9jJ2eztE6JMn4drZjufYC/smym-community-7dD99LcZ4k5Hn2ruRGpszn.webp',
  scott:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663194524829/A9jJ2eztE6JMn4drZjufYC/smym-scott-gQHoJooKh9HJoaC439mVo7.webp',
};

/* ─── Scroll animation hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

/* ─── Counter animation hook ─── */
function useCountUp(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}
export const dynamic = 'force-dynamic';

/* ─── Navigation ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Probleem', href: '#probleem' },
    { label: 'Oplossing', href: '#oplossing' },
    { label: 'Voordelen', href: '#voordelen' },
    { label: 'Hoe het werkt', href: '#hoe-het-werkt' },
    { label: 'Over Scott', href: '#over-scott' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-brand-mid flex items-center justify-center">
            <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display font-bold text-base lg:text-lg text-navy tracking-tight">
              Scott Makes You Move
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy/70 hover:text-brand-mid transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact">
            <Button className="bg-green hover:bg-green-dark text-white font-semibold px-6 pulse-cta rounded-lg">
              Plan een demo
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <X className="w-6 h-6 text-navy" />
          ) : (
            <Menu className="w-6 h-6 text-navy" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-border px-4 pb-6 pt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-base font-medium text-navy/80 hover:text-brand-mid transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            <Button className="w-full mt-3 bg-green hover:bg-green-dark text-white font-semibold rounded-lg">
              Plan een demo
            </Button>
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const anim = useInView(0.1);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with brand blue overlay */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Kantoorwerkers die samen bewegen"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(20,93,160,0.88) 0%, rgba(28,117,188,0.72) 50%, rgba(28,117,188,0.3) 100%)',
          }}
        />
      </div>

      <div
        ref={anim.ref}
        className={`container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24 transition-all duration-1000 ${
          anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 mb-6">
            <Activity className="w-4 h-4 text-yellow" />
            <span className="text-sm font-medium text-white">Workplace Vitality Program</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6">
            Minder zitten.
            <br />
            <span className="text-yellow">Meer bewegen.</span>
          </h1>

          <p
            className="text-lg lg:text-xl text-white/85 leading-relaxed mb-8 max-w-xl"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Scott Makes You Move helpt kantoorwerkers om met korte, slimme beweegmomenten meer
            energie te krijgen, minder klachten te ervaren en gezondere werkgewoontes op te bouwen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact">
              <Button
                size="lg"
                className="bg-green hover:bg-green-dark text-white font-semibold text-base px-8 py-6 rounded-lg pulse-cta"
              >
                Plan een demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#oplossing">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 py-6 rounded-lg"
              >
                Ontdek hoe het werkt
                <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Brand pillars */}
          <div className="flex flex-wrap gap-3 mt-10">
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase">
              Personal
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase">
              Preventive
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase">
              Community
            </span>
          </div>
        </div>
      </div>

      {/* Diagonal bottom cut */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 80L1440 0V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const anim = useInView(0.3);
  const h = useCountUp(8, 1800, anim.isVisible);
  const p = useCountUp(76, 1800, anim.isVisible);
  const m = useCountUp(1, 800, anim.isVisible);

  const stats = [
    {
      value: `${h}+`,
      label: 'uur per dag zitten kantoorwerkers gemiddeld',
      icon: <Clock className="w-5 h-5" />,
    },
    {
      value: `${p}%`,
      label: 'ervaart nek-, schouder- of rugklachten',
      icon: <Activity className="w-5 h-5" />,
    },
    {
      value: `${m} min`,
      label: 'per sessie is al genoeg om verschil te maken',
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <section ref={anim.ref} className="py-14 lg:py-18 bg-white">
      <div className="container">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-xl bg-brand-lightest border border-brand-light/50"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-brand-mid">{s.icon}</span>
                <span className="text-4xl lg:text-5xl font-display font-bold text-brand-dark">
                  {s.value}
                </span>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Problem Section ─── */
function ProblemSection() {
  const anim = useInView(0.15);
  const problems = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Stijve nek & schouders',
      desc: 'Langdurig in dezelfde houding zitten leidt tot chronische spanning in nek en schouders.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Energiedips & focusverlies',
      desc: 'Stilzitten vermindert de doorbloeding, waardoor je concentratie en energie dalen.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Rugklachten & stijfheid',
      desc: 'Overbelasting van de onderrug en heupstijfheid zijn veelvoorkomende gevolgen van langdurig zitten.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Lagere productiviteit',
      desc: 'Fysiek ongemak en vermoeidheid leiden tot minder output en een lagere werkkwaliteit.',
    },
  ];

  return (
    <section id="probleem" className="py-20 lg:py-28 bg-brand-lightest">
      <div className="container">
        <div
          ref={anim.ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Image */}
          <div className="relative">
            <img
              src={IMAGES.problem}
              alt="Van stilzitten naar bewegen"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-brand-mid text-white px-5 py-3 rounded-xl shadow-lg font-display font-semibold text-sm">
              Van stijf naar energiek
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-brand-mid font-semibold text-sm uppercase tracking-wider">
              Het probleem
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-navy mt-3 mb-6 leading-tight">
              Langdurig zitten is het
              <span className="text-brand-mid"> stille risico</span> van de moderne werkdag
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Meer dan 8 uur per dag zitten hangt samen met verhoogde gezondheidsrisico's. Zelfs als
              je sport buiten werktijd, compenseert dat niet volledig voor langdurig stilzitten
              gedurende de werkdag.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 shadow-sm border border-brand-light/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-mid/10 flex items-center justify-center text-brand-mid mb-3">
                    {p.icon}
                  </div>
                  <h3 className="font-display font-semibold text-navy mb-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Solution Section ─── */
function SolutionSection() {
  const anim = useInView(0.15);

  return (
    <section id="oplossing" className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div
          ref={anim.ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="text-green font-semibold text-sm uppercase tracking-wider">
              De oplossing
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-navy mt-3 mb-6 leading-tight">
              Micro-movement moments die
              <span className="text-green"> wél werken</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              SMYM integreert korte, slimme beweegmomenten in je werkdag. Geen uur extra sporten,
              maar beweging die je consequent volhoudt. Zo wordt gezondheid geen extra taak, maar
              een natuurlijk onderdeel van werk.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: '1-minuut sessies',
                  desc: 'Korte mobility-oefeningen die je moeiteloos in je werkdag past. Haalbaar, zelfs op de drukste dagen.',
                },
                {
                  icon: <Target className="w-5 h-5" />,
                  title: 'Speciaal voor kantoorwerkers',
                  desc: 'Ontwikkeld voor de klachten en uitdagingen van mensen die langdurig zitten.',
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: 'Community-gedreven',
                  desc: 'Samen bewegen versterkt de teamcultuur en verhoogt de betrokkenheid op kantoor.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center text-green shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-navy">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact">
              <Button className="bg-green hover:bg-green-dark text-white font-semibold px-6 rounded-lg">
                Ontdek SMYM
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <img
              src={IMAGES.solution}
              alt="Micro-movement op het werk"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -top-4 -left-4 bg-white px-5 py-3 rounded-xl shadow-lg border border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green" />
                <span className="font-display font-bold text-navy">Slechts 1 minuut</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits Section ─── */
function BenefitsSection() {
  const anim = useInView(0.15);

  const employeeBenefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Minder klachten',
      desc: 'Minder stijfheid en spanning in nek, schouders en rug gedurende de werkdag.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Meer energie',
      desc: 'Korte beweegonderbrekingen geven je een directe energieboost en verminderen vermoeidheid.',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Betere focus',
      desc: 'Beweging verbetert de doorbloeding en helpt je concentratie te herpakken.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Haalbaar & praktisch',
      desc: 'Bewegen dat past in zelfs de drukste werkdagen, zonder extra tijd of moeite.',
    },
  ];

  const employerBenefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Hogere productiviteit',
      desc: 'Energiekere medewerkers presteren beter en leveren kwalitatief werk.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Minder verzuim',
      desc: 'Preventieve aanpak vermindert fysieke klachten en verlaagt ziekteverzuim.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Sterkere cultuur',
      desc: 'Samen bewegen versterkt de teamband en maakt kantoorbezoek aantrekkelijker.',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Meetbare resultaten',
      desc: 'Inzicht in engagement en voortgang voor een duidelijke ROI op vitaliteit.',
    },
  ];

  return (
    <section id="voordelen" className="relative overflow-hidden">
      {/* Diagonal top */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 80L1440 0V80H0Z" fill="#145da0" />
        </svg>
      </div>

      <div style={{ backgroundColor: '#145da0' }} className="pb-20">
        <div className="container">
          <div
            ref={anim.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-yellow font-semibold text-sm uppercase tracking-wider">
              Voordelen
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white mt-3 mb-4">
              Waarde voor iedereen
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              SMYM levert meetbare voordelen voor zowel werknemers als werkgevers. Persoonlijk,
              preventief en community-gedreven.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Employee benefits */}
            <div
              className={`transition-all duration-700 delay-200 ${
                anim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <h3 className="text-xl font-display font-bold text-yellow mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Voor werknemers
              </h3>
              <div className="space-y-4">
                {employeeBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="bg-white/8 backdrop-blur-sm rounded-xl p-5 border border-white/12 hover:bg-white/12 transition-all duration-300"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-yellow/20 flex items-center justify-center text-yellow shrink-0">
                        {b.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-white mb-1">{b.title}</h4>
                        <p className="text-sm text-white/65 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employer benefits */}
            <div
              className={`transition-all duration-700 delay-400 ${
                anim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <h3 className="text-xl font-display font-bold text-yellow mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Voor werkgevers
              </h3>
              <div className="space-y-4">
                {employerBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="bg-white/8 backdrop-blur-sm rounded-xl p-5 border border-white/12 hover:bg-white/12 transition-all duration-300"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-yellow/20 flex items-center justify-center text-yellow shrink-0">
                        {b.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-white mb-1">{b.title}</h4>
                        <p className="text-sm text-white/65 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal bottom */}
      <div style={{ backgroundColor: '#145da0' }} className="-mb-1">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 0L1440 80V0H0Z" fill="#145da0" />
          <path d="M0 80L1440 0V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ─── How It Works Section ─── */
function HowItWorksSection() {
  const anim = useInView(0.15);

  const steps = [
    {
      num: '01',
      title: 'Onboarding & Assessment',
      desc: 'We brengen de behoeften van jouw team in kaart en stemmen het programma af op jullie specifieke situatie.',
      color: 'text-brand-mid',
    },
    {
      num: '02',
      title: 'Dagelijkse Micro-Movements',
      desc: 'Korte, gerichte beweegmomenten van 1 minuut die naadloos in de werkdag passen. Reminders houden je op koers.',
      color: 'text-green',
    },
    {
      num: '03',
      title: 'Community & Coaching',
      desc: 'Samen bewegen via challenges, events en persoonlijke begeleiding van Scott als movement coach.',
      color: 'text-brand-mid',
    },
    {
      num: '04',
      title: 'Meten & Optimaliseren',
      desc: 'Inzicht in engagement en voortgang. We meten de impact en optimaliseren continu voor duurzame resultaten.',
      color: 'text-green',
    },
  ];

  return (
    <section id="hoe-het-werkt" className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div
          ref={anim.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-brand-mid font-semibold text-sm uppercase tracking-wider">
            Hoe het werkt
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-navy mt-3 mb-4">
            In 4 stappen naar een
            <span className="text-green"> vitalere werkdag</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SMYM kan klein starten in een pilot en eenvoudig schaalbaar worden naar je hele
            organisatie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative bg-brand-lightest rounded-2xl p-6 border border-brand-light/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ${
                anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`text-5xl font-display font-bold ${step.color} opacity-20 mb-4`}>
                {step.num}
              </div>
              <h3 className="text-lg font-display font-bold text-navy mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-brand-mid/30">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Community Section ─── */
function CommunitySection() {
  const anim = useInView(0.15);

  return (
    <section className="py-20 lg:py-28 bg-brand-lightest">
      <div className="container">
        <div
          ref={anim.ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="text-green font-semibold text-sm uppercase tracking-wider">
              Community
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-navy mt-3 mb-6 leading-tight">
              Gezondheid als iets dat je
              <span className="text-green"> samen</span> versterkt
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              SMYM is meer dan een individueel programma. Het stimuleert verbinding binnen teams en
              organisaties via gedeelde challenges, groepsmomenten en een cultuur van samen bewegen.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Een sterkere bedrijfscultuur ontstaat wanneer gezondheid iets gezamenlijks wordt.
              Maandelijkse events, teamchallenges en community-elementen maken kantoorbezoek
              aantrekkelijker en versterken de betrokkenheid.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-navy font-medium">
                <CheckCircle className="w-4 h-4 text-green" />
                Teamchallenges
              </div>
              <div className="flex items-center gap-2 text-sm text-navy font-medium">
                <CheckCircle className="w-4 h-4 text-green" />
                Maandelijkse events
              </div>
              <div className="flex items-center gap-2 text-sm text-navy font-medium">
                <CheckCircle className="w-4 h-4 text-green" />
                Groepsmomenten
              </div>
            </div>

            <a href="#contact">
              <Button className="bg-green hover:bg-green-dark text-white font-semibold px-6 rounded-lg">
                Start een pilot
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="relative">
            <img
              src={IMAGES.community}
              alt="Team dat samen beweegt"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── USP Section ─── */
function USPSection() {
  const anim = useInView(0.15);

  const usps = [
    {
      title: 'Personal',
      desc: 'Aansluitend op de individuele gebruiker en zijn of haar dagelijkse werkrealiteit.',
      icon: <Heart className="w-7 h-7" />,
      accent: 'bg-brand-mid',
    },
    {
      title: 'Preventive',
      desc: 'Voorkomen van klachten en energieverlies vóórdat het escaleert.',
      icon: <Shield className="w-7 h-7" />,
      accent: 'bg-green',
    },
    {
      title: 'Community',
      desc: 'Gezondheid als iets dat je samen versterkt binnen een team of organisatie.',
      icon: <Users className="w-7 h-7" />,
      accent: 'bg-brand-mid',
    },
    {
      title: 'Laagdrempelig',
      desc: 'Korte beweegmomenten van 1 minuut maken deelname haalbaar voor iedereen.',
      icon: <Clock className="w-7 h-7" />,
      accent: 'bg-green',
    },
    {
      title: 'Meetbaar',
      desc: 'Engagement en voortgang worden inzichtelijk gemaakt voor werkgevers en gebruikers.',
      icon: <BarChart3 className="w-7 h-7" />,
      accent: 'bg-brand-mid',
    },
    {
      title: 'Specialistisch',
      desc: 'Speciaal ontwikkeld voor kantoorwerkers die langdurig zitten.',
      icon: <Target className="w-7 h-7" />,
      accent: 'bg-green',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div
          ref={anim.ref}
          className={`text-center mb-16 transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-brand-mid font-semibold text-sm uppercase tracking-wider">
            Waarom SMYM
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-navy mt-3 mb-4">
            Wat ons <span className="text-brand-mid">onderscheidt</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SMYM is geen standaard fitnessapp. Het is een doordachte, schaalbare en geloofwaardige
            oplossing voor de moderne werkdag.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, i) => (
            <div
              key={i}
              className={`bg-brand-lightest rounded-2xl p-7 border border-brand-light/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group ${
                anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-xl ${usp.accent}/10 flex items-center justify-center text-brand-mid mb-5 group-hover:${usp.accent} group-hover:text-white transition-all duration-300`}
              >
                {usp.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-navy mb-2">{usp.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Scott Section ─── */
function AboutScottSection() {
  const anim = useInView(0.15);

  return (
    <section id="over-scott" className="py-20 lg:py-28 bg-brand-lightest">
      <div className="container">
        <div
          ref={anim.ref}
          className={`grid lg:grid-cols-5 gap-12 lg:gap-16 items-center transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Photo */}
          <div className="lg:col-span-2">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <img
                src={IMAGES.scott}
                alt="Scott — Movement Coach"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-brand-mid text-white px-5 py-3 rounded-xl shadow-lg font-display font-semibold text-sm">
                Movement Coach
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-3">
            <span className="text-brand-mid font-semibold text-sm uppercase tracking-wider">
              Het gezicht achter SMYM
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-navy mt-3 mb-6 leading-tight">
              Maak kennis met <span className="text-brand-mid">Scott</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Scott is movement coach en specialist in mobiliteit en vitaliteit voor kantoorwerkers.
              Hij vertaalt wetenschappelijke inzichten naar praktische, dagelijkse routines die écht
              werken.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Met zijn energieke en toegankelijke aanpak maakt Scott beweging haalbaar voor
              iedereen. Geen fitness-jargon of onrealistische verwachtingen, maar slimme, korte en
              consistente beweegmomenten die passen in de realiteit van drukke professionals.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Als founder van SMYM combineert hij zijn expertise in beweging met een passie voor het
              creëren van gezondere werkomgevingen. Zijn missie: van dagelijkse beweging een
              vanzelfsprekend onderdeel van werk maken.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-brand-mid/10 text-brand-mid text-sm font-medium">
                Movement Coach
              </span>
              <span className="px-4 py-2 rounded-full bg-brand-mid/10 text-brand-mid text-sm font-medium">
                Mobiliteitsspecialist
              </span>
              <span className="px-4 py-2 rounded-full bg-brand-mid/10 text-brand-mid text-sm font-medium">
                Workplace Vitality Expert
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA / Contact Section ─── */
function CTASection() {
  const anim = useInView(0.15);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div
          ref={anim.ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div
            className="rounded-3xl p-8 lg:p-14 shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: '#145da0' }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <span className="text-yellow font-semibold text-sm uppercase tracking-wider">
                  Aan de slag
                </span>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-white mt-3 mb-4">
                  Klaar om je team in
                  <span className="text-yellow"> beweging</span> te krijgen?
                </h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto">
                  Plan een demo, vraag een pilot aan of neem contact op. We bespreken graag hoe SMYM
                  jouw organisatie kan helpen.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Bedankt voor je interesse!
                  </h3>
                  <p className="text-white/70">We nemen zo snel mogelijk contact met je op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Naam"
                    required
                    className="bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
                  />
                  <input
                    type="email"
                    placeholder="E-mailadres"
                    required
                    className="bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Bedrijfsnaam"
                    className="bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Functie"
                    className="bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all"
                  />
                  <textarea
                    placeholder="Bericht (optioneel)"
                    rows={4}
                    className="sm:col-span-2 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all resize-none"
                  />
                  <div className="sm:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-green hover:bg-green-dark text-white font-semibold text-base py-6 rounded-lg pulse-cta"
                    >
                      <Mail className="mr-2 w-5 h-5" />
                      Verstuur aanvraag
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d4a80' }} className="py-12 lg:py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-mid flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Scott Makes You Move
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Een persoonlijk, preventief en community-gedreven movement- en vitaliteitsprogramma
              voor kantoorwerkers en bedrijven.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Navigatie</h4>
            <div className="space-y-2">
              {[
                { label: 'Het probleem', href: '#probleem' },
                { label: 'De oplossing', href: '#oplossing' },
                { label: 'Voordelen', href: '#voordelen' },
                { label: 'Hoe het werkt', href: '#hoe-het-werkt' },
                { label: 'Over Scott', href: '#over-scott' },
                { label: 'Contact', href: '#contact' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-white/50 hover:text-yellow transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm text-white/50 leading-relaxed mb-2">Opti Fit</p>
            <p className="text-sm text-white/50 leading-relaxed">
              Neem contact op via het formulier hierboven of stuur een e-mail naar{' '}
              <a href="mailto:info@scottmakesyoumove.com" className="text-yellow hover:underline">
                info@scottmakesyoumove.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Scott Makes You Move by Opti Fit. Alle rechten
            voorbehouden.
          </p>
          <p className="text-xs text-white/40 font-semibold tracking-wider">
            PERSONAL &middot; PREVENTIVE &middot; COMMUNITY
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <HowItWorksSection />
        <CommunitySection />
        <USPSection />
        <AboutScottSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
