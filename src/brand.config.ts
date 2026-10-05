/**
 * Brand Configuration (Single source of truth per PRD Assumption A & Section 15.1)
 * All credentials and stand-ins are swappable here in one place.
 */

export interface BrandConfig {
  name: string;
  firm: string;
  monogram: string;
  nmlsIndividual: string;
  nmlsCompany: string;
  email: string;
  phonePlaceholder: string;
  tagline: string;
  headlineHero: string;
  ledeHero: string;
  subscribers: string;
  bookTitle: string;
  bookSubtitle: string;
  bookAmazonUrl: string;
  socials: {
    youtube: string;
    linkedin: string;
    instagram: string;
    x: string;
  };
  complianceNotice: string;
  isPlaceholderData: boolean;
}

export const brandConfig: BrandConfig = {
  name: "Marcus Hale",
  firm: "Hale Capital Lending",
  monogram: "MH",
  nmlsIndividual: "NMLS #000000 (placeholder)",
  nmlsCompany: "NMLS #000000 (placeholder)",
  email: "marcus@halecapital.com",
  phonePlaceholder: "(800) 555-0199",
  tagline: "Investor financing · Education · Speaking · Advisory",
  headlineHero: "Financing that reads the deal the way an investor does.",
  ledeHero: "I'm Marcus Hale. I structure DSCR, fix and flip, and ground-up loans for residential investors, and I teach what I've learned to thousands of people each week.",
  subscribers: "12K+",
  bookTitle: "The DSCR Illusion",
  bookSubtitle: "Why property cash flow is more nuanced than simple debt service formulas.",
  bookAmazonUrl: "https://amazon.com", // demo handles outbound confirmation toast
  socials: {
    youtube: "https://youtube.com/@marcushale",
    linkedin: "https://linkedin.com/in/marcushale",
    instagram: "https://instagram.com/marcushale.invest",
    x: "https://x.com/marcushale_re",
  },
  complianceNotice:
    "Marcus Hale, NMLS #000000. Hale Capital Lending, NMLS #000000. Equal Housing Opportunity. Licensed in selected states; see full licensing. This site is for informational purposes only and is not an offer or commitment to lend. All loans are subject to underwriting approval. Loan programs described are for business-purpose investment property financing and are not available for personal, family or household purposes. Rates, terms and availability are subject to change without notice.",
  isPlaceholderData: true,
};
