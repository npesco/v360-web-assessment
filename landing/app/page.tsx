'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Users,
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Shield,
  TrendingUp,
  ChevronDown,
  HouseHeart,
  ArrowRight,
  Clock,
  Calendar,
  Zap,
  Star,
} from 'lucide-react';

const mockSchedule = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  staff: [
    { name: 'Dr. Kim', role: 'Physician', shifts: ['AM', 'AM', null, 'PM', 'AM', null] },
    { name: 'Dr. Chen', role: 'Physician', shifts: ['PM', null, 'AM', 'AM', null, 'PM'] },
    { name: 'N. Santos', role: 'Nurse', shifts: ['N', 'N', 'PM', null, 'N', 'AM'] },
    { name: 'N. James', role: 'Nurse', shifts: ['AM', 'PM', 'AM', 'N', 'PM', null] },
    { name: 'T. Rivera', role: 'Tech', shifts: [null, 'AM', 'AM', 'PM', 'AM', 'PM'] },
  ],
};

const shiftStyle: Record<string, string> = {
  AM: 'bg-primary/15 text-primary border border-primary/25 font-semibold',
  PM: 'bg-amber-100 text-amber-700 border border-amber-200 font-semibold',
  N: 'bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold',
};

const avatarColors = ['#0891b2', '#0e7490', '#155e75', '#164e63'];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Intelligent Scheduling',
      desc: 'Automated shift assignment considering staff preferences, skill levels, and compliance requirements.',
      badge: null,
    },
    {
      icon: AlertCircle,
      title: 'Conflict Detection',
      desc: 'Real-time identification and prevention of scheduling conflicts and compliance violations.',
      badge: 'New',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Seamless shift swaps, coverage requests, and team communication within a unified platform.',
      badge: null,
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      desc: 'Comprehensive reporting on staffing patterns, labour costs, and operational efficiency.',
      badge: null,
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      desc: 'Built-in support for labour regulations, licensing requirements, and healthcare standards.',
      badge: null,
    },
    {
      icon: TrendingUp,
      title: 'Demand Forecasting',
      desc: 'Predict staffing needs based on patient volume, seasonal trends, and historical data.',
      badge: null,
    },
  ];

  const stats = [
    { number: '87%', label: 'Faster Scheduling', sub: 'vs. manual methods' },
    { number: '5 hrs', label: 'Saved Per Week', sub: 'per administrator' },
    { number: '340K+', label: 'Shifts Managed', sub: 'and counting' },
    { number: '99.9%', label: 'Uptime SLA', sub: 'guaranteed' },
  ];

  const testimonials = [
    {
      quote: "WellCare cut our scheduling time from 6 hours to under 45 minutes every week. Our charge nurses actually have time to do nursing now.",
      name: "Dr. Sarah Mitchell",
      role: "Chief Nursing Officer",
      org: "Metro General Hospital",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
    },
    {
      quote: "We eliminated overtime overruns almost immediately. The compliance alerts alone saved us a six-figure penalty in our first quarter.",
      name: "James Okonkwo",
      role: "HR Director",
      org: "PrimeCare Network",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=James&backgroundColor=d1d4f9",
    },
    {
      quote: "Staff satisfaction scores went up 22% after we rolled out the self-service app. People finally feel like they have control over their schedules.",
      name: "Linda Torres",
      role: "Operations Manager",
      org: "CareHealth Regional",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Linda&backgroundColor=c0aede",
    },
  ];

  const steps = [
    { step: '01', title: 'Set your rules', desc: 'Define staffing constraints, certifications, and shift patterns for your department.' },
    { step: '02', title: 'AI generates a schedule', desc: 'Our algorithm optimises across hundreds of constraints in seconds.' },
    { step: '03', title: 'Review and approve', desc: 'Spot-check, adjust, and publish with one click — or set it to auto-approve.' },
    { step: '04', title: 'Manage live', desc: 'Handle swaps, call-outs, and changes in real time with instant notifications.' },
  ];

  const faqs = [
    { id: 'q1', q: 'How quickly can we implement WellCare?', a: 'Most hospitals are up and running within 2–4 weeks. Our implementation team handles data migration, staff training, and system configuration.' },
    { id: 'q2', q: 'Does WellCare integrate with existing HR systems?', a: 'Yes. WellCare integrates with major HR systems, payroll providers, and scheduling software. We support custom integrations for legacy systems as well.' },
    { id: 'q3', q: 'What support is included?', a: 'All plans include 24/7 technical support, monthly training sessions, and dedicated account management. Premium plans get a dedicated implementation specialist.' },
    { id: 'q4', q: 'How secure is our scheduling data?', a: 'WellCare uses hospital-grade encryption, HIPAA compliance, and regular security audits. Data is backed up in multiple geographic locations.' },
    { id: 'q5', q: 'Can we customise the scheduling rules?', a: 'Absolutely. WellCare allows you to define custom rules, preferences, and constraints specific to your hospital\'s needs and policies.' },
    { id: 'q6', q: 'What is the ROI timeline?', a: 'Most hospitals see ROI within 6–12 months through reduced overtime costs, improved staff satisfaction, and increased operational efficiency.' },
  ];

  const plans = [
    {
      name: 'Starter',
      monthly: '$499',
      annual: '$399',
      desc: 'Perfect for smaller clinics and practices',
      features: ['Up to 100 staff members', 'Basic scheduling features', 'Email support', '1 administrator', 'Mobile app access'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      monthly: '$1,499',
      annual: '$1,199',
      desc: 'Ideal for mid-sized hospitals',
      features: ['Up to 500 staff members', 'Advanced analytics & forecasting', 'Priority 24/7 support', '5 administrators', 'Custom integrations', 'Compliance reporting'],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      monthly: 'Custom',
      annual: 'Custom',
      desc: 'For large hospital networks',
      features: ['Unlimited staff members', 'White-label solution', 'Dedicated account team', 'Custom API access', 'Multi-site management', 'Advanced security features'],
      cta: 'Talk to Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <HouseHeart className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">WellCare</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[['Features', '#features'], ['Product', '#product'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
                <a key={label} href={href} className="px-4 py-2 text-sm text-foreground/60 hover:text-foreground hover:bg-muted/60 rounded-lg transition-all">
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button size="sm" className="shadow-sm">Start Free Trial</Button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-1 bg-background">
              {[['Features', '#features'], ['Product', '#product'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
                <a key={label} href={href} className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/60 rounded-lg transition-all" onClick={() => setMobileMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <div className="px-4 pt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Sign In</Button>
                <Button size="sm" className="flex-1">Start Free Trial</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-background to-background pointer-events-none" />
        <div className="absolute top-20 right-0 w-[700px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">

            {/* Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2.5 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-primary">98% fewer scheduling conflicts — join 2,400+ healthcare professionals</span>
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight text-foreground">
                  Smarter hospital<br />
                  <span className="text-primary">rostering,</span><br />
                  less admin.
                </h1>
                <p className="text-lg text-foreground/60 leading-relaxed max-w-md">
                  WellCare automates shift scheduling, prevents coverage gaps, and keeps your team compliant — so you can focus on patient care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="h-12 px-7 text-base shadow-md shadow-primary/20 group">
                  Start for free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-7 text-base">
                  Watch a demo
                </Button>
              </div>

              <div className="flex items-center gap-5 pt-1">
                <div className="flex -space-x-2">
                  {avatarColors.map((color, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color }}>
                      {['K', 'C', 'S', 'J'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-foreground/45 mt-0.5">4.9 / 5 · 2,400+ healthcare professionals</p>
                </div>
              </div>

              {/* Mobile-only metric cards — shown instead of the roster mockup */}
              <div className="lg:hidden grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: CheckCircle2, label: 'Coverage Rate', value: '98.4%', bg: 'bg-green-100', color: 'text-green-600' },
                  { icon: Clock, label: 'Time Saved', value: '5 hrs/wk', bg: 'bg-primary/10', color: 'text-primary' },
                  { icon: Users, label: 'Professionals', value: '2,400+', bg: 'bg-primary/10', color: 'text-primary' },
                  { icon: TrendingUp, label: 'Fewer Conflicts', value: '98%', bg: 'bg-green-100', color: 'text-green-600' },
                ].map(({ icon: Icon, label, value, bg, color }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div>
                      <p className="text-[10px] text-foreground/45">{label}</p>
                      <p className="text-sm font-bold text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roster Mockup — hidden on mobile to avoid overflow at 360px */}
            <div className="relative lg:ml-6 hidden lg:block">
              <div className="absolute -top-5 -left-5 z-20 bg-card border border-border rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[11px] text-foreground/45 font-medium">Coverage Rate</p>
                  <p className="text-sm font-bold text-foreground">98.4%</p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 z-20 bg-card border border-border rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[11px] text-foreground/45 font-medium">Time Saved</p>
                  <p className="text-sm font-bold text-foreground">5 hrs / week</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl shadow-2xl shadow-primary/8 overflow-hidden">
                {/* Browser chrome */}
                <div className="bg-muted/50 border-b border-border px-4 py-2.5 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                  </div>
                  <div className="flex-1 bg-background/60 border border-border/50 rounded-md px-3 py-0.5 text-[11px] text-foreground/35 text-center">
                    app.wellcare.io/schedule
                  </div>
                </div>

                {/* App toolbar */}
                <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-background/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Week of May 25, 2026</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">All covered</span>
                </div>

                {/* Grid */}
                <div className="p-4">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr>
                        <th className="text-left pb-2.5 pr-3 text-foreground/35 font-medium w-28">Staff</th>
                        {mockSchedule.days.map((d) => (
                          <th key={d} className="pb-2.5 text-foreground/35 font-medium text-center">{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockSchedule.staff.map((member, ri) => (
                        <tr key={ri}>
                          <td className="pr-3 py-1.5">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[9px] flex-shrink-0">
                                {member.name[0]}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground truncate">{member.name}</p>
                                <p className="text-foreground/35 text-[9px]">{member.role}</p>
                              </div>
                            </div>
                          </td>
                          {member.shifts.map((shift, ci) => (
                            <td key={ci} className="py-1.5 text-center">
                              {shift ? (
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] ${shiftStyle[shift]}`}>{shift}</span>
                              ) : (
                                <span className="inline-block w-3 h-px bg-border" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-3 pt-3 border-t border-border flex items-center gap-4">
                    {[
                      { label: 'Morning', cls: 'bg-primary/15' },
                      { label: 'Afternoon', cls: 'bg-amber-100' },
                      { label: 'Night', cls: 'bg-indigo-100' },
                    ].map(({ label, cls }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-sm ${cls}`} />
                        <span className="text-foreground/35 text-[10px]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="border-y border-border py-10 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-semibold text-foreground/35 uppercase tracking-widest mb-7">
            Trusted by leading healthcare providers
          </p>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-4 items-center">
            {['MedCore Health', 'CareHealth Network', 'HospitalPlus', 'ClinicSync', 'PrimeCare'].map((name) => (
              <span key={name} className="text-foreground/30 font-semibold text-sm hover:text-foreground/55 transition-colors cursor-default select-none">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Features</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Built for hospital operations</h2>
            <p className="text-lg text-foreground/55 max-w-xl mx-auto leading-relaxed">
              Every feature designed to reduce admin burden and improve scheduling accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, badge }, idx) => (
              <div key={idx} className="relative group p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default">
                {badge && (
                  <span className="absolute top-5 right-5 text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-foreground/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map(({ number, label, sub }, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-5xl sm:text-6xl font-bold text-white">{number}</div>
                <p className="text-white/80 font-semibold">{label}</p>
                <p className="text-white/45 text-sm">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT / HOW IT WORKS ── */}
      <section id="product" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Product</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">How WellCare works</h2>
            <p className="text-lg text-foreground/55 max-w-xl mx-auto">
              From setup to live schedules in four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Feature checklist */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle2, title: 'Drag-and-Drop Scheduling', desc: 'Create and adjust schedules with an intuitive interface. Move shifts with a single click and see conflicts highlight instantly.' },
                { icon: Users, title: 'Staff Self-Service', desc: 'Staff view rosters and request time off from the mobile app. No more managing requests via phone or email.' },
                { icon: Shield, title: 'Compliance Monitoring', desc: 'Automatic alerts for regulation violations or coverage gaps. Stay audit-ready at all times without lifting a finger.' },
              ].map(({ icon: Icon, title, desc }, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                    <p className="text-sm text-foreground/55 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Steps timeline */}
            <div>
              {steps.map(({ step, title, desc }, idx) => (
                <div key={idx} className="relative flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/25 z-10">
                      {step}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-px flex-1 bg-border my-2 min-h-[28px]" />
                    )}
                  </div>
                  <div className={idx < steps.length - 1 ? 'pb-8' : ''}>
                    <h4 className="font-semibold text-foreground mb-1 mt-2">{title}</h4>
                    <p className="text-sm text-foreground/55 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 sm:py-32 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Testimonials</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Trusted by healthcare teams</h2>
            <p className="text-lg text-foreground/55 max-w-xl mx-auto">
              Here&apos;s what administrators and nurses say after switching to WellCare.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, org, avatar }, idx) => (
              <div key={idx} className="flex flex-col p-7 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-foreground/70 leading-relaxed flex-1 mb-6">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <img src={avatar} alt={name} className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{name}</p>
                    <p className="text-xs text-foreground/45">{role} · {org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Aggregate stat */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-10 text-center">
            <div>
              <p className="text-4xl font-bold text-foreground">2,400+</p>
              <p className="text-sm text-foreground/50 mt-1">Healthcare professionals</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div>
              <p className="text-4xl font-bold text-foreground">98%</p>
              <p className="text-sm text-foreground/50 mt-1">Fewer scheduling conflicts</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div>
              <p className="text-4xl font-bold text-foreground">4.9 / 5</p>
              <p className="text-sm text-foreground/50 mt-1">Average review score</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 sm:py-32 bg-muted/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-6">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Simple, transparent pricing</h2>
            <p className="text-lg text-foreground/55 max-w-xl mx-auto">Start free. Upgrade when you&apos;re ready.</p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="inline-flex items-center bg-muted rounded-xl p-1 gap-1">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  billing === 'monthly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('annual')}
                className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  billing === 'annual'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                Annual
                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full">
                  −20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-7 max-w-5xl mx-auto">
            {plans.map((plan, idx) => {
              const price = billing === 'annual' ? plan.annual : plan.monthly;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 ${
                    plan.highlighted
                      ? 'border-primary shadow-2xl shadow-primary/12 bg-card scale-[1.03]'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  {plan.highlighted ? (
                    <div className="bg-primary px-6 py-2.5 flex items-center justify-between">
                      <span className="text-white text-[11px] font-bold uppercase tracking-wide">Most Popular</span>
                      <Star className="w-3.5 h-3.5 fill-white/70 text-white/70" />
                    </div>
                  ) : (
                    <div className="pt-2" />
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                      <p className="text-sm text-foreground/50 mb-4">{plan.desc}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">{price}</span>
                        {price !== 'Custom' && <span className="text-foreground/40 text-sm">/month</span>}
                      </div>
                    </div>

                    <Button className="w-full mb-7" variant={plan.highlighted ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>

                    <div className="space-y-2.5 border-t border-border pt-6 flex-1">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex gap-2.5 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/65">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-foreground/45 text-sm mt-10">
            All plans include a 14-day free trial. Need a custom plan?{' '}
            <a href="#" className="text-primary hover:underline font-medium">Talk to sales →</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 sm:py-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest">FAQ</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Got questions?</h2>
            <p className="text-foreground/55">Everything you need to know about WellCare.</p>
          </div>

          <div className="space-y-3">
            {faqs.map(({ id, q, a }) => (
              <div key={id} className="border border-border rounded-xl bg-card hover:border-primary/25 transition-colors overflow-hidden">
                <button
                  onClick={() => setOpenFaqId(openFaqId === id ? null : id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <span className="font-medium text-foreground text-sm pr-4">{q}</span>
                  <ChevronDown className={`w-4 h-4 text-foreground/40 flex-shrink-0 transition-transform duration-200 ${openFaqId === id ? 'rotate-180' : ''}`} />
                </button>
                {openFaqId === id && (
                  <div className="px-6 pb-5 pt-0 text-sm text-foreground/60 leading-relaxed border-t border-border pt-4">
                    <div className="pt-4">{a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-background to-primary/[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/8 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-5">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
              Ready to simplify<br />your roster?
            </h2>
            <p className="text-xl text-foreground/60 max-w-xl mx-auto leading-relaxed">
              Join 340+ hospitals saving hours every week with WellCare.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 group">
              Start for free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              Schedule a demo
            </Button>
          </div>
          <p className="text-sm text-foreground/40">14-day free trial · No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                  <HouseHeart className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-foreground">WellCare</span>
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
                Smart hospital rostering for the modern era. Less admin, better care.
              </p>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy'] },
            ].map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-foreground/45 hover:text-foreground transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/40">&copy; 2026 WellCare. All rights reserved.</p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((link) => (
                <a key={link} href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
