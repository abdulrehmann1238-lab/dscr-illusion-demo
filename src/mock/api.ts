import { videos, VideoItem } from '../data/videos';
import { generateNext14BusinessDays, DaySchedule } from './slots';
import { useHandoffStore } from '../store/handoff';

const latency = (min = 350, max = 800) =>
  new Promise((r) => setTimeout(r, min + Math.random() * (max - min)));

export interface BookingPayload {
  callType: string;
  dateISO: string;
  time: string;
  name: string;
  email: string;
  note?: string;
  honeypot?: string;
}

export interface SpeakingPayload {
  fullName: string;
  workEmail: string;
  organization: string;
  role?: string;
  eventName: string;
  eventDate: string;
  location: string;
  isVirtual: boolean;
  audience: 'mortgage' | 'real-estate';
  attendance: string;
  topics: string[];
  format?: string;
  honorarium?: string;
  message?: string;
  honeypot?: string;
}

export interface AdvisoryPayload {
  name: string;
  email: string;
  company: string;
  role: string;
  nmls?: string;
  teamSize: string;
  youtubeUrl?: string;
  videosCount: string;
  biggestObstacle: string;
  leadSources: string[];
  annualGoal: string;
  preferredFormat: string;
  desiredStart: string;
  referralSource: string;
  consent: boolean;
  honeypot?: string;
}

export const api = {
  listVideos: async ({
    topic = 'All',
    q = '',
    sort = 'newest',
    limit = 9,
  }: {
    topic?: string;
    q?: string;
    sort?: 'newest' | 'views';
    limit?: number;
  }): Promise<{ items: VideoItem[]; total: number; hasMore: boolean }> => {
    await latency(250, 500);

    let filtered = [...videos];

    // Topic filter
    if (topic && topic !== 'All') {
      filtered = filtered.filter((v) => v.topic.toLowerCase() === topic.toLowerCase());
    }

    // Search filter (matches title and summary)
    if (q && q.trim()) {
      const term = q.toLowerCase().trim();
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(term) ||
          v.summary.toLowerCase().includes(term) ||
          v.topic.toLowerCase().includes(term)
      );
    }

    // Sort
    if (sort === 'views') {
      filtered.sort((a, b) => b.views - a.views);
    } else {
      // Newest (natural order in videos array)
    }

    const items = filtered.slice(0, limit);
    return {
      items,
      total: filtered.length,
      hasMore: limit < filtered.length,
    };
  },

  listSlots: async (dateISO?: string): Promise<DaySchedule[]> => {
    await latency(200, 400);
    return generateNext14BusinessDays();
  },

  createBooking: async (payload: BookingPayload): Promise<{ id: string; success: boolean }> => {
    await latency(600, 900);

    // Spam honeypot detection
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return { id: 'dropped', success: true };
    }

    const bookingId = `BK-${Date.now().toString().slice(-6)}`;
    useHandoffStore.getState().logAnalyticsEvent('book_call_success', {
      booking_id: bookingId,
      call_type: payload.callType,
      date: payload.dateISO,
    });
    useHandoffStore.getState().markFeatureVisited('calendlyBooking');

    return { id: bookingId, success: true };
  },

  submitSpeaking: async (payload: SpeakingPayload): Promise<{ id: string; success: boolean }> => {
    await latency(800, 1200);

    // Honeypot check
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return { id: 'dropped', success: true };
    }

    // Error simulation per PRD 13.4 & 23: typing exact name "Error Test" triggers failure
    if (payload.fullName.trim().toLowerCase() === 'error test') {
      useHandoffStore.getState().logAnalyticsEvent('speaking_inquiry_error', {
        reason: 'simulated_503',
      });
      throw new Error("We couldn't send that just now. Your answers are still here. Please try again.");
    }

    const id = `SPK-${Date.now().toString().slice(-6)}`;
    useHandoffStore.getState().logAnalyticsEvent('speaking_inquiry_submit', {
      inquiry_id: id,
      audience: payload.audience,
      topics_count: payload.topics.length,
    });
    useHandoffStore.getState().markFeatureVisited('formSubmitted');

    return { id, success: true };
  },

  submitAdvisory: async (payload: AdvisoryPayload): Promise<{ id: string; success: boolean }> => {
    await latency(800, 1200);

    // Honeypot check
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      return { id: 'dropped', success: true };
    }

    // Error test simulation
    if (payload.name.trim().toLowerCase() === 'error test') {
      useHandoffStore.getState().logAnalyticsEvent('advisory_application_error', {
        reason: 'simulated_503',
      });
      throw new Error("We couldn't send that just now. Your answers are still here. Please try again.");
    }

    const id = `ADV-${Date.now().toString().slice(-6)}`;
    useHandoffStore.getState().logAnalyticsEvent('advisory_application_submit', {
      application_id: id,
      format: payload.preferredFormat,
    });
    useHandoffStore.getState().markFeatureVisited('formSubmitted');

    return { id, success: true };
  },
};

/**
 * Downloads a generated .ics calendar invitation per PRD Section 14.4
 */
export function downloadCalendarInvite(details: {
  title: string;
  description: string;
  dateISO: string;
  timeStr: string;
  hostName: string;
}) {
  const { title, description, dateISO, timeStr, hostName } = details;
  const startHour = timeStr.includes('PM') && !timeStr.startsWith('12')
    ? parseInt(timeStr) + 12
    : parseInt(timeStr);
  const startMinute = timeStr.includes(':') ? timeStr.split(':')[1].substring(0, 2) : '00';

  const cleanDate = dateISO.replace(/-/g, '');
  const dtStart = `${cleanDate}T${String(startHour).padStart(2, '0')}${startMinute}00`;
  const dtEnd = `${cleanDate}T${String(startHour + 1).padStart(2, '0')}${startMinute}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Marcus Hale//The Private Office//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `ORGANIZER;CN=${hostName}:mailto:marcus@halecapital.com`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `STATUS:CONFIRMED`,
    'LOCATION:Google Meet (link will be sent)',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `meeting-with-${hostName.toLowerCase().replace(/\s+/g, '-')}.ics`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}
