import { useEffect } from 'react';
import { useHandoffStore } from '../store/handoff';
import { brandConfig } from '../brand.config';

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schemaType?: string;
}

export const SEO_METADATA: Record<string, SeoProps> = {
  '/': {
    title: `${brandConfig.name} · Investor Financing, Education, Speaking & Advisory`,
    description: "DSCR, fix-and-flip, and ground-up construction lending for residential real estate investors. Author of The DSCR Illusion and mortgage video advisor.",
    canonical: "https://marcushale.com/",
    ogImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Person, Organization (Hale Capital Lending)",
  },
  '/financing': {
    title: `Investor Financing · DSCR, Fix & Flip, Ground-Up Loans | ${brandConfig.name}`,
    description: "Loans built around the property, not personal tax returns. Interactive DSCR calculator, clear underwriting criteria, and fast closings.",
    canonical: "https://marcushale.com/financing",
    ogImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    schemaType: "FinancialService, LoanOrCredit (DSCR)",
  },
  '/learn': {
    title: `Education & The DSCR Illusion Book | ${brandConfig.name}`,
    description: "Weekly YouTube masterclasses on real estate debt structuring, plus The DSCR Illusion: why property cash flow is more nuanced than debt service formulas.",
    canonical: "https://marcushale.com/learn",
    ogImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Book (The DSCR Illusion), VideoGallery",
  },
  '/speaking': {
    title: `Keynote Speaking for Mortgage & Real Estate Conferences | ${brandConfig.name}`,
    description: "Practical sessions delivered like a conversation. Specialized topics for mortgage teams building video brands and investors structuring capital.",
    canonical: "https://marcushale.com/speaking",
    ogImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    schemaType: "Person (Speaker), EventTalk",
  },
  '/advisory': {
    title: `Video Content Advisory for Mortgage Professionals | ${brandConfig.name}`,
    description: "A consumer-direct video strategy built for how mortgage borrowers actually choose. One-on-one consulting and selective small cohorts.",
    canonical: "https://marcushale.com/advisory",
    ogImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    schemaType: "ProfessionalService, Consulting",
  },
  '/about': {
    title: `About ${brandConfig.name} · Background, Credentials & Philosophy`,
    description: "The story behind Hale Capital Lending: why good investors get bad financing advice, channel origin, book publication, and licensing.",
    canonical: "https://marcushale.com/about",
    ogImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    schemaType: "ProfilePage, Person",
  },
  '/privacy': {
    title: `Privacy Policy | ${brandConfig.name}`,
    description: "Information collection, use, cookie framework, and data protection practices.",
    canonical: "https://marcushale.com/privacy",
    schemaType: "WebPage",
  },
  '/terms': {
    title: `Terms of Use | ${brandConfig.name}`,
    description: "Terms governing website usage, informational disclaimers, and intellectual property.",
    canonical: "https://marcushale.com/terms",
    schemaType: "WebPage",
  },
  '/disclosures': {
    title: `Mortgage Disclosures & Licensing | ${brandConfig.name}`,
    description: "Full regulatory mortgage disclosures, NMLS licensing details, and Equal Housing Opportunity statements.",
    canonical: "https://marcushale.com/disclosures",
    schemaType: "FinancialDisclosure",
  },
};

export function useSeo(path: string) {
  const seo = SEO_METADATA[path] || SEO_METADATA['/'];

  useEffect(() => {
    document.title = seo.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seo.description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.canonical || window.location.href);

    // Track page view event in mock analytics
    useHandoffStore.getState().logAnalyticsEvent('page_view', {
      page_path: path,
      page_title: seo.title,
    });
  }, [path, seo]);

  return seo;
}
