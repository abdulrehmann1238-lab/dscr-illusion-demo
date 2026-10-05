import React, { useState, useMemo } from 'react';
import { RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateDscr, DscrInput } from '../../lib/dscr';
import { formatMoney, formatPercent } from '../../lib/format';
import { Button } from '../ui/Button';
import { Segmented } from '../ui/Segmented';
import { useBookingStore } from '../../store/booking';
import { useHandoffStore } from '../../store/handoff';

const DEFAULT_DSCR: DscrInput = {
  rent: 3200,
  loanAmount: 420000,
  interestRate: 7.25,
  annualTaxes: 4800,
  annualInsurance: 1900,
  monthlyHoa: 0,
  termYears: 30,
};

export const DscrCheck: React.FC = () => {
  const [params, setParams] = useState<DscrInput>(DEFAULT_DSCR);
  const [snappedMsg, setSnappedMsg] = useState<string | null>(null);

  const { openBooking } = useBookingStore();
  const { logAnalyticsEvent, markFeatureVisited } = useHandoffStore();

  const result = useMemo(() => calculateDscr(params), [params]);

  const handleRentChange = (val: number) => {
    markFeatureVisited('dscrCalculator');
    let clamped = val;
    if (val > 12000) {
      clamped = 12000;
      setSnappedMsg('Adjusted to $12,000 maximum rent.');
      setTimeout(() => setSnappedMsg(null), 3000);
    } else if (val < 500) {
      clamped = 500;
      setSnappedMsg('Adjusted to $500 minimum rent.');
      setTimeout(() => setSnappedMsg(null), 3000);
    }
    setParams((p) => ({ ...p, rent: clamped }));
  };

  const handleLoanChange = (val: number) => {
    markFeatureVisited('dscrCalculator');
    let clamped = val;
    if (val > 2000000) clamped = 2000000;
    if (val < 75000) clamped = 75000;
    setParams((p) => ({ ...p, loanAmount: clamped }));
  };

  const handleReset = () => {
    setParams(DEFAULT_DSCR);
    logAnalyticsEvent('dscr_calculator_reset');
  };

  const handleDiscussScenario = () => {
    logAnalyticsEvent('dscr_discuss_scenario', {
      dscr_ratio: result.dscrRatio,
      loan_amount: params.loanAmount,
      rent: params.rent,
      verdict: result.verdict,
    });
    openBooking({
      callType: 'financing',
      scenarioNote: `DSCR Calculator Scenario: Rent ${formatMoney(params.rent)}/mo, Loan ${formatMoney(params.loanAmount)}, Rate ${formatPercent(params.interestRate)}, PITIA ${formatMoney(result.totalPitia)}/mo, Calculated Ratio: ${result.dscrRatio.toFixed(2)} (${result.verdictLabel}).`,
    });
  };

  return (
    <div
      id="dscr-calculator"
      className="w-full bg-navy-900 text-cream-100 on-navy rounded-lg border border-line-dark shadow-2 p-6 sm:p-10 lg:p-12 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-line-dark">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-2 block">
            Signature Interactive Tool · Recommended Enhancement
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-cream-100 leading-tight">
            DSCR Ratio Check
          </h2>
          <p className="text-xs sm:text-sm text-cream-400 mt-2 max-w-xl font-sans">
            Adjust gross rent, capital sizing, and operating expenses to calculate real debt service coverage under institutional guidelines.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-cream-400 hover:text-gold-300 transition-colors self-start sm:self-end"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset defaults</span>
        </button>
      </div>

      {snappedMsg && (
        <div className="mt-4 p-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs rounded-sm text-center animate-in fade-in">
          {snappedMsg}
        </div>
      )}

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
        {/* Left Inputs Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Monthly Rent Slider + Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold">
              <label htmlFor="rent-slider" className="text-cream-300">
                Monthly Gross Rent
              </label>
              <div className="flex items-center gap-1 bg-navy-700/80 px-3 py-1 rounded-sm border border-line-dark">
                <span className="text-cream-400">$</span>
                <input
                  id="rent-input"
                  type="number"
                  min={500}
                  max={12000}
                  step={50}
                  value={params.rent}
                  onChange={(e) => handleRentChange(Number(e.target.value))}
                  className="w-20 bg-transparent text-right font-display text-base text-cream-100 focus:outline-none"
                  aria-label="Monthly Rent in dollars"
                />
              </div>
            </div>
            <input
              id="rent-slider"
              type="range"
              min={500}
              max={12000}
              step={50}
              value={params.rent}
              onChange={(e) => handleRentChange(Number(e.target.value))}
              aria-valuetext={`$${params.rent} per month`}
              className="w-full h-1.5 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <div className="flex justify-between text-[11px] text-cream-400">
              <span>$500</span>
              <span>$12,000</span>
            </div>
          </div>

          {/* Loan / Purchase Sizing Slider + Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold">
              <label htmlFor="loan-slider" className="text-cream-300">
                Purchase / Loan Amount
              </label>
              <div className="flex items-center gap-1 bg-navy-700/80 px-3 py-1 rounded-sm border border-line-dark">
                <span className="text-cream-400">$</span>
                <input
                  id="loan-input"
                  type="number"
                  min={75000}
                  max={2000000}
                  step={5000}
                  value={params.loanAmount}
                  onChange={(e) => handleLoanChange(Number(e.target.value))}
                  className="w-24 bg-transparent text-right font-display text-base text-cream-100 focus:outline-none"
                  aria-label="Loan Amount in dollars"
                />
              </div>
            </div>
            <input
              id="loan-slider"
              type="range"
              min={75000}
              max={2000000}
              step={5000}
              value={params.loanAmount}
              onChange={(e) => handleLoanChange(Number(e.target.value))}
              aria-valuetext={`$${params.loanAmount} loan`}
              className="w-full h-1.5 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <div className="flex justify-between text-[11px] text-cream-400">
              <span>$75,000</span>
              <span>$2,000,000</span>
            </div>
          </div>

          {/* Rate, Term & Operating Expenses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Interest Rate Stepper */}
            <div className="p-3.5 bg-navy-700/40 rounded-sm border border-line-dark space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-cream-400 font-semibold block">
                Interest Rate (Illustrative)
              </label>
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-cream-100">
                  {formatPercent(params.interestRate)}
                </span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setParams((p) => ({
                        ...p,
                        interestRate: Math.max(3.0, Number((p.interestRate - 0.125).toFixed(3))),
                      }))
                    }
                    className="w-7 h-7 flex items-center justify-center bg-navy-900 border border-line-dark rounded hover:border-gold-300 text-cream-100"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setParams((p) => ({
                        ...p,
                        interestRate: Math.min(12.0, Number((p.interestRate + 0.125).toFixed(3))),
                      }))
                    }
                    className="w-7 h-7 flex items-center justify-center bg-navy-900 border border-line-dark rounded hover:border-gold-300 text-cream-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Amortization Term Segmented */}
            <div className="p-3.5 bg-navy-700/40 rounded-sm border border-line-dark space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-cream-400 font-semibold block">
                Amortization Term
              </label>
              <Segmented<string>
                theme="navy"
                value={String(params.termYears)}
                onChange={(v) => setParams((p) => ({ ...p, termYears: Number(v) }))}
                options={[
                  { value: '30', label: '30 Yrs' },
                  { value: '25', label: '25 Yrs' },
                  { value: '20', label: '20 Yrs' },
                ]}
              />
            </div>

            {/* Annual Property Taxes */}
            <div className="p-3.5 bg-navy-700/40 rounded-sm border border-line-dark space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-cream-400 font-semibold block">
                Annual Property Taxes
              </label>
              <div className="flex items-center gap-1">
                <span className="text-cream-400 text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  max={40000}
                  step={100}
                  value={params.annualTaxes}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, annualTaxes: Number(e.target.value) }))
                  }
                  className="w-full bg-transparent font-display text-base text-cream-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Annual Property Insurance */}
            <div className="p-3.5 bg-navy-700/40 rounded-sm border border-line-dark space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-cream-400 font-semibold block">
                Annual Hazard Insurance
              </label>
              <div className="flex items-center gap-1">
                <span className="text-cream-400 text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  max={20000}
                  step={50}
                  value={params.annualInsurance}
                  onChange={(e) =>
                    setParams((p) => ({ ...p, annualInsurance: Number(e.target.value) }))
                  }
                  className="w-full bg-transparent font-display text-base text-cream-100 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Results & Gauge Column (5 cols, sticky) */}
        <div className="lg:col-span-5 bg-navy-700/60 rounded-md border border-line-dark p-6 sm:p-8 flex flex-col justify-between">
          <div aria-live="polite" className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold block">
              Calculated Debt Service Ratio
            </span>

            {/* Oversize Ratio Numerals */}
            <div className="flex items-baseline gap-3">
              <div className="font-display text-6xl sm:text-7xl font-bold text-cream-100 tabular-nums">
                {result.dscrRatio.toFixed(2)}
              </div>
              <span className="text-sm uppercase tracking-wider text-cream-400">
                DSCR
              </span>
            </div>

            {/* Live Verdict Chip per PRD 13.2 */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  result.verdict === 'strong'
                    ? 'bg-ok'
                    : result.verdict === 'workable'
                    ? 'bg-warn'
                    : 'bg-err'
                }`}
              />
              <span
                className={
                  result.verdict === 'strong'
                    ? 'text-ok'
                    : result.verdict === 'workable'
                    ? 'text-gold-300'
                    : 'text-err'
                }
              >
                {result.verdictLabel}
              </span>
            </div>

            {/* Horizontal Gauge Bar (0.5 to 1.75 scale with ticks at 1.00 & 1.25) */}
            <div className="space-y-2 pt-2">
              <div className="relative w-full h-2 bg-navy-900 rounded-full border border-line-dark overflow-visible">
                {/* 1.00 Break-even tick */}
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-warn"
                  style={{ left: '40%' }}
                  title="1.00 Break-Even"
                />
                {/* 1.25 Prime target tick */}
                <div
                  className="absolute top-0 bottom-0 w-[1px] bg-ok"
                  style={{ left: '60%' }}
                  title="1.25 Target"
                />

                {/* Animated Gold Marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-300 border-2 border-navy-900 shadow-md transition-all duration-med ease-out"
                  style={{ left: `calc(${result.gaugePercent}% - 8px)` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-cream-400 font-mono">
                <span>0.50</span>
                <span className="text-warn">1.00 (Break-even)</span>
                <span className="text-ok">1.25 (Prime)</span>
                <span>1.75+</span>
              </div>
            </div>

            {/* Monthly PITIA Breakdown */}
            <div className="p-4 bg-navy-900/60 rounded-sm border border-line-dark text-xs space-y-2">
              <div className="flex justify-between text-cream-400">
                <span>Principal & Interest:</span>
                <span className="text-cream-100 font-mono">{formatMoney(result.monthlyPrincipalInterest)}</span>
              </div>
              <div className="flex justify-between text-cream-400">
                <span>Taxes & Insurance:</span>
                <span className="text-cream-100 font-mono">
                  {formatMoney(result.monthlyTaxes + result.monthlyInsurance)}
                </span>
              </div>
              <div className="pt-2 border-t border-line-dark flex justify-between font-semibold text-cream-100">
                <span>Total Monthly PITIA:</span>
                <span className="text-gold-300 font-mono">{formatMoney(result.totalPitia)}/mo</span>
              </div>
            </div>

            <p className="text-xs text-cream-400 leading-relaxed font-sans">
              {result.verdictDescription}
            </p>
          </div>

          {/* Action to Book Call with Prefilled Scenario */}
          <div className="pt-6 space-y-4">
            <Button
              variant="gold-on-navy"
              fullWidth
              size="lg"
              onClick={handleDiscussScenario}
              icon="arrow-right"
            >
              Discuss this scenario
            </Button>

            {/* Mandatory Regulatory Disclaimer per PRD 13.2 */}
            <p className="text-[11px] text-cream-400 leading-normal border-t border-line-dark pt-3 font-sans">
              Illustrative math only. Not a rate quote, approval, or commitment to lend. Terms vary by borrower, property and lender guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
