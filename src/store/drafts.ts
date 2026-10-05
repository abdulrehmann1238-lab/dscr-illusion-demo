/**
 * Drafts store with sessionStorage persistence per PRD Section 13.5 & 15.2
 */

export interface AdvisoryDraft {
  // Step 1: About you
  name: string;
  email: string;
  company: string;
  role: string;
  nmls: string;
  teamSize: string;

  // Step 2: Your video situation
  youtubeUrl: string;
  videosCount: string;
  biggestObstacle: string;
  leadSources: string[];

  // Step 3: Goals
  annualGoal: string;
  preferredFormat: 'one-on-one' | 'small-group' | 'not-sure';
  desiredStart: string;
  referralSource: string;

  // Step 4: Review & Consent
  consent: boolean;
}

const STORAGE_KEY = 'mh_advisory_draft_v1';

export const defaultAdvisoryDraft: AdvisoryDraft = {
  name: '',
  email: '',
  company: '',
  role: '',
  nmls: '',
  teamSize: 'Solo (1 LO)',
  youtubeUrl: '',
  videosCount: '1-5 videos',
  biggestObstacle: 'Consistency',
  leadSources: ['Client referrals', 'Realtor partners'],
  annualGoal: '',
  preferredFormat: 'one-on-one',
  desiredStart: 'Next 30 days',
  referralSource: 'YouTube channel',
  consent: false,
};

export function getSavedAdvisoryDraft(): AdvisoryDraft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...defaultAdvisoryDraft, ...JSON.parse(raw) };
    }
  } catch (e) {
    // sessionStorage disabled or unavailable
  }
  return defaultAdvisoryDraft;
}

export function saveAdvisoryDraft(draft: AdvisoryDraft): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch (e) {
    // ignore
  }
}

export function clearAdvisoryDraft(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}
