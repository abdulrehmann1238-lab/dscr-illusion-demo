export interface TalkTopic {
  id: string;
  audience: 'mortgage' | 'real-estate';
  title: string;
  abstract: string;
  formats: string[];
}

export const talkTopics: TalkTopic[] = [
  // Mortgage Audience Topics
  {
    id: "m1",
    audience: "mortgage",
    title: "Build a Consumer-Direct Brand with YouTube",
    abstract: "How a loan officer turns weekly educational video into a steady stream of self-qualified borrowers who already trust their advice before the first phone call.",
    formats: ["Keynote 45 min", "Breakout 60 min", "Workshop 90 min"],
  },
  {
    id: "m2",
    audience: "mortgage",
    title: "Your Camera Isn't the Problem",
    abstract: "The real psychological and structural reasons most mortgage videos fail, and the simple editorial scripting framework that makes complex financing topics watchable.",
    formats: ["Keynote 45 min", "Workshop 90 min"],
  },
  {
    id: "m3",
    audience: "mortgage",
    title: "From Views to Applications",
    abstract: "Connecting video education to an automated, fully compliant, trackable lead pipeline that respects state licensing rules and scales with organic reach.",
    formats: ["Breakout 60 min", "Workshop 90 min"],
  },

  // Real Estate Audience Topics
  {
    id: "r1",
    audience: "real-estate",
    title: "DSCR Loans Without the Myths",
    abstract: "What the debt service ratio actually measures, what it hides, and how smart property investors structure leases and reserve accounts to secure maximum leverage.",
    formats: ["Keynote 45 min", "Breakout 60 min"],
  },
  {
    id: "r2",
    audience: "real-estate",
    title: "Financing Your Next Five Rentals",
    abstract: "A rigorous walkthrough of the capital stack transitions that determine whether a residential real estate portfolio scales smoothly or stalls out on liquidity.",
    formats: ["Keynote 45 min", "Breakout 60 min", "Workshop 90 min"],
  },
  {
    id: "r3",
    audience: "real-estate",
    title: "Fix and Flip Financing, Line by Line",
    abstract: "How construction draws, contractor budgets, contingency escrows, and interest reserves interact—and where rehab projects quietly bleed capital.",
    formats: ["Breakout 60 min", "Workshop 90 min"],
  },
];
