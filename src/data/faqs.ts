export interface FaqItem {
  id: string;
  category: 'financing' | 'advisory';
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  // Financing FAQs
  {
    id: "f1",
    category: "financing",
    question: "Do I need personal tax returns or W-2 income to qualify for a DSCR loan?",
    answer: "No. DSCR financing qualifies the loan based purely on the subject property's generated or projected rental income relative to its debt obligations (PITIA). Your personal debt-to-income (DTI) ratio is not calculated, and tax returns are not collected.",
  },
  {
    id: "f2",
    category: "financing",
    question: "Can I close the loan in an LLC or business entity?",
    answer: "Yes, and in fact it is encouraged. Nearly all business-purpose investor loans close in the name of an LLC, LP, or corporate entity to protect your personal balance sheet. Standard entity documents (Articles of Organization, Operating Agreement, EIN) are all that is required.",
  },
  {
    id: "f3",
    category: "financing",
    question: "What is the minimum DSCR required to get funded?",
    answer: "Most prime programs prefer a DSCR of 1.20 to 1.25 or higher for the best interest rates and leverage. However, we also have flexible programs that allow for 1.00 DSCR (break-even) and even 'No Ratio' options for properties undergoing minor transitions or located in premier high-appreciation zip codes.",
  },
  {
    id: "f4",
    category: "financing",
    question: "How fast can a Fix & Flip or bridge loan close?",
    answer: "Once title and valuation are in place, fix-and-flip acquisitions typically close in 10 to 14 business days. For repeat borrowers with an active track record and existing entity files, closing within 7 business days is frequently achievable.",
  },
  {
    id: "f5",
    category: "financing",
    question: "How do construction draws work for rehab and ground-up builds?",
    answer: "Rehab and construction funds are held in an escrow account. As work milestones are finished (e.g., foundation, framing, rough-ins), you request a draw. An independent third-party inspector confirms completion, and funds are wired directly within 48 to 72 hours.",
  },
  {
    id: "f6",
    category: "financing",
    question: "What states and property types are eligible?",
    answer: "Financing covers 1-4 unit residential properties, warrants and non-warrantable condos, townhomes, and 5-8 unit small multifamily assets across 45+ states. Personal primary residences are strictly excluded; all capital is business-purpose.",
  },

  // Advisory FAQs
  {
    id: "a1",
    category: "advisory",
    question: "Who is the Video Content Advisory program designed for?",
    answer: "It is specifically structured for mortgage loan officers, branch managers, and producing brokers who want to build a consumer-direct acquisition engine via YouTube and video without sounding like a generic corporate commercial.",
  },
  {
    id: "a2",
    category: "advisory",
    question: "What is the key difference between One-on-One and Small Group?",
    answer: "One-on-One is an intensive private strategy engagement where I personally audit your channel, co-develop your editorial calendar, review scripts, and refine your lead capture funnels. Small Group gathers up to six peers for collaborative sprint reviews, shared scripts, and peer accountability.",
  },
  {
    id: "a3",
    category: "advisory",
    question: "Do I need expensive camera gear or a production studio to start?",
    answer: "Absolutely not. A modern smartphone, a $30 lavalier microphone, and simple window lighting or a desk key light are more than sufficient. Borrowers care about domain depth, clarity, and trust—not Hollywood cinema grade footage.",
  },
  {
    id: "a4",
    category: "advisory",
    question: "How do we handle mortgage compliance and state licensing disclosures?",
    answer: "Compliance is embedded directly into our scripting and publishing frameworks. We structure disclaimers, NMLS licensing callouts, and compliant call-to-actions that keep your compliance director completely comfortable while preserving viewer engagement.",
  },
  {
    id: "a5",
    category: "advisory",
    question: "What is the typical time commitment per week?",
    answer: "Expect 3 to 4 hours per week: 1 hour for our strategy session/script review, 1 to 2 hours for batch filming, and 30 minutes for coordinating thumbnails and descriptions with your editor or virtual assistant.",
  },
  {
    id: "a6",
    category: "advisory",
    question: "What happens after I submit an application?",
    answer: "I personally read every application within three business days. If there is a strong strategic fit, I will send an invitation link to schedule a 20-minute fit call where we examine your current situation and determine the right next step.",
  },
];
