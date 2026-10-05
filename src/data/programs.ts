export interface ProgramStep {
  number: number;
  title: string;
  description: string;
}

export interface Program {
  id: 'dscr' | 'fix-and-flip' | 'ground-up';
  title: string;
  shortName: string;
  bestFor: string;
  steps: ProgramStep[];
  whatILookAt: string[];
  timeline: string;
  maxLTV: string;
}

export const programs: Program[] = [
  {
    id: "dscr",
    title: "Debt Service Coverage Ratio (DSCR)",
    shortName: "DSCR",
    bestFor: "Long-term residential rental investors expanding a portfolio without personal tax return underwriting.",
    steps: [
      {
        number: 1,
        title: "Rent Roll & Lease Verification",
        description: "Review current in-place leases or projected market rent to verify predictable incoming cash flow.",
      },
      {
        number: 2,
        title: "Appraisal with Form 1007",
        description: "Order independent residential valuation paired with a certified market rent schedule addendum.",
      },
      {
        number: 3,
        title: "Ratio Sizing & Rate Lock",
        description: "Determine coverage ratio (Rent ÷ PITIA) to lock pricing with flexible 30-year fixed or interest-only options.",
      },
      {
        number: 4,
        title: "Closing & Entity Title",
        description: "Fund directly into your LLC, LP, or holding structure with transparent title closing.",
      },
    ],
    whatILookAt: [
      "In-place rent coverage vs 1007 fair market rent assessment",
      "Debt Service Coverage Ratio (target ≥ 1.25 for premier leverage)",
      "Six months of verifiable PITIA cash reserves post-closing",
    ],
    timeline: "18 to 24 business days from appraisal order to funding",
    maxLTV: "Up to 80% Purchase / 75% Cash-Out Refinance",
  },
  {
    id: "fix-and-flip",
    title: "Fix & Flip Short-Term Capital",
    shortName: "Fix & Flip",
    bestFor: "Value-add residential operators acquiring distressed properties requiring cosmetic or structural renovation.",
    steps: [
      {
        number: 1,
        title: "Scope of Work & Contractor Bids",
        description: "Examine detailed line-item rehab budget, contractor estimates, and proposed construction schedule.",
      },
      {
        number: 2,
        title: "As-Is & ARV Valuation",
        description: "Appraise current condition alongside conservative After-Repair Value supported by recent local comps.",
      },
      {
        number: 3,
        title: "Draw Escrow Structuring",
        description: "Structure purchase capital alongside 100% financed rehab holdback released upon verified progress.",
      },
      {
        number: 4,
        title: "Closing & Draw Disbursals",
        description: "Rapid closing with fast 48-hour turnarounds on milestone progress draw requests.",
      },
    ],
    whatILookAt: [
      "Recent verifiable project track record (deals closed within 24 months)",
      "Conservative spread between all-in cost basis and exit comps",
      "Contingency buffer (10-15% minimum) baked into the rehab budget",
    ],
    timeline: "10 to 14 business days from initial inspection to closing",
    maxLTV: "Up to 90% Purchase / 100% Rehab / 75% ARV",
  },
  {
    id: "ground-up",
    title: "Ground-Up Construction",
    shortName: "Ground-Up",
    bestFor: "Experienced residential builders developing 1-4 unit urban infill parcels or custom spec properties.",
    steps: [
      {
        number: 1,
        title: "Plans & Permit Verification",
        description: "Audit architectural blueprints, municipal permits, civil engineering, and utility connections.",
      },
      {
        number: 2,
        title: "General Contractor Vetting",
        description: "Review builder license, general liability coverage, commercial portfolio, and active pipeline load.",
      },
      {
        number: 3,
        title: "Loan-to-Cost (LTC) Structuring",
        description: "Size debt against total project cost including hard costs, soft costs, and land equity credit.",
      },
      {
        number: 4,
        title: "Milestone Draw Management",
        description: "Third-party site inspections and title date-downs for smooth construction stage funding.",
      },
    ],
    whatILookAt: [
      "Full municipal entitlement and shovel-ready building permits in hand",
      "General Contractor's financial stability and local sub-contractor relationships",
      "Real equity invested into land acquisition or site preparation",
    ],
    timeline: "21 to 28 business days from engineering package review",
    maxLTV: "Up to 85% Loan-to-Cost / 70% Loan-to-Completed Value",
  },
];
