import React from 'react';
import {
  Phone,
  Flame,
  Droplets,
  Wrench,
  ShieldCheck,
  Clock,
  Star,
  MapPin,
  CheckCircle,
  HelpCircle,
  Calendar,
} from 'lucide-react';
import { QuoteForm } from './QuoteForm';
import { AccordionItem } from '../ui/Accordion';
import { Button } from '../ui/Button';

export const RidgelineSite: React.FC = () => {
  const services = [
    {
      title: 'Emergency Furnace Repair',
      desc: 'No heat in sub-zero Calgary winters? 24/7 on-call trucks dispatched with full replacement parts.',
      icon: <Flame className="w-6 h-6 text-[#E0742B]" />,
    },
    {
      title: 'Water Heater Replacement',
      desc: 'Same-day tank and tankless installations. Energy-efficient Bradford White and Navien units.',
      icon: <Droplets className="w-6 h-6 text-[#1E3A5F]" />,
    },
    {
      title: 'Drain Cleaning & Hydro-Jetting',
      desc: 'Root clearing, main sewer camera inspections, and grease blockage removal.',
      icon: <Wrench className="w-6 h-6 text-[#1E3A5F]" />,
    },
    {
      title: 'Boiler Repair & Installation',
      desc: 'Hydronic radiant in-floor heating diagnostics and combi-boiler seasonal tune-ups.',
      icon: <Clock className="w-6 h-6 text-[#1E3A5F]" />,
    },
    {
      title: 'Bathroom & Kitchen Rough-ins',
      desc: 'Basement suite additions, PEX re-piping, and backflow preventer installations.',
      icon: <CheckCircle className="w-6 h-6 text-[#1E3A5F]" />,
    },
    {
      title: '24/7 Sump Pump & Flood Service',
      desc: 'High-volume sump pump installations with battery backup to prevent spring melt floods.',
      icon: <ShieldCheck className="w-6 h-6 text-[#E0742B]" />,
    },
  ];

  const reviews = [
    {
      name: 'Dave M.',
      location: 'Calgary NW (Tuscany)',
      text: 'Furnace stopped igniting when it was -28°C outside on a Sunday evening. Marcus from Ridgeline arrived in 40 minutes, swapped the flame sensor, and had heat back in no time. Unbelievable response.',
      rating: 5,
    },
    {
      name: 'Karen & Brian T.',
      location: 'Airdrie',
      text: 'Upgraded to a tankless hot water system. Clean piping, zero mess, and handled the City permit inspection smoothly. Definitely our go-to team.',
      rating: 5,
    },
    {
      name: 'Elena R.',
      location: 'Calgary SW (Killarney)',
      text: 'Clear quote upfront, no surprise fees, and they texted me 15 minutes before arrival so I didn’t have to sit around all morning. 10/10.',
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: 'How fast can a technician arrive for an emergency?',
      a: 'We maintain on-call diagnostic trucks across Calgary quadrant zones (NW, SW, NE, SE). Average arrival time for true heating/leak emergencies is 30 to 45 minutes.',
    },
    {
      q: 'Do you charge extra for after-hours or weekend dispatch?',
      a: 'We provide upfront transparent estimates before any work begins. A standard diagnostic dispatch fee applies, and you approve the flat-rate fix before we touch a tool.',
    },
    {
      q: 'Are your plumbers licensed in Alberta?',
      a: 'Yes, 100% of our lead technicians are Red Seal Journeyman Plumbers and Gasfitters, bonded, and covered by $5M commercial liability insurance.',
    },
    {
      q: 'What areas around Calgary do you service?',
      a: 'We cover the entire City of Calgary, plus Airdrie, Cochrane, Chestermere, Okotoks, and Bearspaw.',
    },
  ];

  return (
    <div className="bg-[#F8F7F4] text-[#1E293B] font-ui min-h-screen flex flex-col pb-16">
      {/* 1. Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-[#1E3A5F] flex items-center justify-center text-white font-bold text-base">
              R
            </span>
            <div className="flex flex-col text-left">
              <span className="font-bold text-[#1E3A5F] text-base sm:text-lg leading-tight tracking-tight">
                RIDGELINE
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#64748B] font-semibold">
                Plumbing & Heating · Calgary
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+14035550142"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1E3A5F] text-white hover:bg-[#152840] transition-colors text-xs font-semibold shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(403) 555-0142</span>
            </a>
            <a
              href="#quote"
              className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-md bg-[#E0742B] text-white hover:bg-[#C9621E] transition-colors text-xs font-semibold"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#F1EFEA] pt-12 pb-16 border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded bg-orange-100 text-[#C9621E] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E0742B] animate-pulse" />
              <span>24/7 Calgary Emergency Response</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E3A5F] tracking-tight leading-[1.1] mb-5">
              Furnace out at 2 a.m.? <br className="hidden sm:inline" />
              We&apos;re on our way.
            </h1>

            <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-6 max-w-xl">
              Rapid-response plumbing, heating, and water heater repairs across Calgary, Airdrie, and Cochrane. Zero hidden diagnostic fees.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#quote"
                className="px-6 py-3 rounded-md bg-[#E0742B] text-white hover:bg-[#C9621E] font-bold text-sm shadow-md transition-all duration-fast hover:scale-[1.02]"
              >
                Request Free Estimate
              </a>
              <a
                href="tel:+14035550142"
                className="px-6 py-3 rounded-md bg-white border border-[#CBD5E1] text-[#1E3A5F] hover:bg-slate-50 font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E0742B]" />
                <span>Call (403) 555-0142</span>
              </a>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#CBD5E1]/60 text-left text-xs font-semibold text-[#475569]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                <span>4.9★ (312 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#1E3A5F] shrink-0" />
                <span>Same-Day Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Flat-Rate Upfront</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Interactive Quote Form */}
          <div id="quote" className="lg:col-span-5">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 text-left">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E0742B] block mb-1">
            Complete Heating & Plumbing
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
            Built for Alberta Winters & High-Usage Homes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-md bg-[#F1EFEA] flex items-center justify-center mb-4">
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold text-[#1E3A5F] mb-2">{svc.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">{svc.desc}</p>
              </div>
              <a
                href="#quote"
                className="text-xs font-bold text-[#E0742B] hover:underline inline-flex items-center gap-1"
              >
                <span>Book This Service →</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Customer Reviews */}
      <section className="py-16 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E0742B] block mb-1">
                Verified Calgary Homeowners
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
                Rated 4.9 Stars on Google
              </h2>
            </div>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-[#1E3A5F] ml-1">312 Verified Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.name}
                className="bg-[#F8F7F4] p-5 rounded-lg border border-[#E2E8F0] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed italic mb-4">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-3 border-t border-[#CBD5E1]/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1E3A5F]">{rev.name}</span>
                  <span className="text-[#64748B] text-[11px]">{rev.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Service Area & Dispatch Map */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 text-left">
        <div className="bg-[#1E3A5F] text-white p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-orange-400 block mb-2">
              Dispatch Coverage Radius
            </span>
            <h3 className="text-2xl font-bold text-white mb-3">
              Serving the Greater Calgary Metro Area
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Our GPS-tracked fleet is staged throughout Calgary quadrants so we can dispatch the closest technician directly to your door in minutes.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E0742B]" />
                <span>Calgary (NW, SW, NE, SE)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E0742B]" />
                <span>Airdrie & Balzac</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E0742B]" />
                <span>Cochrane & Bearspaw</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E0742B]" />
                <span>Okotoks & Chestermere</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-6 rounded-lg border border-white/20 text-center flex flex-col items-center">
            <Clock className="w-10 h-10 text-orange-400 mb-2" />
            <h4 className="text-lg font-bold text-white mb-1">Need Service Right Now?</h4>
            <p className="text-xs text-slate-300 mb-4 max-w-xs">
              Live on-call dispatchers standing by 24 hours a day, 7 days a week.
            </p>
            <a
              href="tel:+14035550142"
              className="px-6 py-2.5 rounded bg-[#E0742B] text-white font-bold text-xs hover:bg-[#C9621E] transition-colors"
            >
              Call (403) 555-0142
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 text-left">
        <h3 className="text-xl font-bold text-[#1E3A5F] mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} title={faq.q} defaultOpen={idx === 0}>
              {faq.a}
            </AccordionItem>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="mt-12 bg-white border-t border-[#E2E8F0] pt-8 pb-16 text-center text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#1E3A5F]">
            <span>RIDGELINE PLUMBING & HEATING LTD.</span>
            <span>·</span>
            <span>CALGARY, AB</span>
          </div>
          <div>Licensed Alberta Mechanical Contractor · #AB-PLMB-91823</div>
        </div>
      </footer>

      {/* 8. Mobile Sticky Tap-to-Call Bar (Custom Code feature per PRD §14.3 & §14.10) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1E3A5F] text-white p-3 flex items-center justify-between shadow-sh-3 border-t border-white/20">
        <div className="flex flex-col text-left">
          <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
            24/7 Calgary Emergency
          </span>
          <span className="text-xs font-semibold text-white">Technicians En Route</span>
        </div>
        <a
          href="tel:+14035550142"
          className="px-4 py-2 rounded bg-[#E0742B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </a>
      </div>
    </div>
  );
};
