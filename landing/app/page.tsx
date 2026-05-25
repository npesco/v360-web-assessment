'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Clock,
  Users,
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Calendar,
  Shield,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Calendar,
      title: 'Intelligent Scheduling',
      description:
        'Automated shift assignment that considers staff preferences, skill levels, and compliance requirements.',
    },
    {
      icon: AlertCircle,
      title: 'Conflict Detection',
      description:
        'Real-time identification and prevention of scheduling conflicts, double-bookings, and compliance violations.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description:
        'Seamless shift swaps, coverage requests, and team communication within a unified platform.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description:
        'Comprehensive reporting on staffing patterns, labor costs, and operational efficiency metrics.',
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description:
        'Built-in support for labor regulations, licensing requirements, and healthcare compliance standards.',
    },
    {
      icon: TrendingUp,
      title: 'Demand Forecasting',
      description:
        'Predict staffing needs based on patient volume, seasonal trends, and historical data.',
    },
  ];

  const stats = [
    { number: '87%', label: 'Faster Scheduling' },
    { number: '5 hrs', label: 'Time Saved Per Week' },
    { number: '340K+', label: 'Shifts Managed' },
    { number: '24/7', label: 'Support Access' },
  ];

  const faqs = [
    {
      id: 'q1',
      question: 'How quickly can we implement RosterFlow?',
      answer:
        'Most hospitals are up and running within 2-4 weeks. Our implementation team handles data migration, staff training, and system configuration to ensure a smooth transition.',
    },
    {
      id: 'q2',
      question: 'Does RosterFlow integrate with existing HR systems?',
      answer:
        'Yes! RosterFlow integrates with major HR systems, payroll providers, and scheduling software. We support custom integrations for legacy systems as well.',
    },
    {
      id: 'q3',
      question: 'What support is included?',
      answer:
        'All plans include 24/7 technical support, monthly training sessions, and dedicated account management. Premium plans get a dedicated implementation specialist.',
    },
    {
      id: 'q4',
      question: 'How secure is our scheduling data?',
      answer:
        'RosterFlow uses hospital-grade encryption, HIPAA compliance, and regular security audits. Data is backed up in multiple geographic locations.',
    },
    {
      id: 'q5',
      question: 'Can we customize the scheduling rules?',
      answer:
        'Absolutely. RosterFlow allows you to define custom rules, preferences, and constraints specific to your hospital&apos;s needs and policies.',
    },
    {
      id: 'q6',
      question: 'What is the ROI timeline?',
      answer:
        'Most hospitals see ROI within 6-12 months through reduced overtime costs, improved staff satisfaction, and increased operational efficiency.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$499',
      period: '/month',
      description: 'Perfect for smaller clinics and practices',
      features: [
        'Up to 100 staff members',
        'Basic scheduling features',
        'Email support',
        '1 administrator',
        'Mobile app access',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: '$1,499',
      period: '/month',
      description: 'Ideal for mid-sized hospitals',
      features: [
        'Up to 500 staff members',
        'Advanced analytics & forecasting',
        'Priority 24/7 support',
        '5 administrators',
        'Custom integrations',
        'Compliance reporting',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large hospital networks',
      features: [
        'Unlimited staff members',
        'White-label solution',
        'Dedicated account team',
        'Custom API access',
        'Multi-site management',
        'Advanced security features',
      ],
      cta: 'Talk to Sales',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* STICKY NAVIGATION */}
      <nav
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur border-border shadow-sm'
            : 'bg-background border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground">RosterFlow</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-foreground/70 hover:text-foreground transition">
                Features
              </a>
              <a href="#demo" className="text-sm text-foreground/70 hover:text-foreground transition">
                Product
              </a>
              <a href="#pricing" className="text-sm text-foreground/70 hover:text-foreground transition">
                Pricing
              </a>
              <a href="#faq" className="text-sm text-foreground/70 hover:text-foreground transition">
                FAQ
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline">Sign In</Button>
              <Button>Start Free Trial</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border pb-4 space-y-3">
              <a
                href="#features"
                className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#demo"
                className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Product
              </a>
              <a
                href="#pricing"
                className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="block px-4 py-2 text-sm text-foreground/70 hover:text-foreground transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <div className="px-4 pt-2 flex gap-2">
                <Button variant="outline" className="flex-1">
                  Sign In
                </Button>
                <Button className="flex-1">Start Free Trial</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent">Join 340+ hospitals managing smarter schedules</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Hospital Rostering{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-pretty max-w-2xl mx-auto text-lg text-foreground/70 leading-relaxed">
              Automate staff scheduling, eliminate conflicts, and reduce overtime costs. RosterFlow handles the complexity
              so your team can focus on patient care.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Watch Demo
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-sm text-foreground/50">No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / CLIENTS */}
      <section className="border-y border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-foreground/50 uppercase tracking-wide mb-8">
            Trusted by leading healthcare providers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-12 items-center">
            {['MedCore', 'CareHealth', 'HospitalPlus', 'ClinicSync'].map((client, i) => (
              <div key={i} className="flex items-center justify-center text-foreground/40 font-semibold text-sm sm:text-base">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Powerful Features for Modern Hospitals
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Built by healthcare professionals to solve real scheduling challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="group p-8 rounded-xl border border-border hover:border-accent hover:shadow-lg transition-all duration-300 bg-card hover:bg-card/80">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPACT/STATS SECTION */}
      <section className="py-24 sm:py-32 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Real Impact on Your Operations
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              See the measurable results our customers achieve
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                  {stat.number}
                </div>
                <p className="text-foreground/60 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE / HOW IT WORKS */}
      <section id="demo" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              See It In Action
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              From scheduling to compliance, everything you need in one intuitive platform
            </p>
          </div>

          {/* Product Feature Cards */}
          <div className="grid md:grid-cols-1 gap-12 items-center mb-16">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-card">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Drag-and-Drop Scheduling</h3>
                    <p className="text-sm text-foreground/60">
                      Create and adjust schedules with intuitive drag-and-drop interface
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-card">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Instant Availability</h3>
                    <p className="text-sm text-foreground/60">
                      Staff can view schedules and request time off on mobile app
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-border hover:border-accent transition-colors bg-card">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Compliance Monitoring</h3>
                    <p className="text-sm text-foreground/60">
                      Automatic alerts for potential violations or coverage gaps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground text-center mb-12">How RosterFlow Works</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Set Preferences', desc: 'Configure staffing rules and constraints' },
                { step: '02', title: 'Let AI Schedule', desc: 'Intelligent algorithm optimizes shifts' },
                { step: '03', title: 'Review & Approve', desc: 'Easy-to-use approval workflow' },
                { step: '04', title: 'Deploy & Manage', desc: 'Live scheduling with instant updates' },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="text-5xl font-bold text-primary/20 mb-2">{item.step}</div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                  {idx < 3 && (
                    <div className="hidden md:block absolute -right-3 top-6 text-accent">
                      <ChevronDown className="w-6 h-6 rotate-[-90deg]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 sm:py-32 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose the perfect plan for your hospital&apos;s needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  plan.highlighted
                    ? 'border-accent shadow-2xl scale-y-105 lg:scale-110 bg-card'
                    : 'border-border bg-card hover:border-accent'
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-primary to-accent px-6 py-3">
                    <span className="text-white text-sm font-semibold">MOST POPULAR</span>
                  </div>
                )}

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-foreground/60 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-foreground/60 text-sm">{plan.period}</span>
                    </div>
                  </div>

                  <Button className="w-full h-11" variant={plan.highlighted ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>

                  <div className="space-y-3 pt-6 border-t border-border">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-foreground/60 text-sm mt-12">
            All plans include a 14-day free trial. Need a custom plan? <a href="#" className="text-primary hover:underline font-medium">Contact our sales team</a>
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/60">
              Everything you need to know about RosterFlow
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-border rounded-lg overflow-hidden bg-card hover:border-accent transition-colors"
              >
                <button
                  onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                      openFaqId === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openFaqId === faq.id && (
                  <div className="px-6 pb-6 border-t border-border pt-4 text-foreground/70 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Ready to Transform Your Scheduling?
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Join hundreds of hospitals already using RosterFlow to streamline operations and improve staff satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="h-12 px-8 text-base">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Schedule a Demo
            </Button>
          </div>
          <p className="text-sm text-foreground/50">14-day free trial • No credit card required</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-foreground">RosterFlow</span>
              </div>
              <p className="text-sm text-foreground/60">
                Smart hospital rostering for the modern era.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    HIPAA Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
            <p>&copy; 2024 RosterFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
