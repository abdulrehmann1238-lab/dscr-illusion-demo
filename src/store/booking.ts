import { create } from 'zustand';

export type CallType = 'financing' | 'advisory' | 'speaking';

export interface BookingPrefill {
  callType?: CallType;
  scenarioNote?: string;
  applicantName?: string;
  applicantEmail?: string;
}

interface BookingState {
  isOpen: boolean;
  prefill: BookingPrefill;
  openBooking: (prefill?: BookingPrefill) => void;
  closeBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  prefill: {
    callType: 'financing',
  },
  openBooking: (prefill) =>
    set({
      isOpen: true,
      prefill: {
        callType: prefill?.callType || 'financing',
        scenarioNote: prefill?.scenarioNote || '',
        applicantName: prefill?.applicantName || '',
        applicantEmail: prefill?.applicantEmail || '',
      },
    }),
  closeBooking: () => set({ isOpen: false }),
}));
