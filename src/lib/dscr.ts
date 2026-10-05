/**
 * Exact DSCR calculation & amortization formulas per PRD Section 13.2
 */

export interface DscrInput {
  rent: number;
  loanAmount: number;
  interestRate: number; // e.g. 7.25 (%)
  annualTaxes: number;
  annualInsurance: number;
  monthlyHoa: number;
  termYears: number; // 30, 25, 20
}

export interface DscrResult {
  monthlyPrincipalInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  totalPitia: number;
  dscrRatio: number;
  verdict: 'strong' | 'workable' | 'below';
  verdictLabel: string;
  verdictDescription: string;
  gaugePercent: number; // 0 to 100 for 0.5 to 1.75 scale
}

export function calculateDscr(input: DscrInput): DscrResult {
  const {
    rent,
    loanAmount,
    interestRate,
    annualTaxes,
    annualInsurance,
    monthlyHoa,
    termYears,
  } = input;

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = termYears * 12;

  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0 && numberOfPayments > 0 && loanAmount > 0) {
    const factor = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPrincipalInterest = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  const monthlyTaxes = Math.max(0, annualTaxes) / 12;
  const monthlyInsurance = Math.max(0, annualInsurance) / 12;
  const hoa = Math.max(0, monthlyHoa);

  const totalPitia = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance + hoa;

  let dscrRatio = 0;
  if (totalPitia > 0 && rent > 0) {
    dscrRatio = rent / totalPitia;
  }

  // Verdict logic
  let verdict: 'strong' | 'workable' | 'below' = 'workable';
  let verdictLabel = "Workable. Structure matters.";
  let verdictDescription = "Coverage qualifies under standard investor programs. Optimizing rate terms or lease structure can strengthen leverage.";

  if (dscrRatio >= 1.25) {
    verdict = 'strong';
    verdictLabel = "Strong coverage";
    verdictDescription = "Meets or exceeds premier institutional investor guidelines. Unlocks maximum leverage and best-tier note pricing.";
  } else if (dscrRatio < 1.00) {
    verdict = 'below';
    verdictLabel = "Below 1.0. Let's talk about options.";
    verdictDescription = "Subject property does not break even on paper. Flexible no-ratio or short-term transitional solutions may be required.";
  }

  // Gauge percent on 0.50 to 1.75 range
  // 0.5 = 0%, 1.00 = 40%, 1.25 = 60%, 1.75 = 100%
  const minScale = 0.5;
  const maxScale = 1.75;
  const clampedRatio = Math.min(Math.max(dscrRatio, minScale), maxScale);
  const gaugePercent = ((clampedRatio - minScale) / (maxScale - minScale)) * 100;

  return {
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
    monthlyTaxes: Math.round(monthlyTaxes),
    monthlyInsurance: Math.round(monthlyInsurance),
    monthlyHoa: Math.round(hoa),
    totalPitia: Math.round(totalPitia),
    dscrRatio: Number(dscrRatio.toFixed(2)),
    verdict,
    verdictLabel,
    verdictDescription,
    gaugePercent,
  };
}
