/**
 * Deterministic seeded booking slots generator per PRD Section 14.4 & 15.2
 */

export interface TimeSlot {
  id: string;
  time: string; // e.g. "10:00 AM"
  timestamp: string;
  available: boolean;
}

export interface DaySchedule {
  date: Date;
  dateISO: string; // "YYYY-MM-DD"
  dayName: string; // "Mon", "Tue"
  dayNumber: number; // 18
  monthName: string; // "Oct"
  isWeekend: boolean;
  isFullyBooked: boolean;
  slots: TimeSlot[];
}

export function generateNext14BusinessDays(): DaySchedule[] {
  const days: DaySchedule[] = [];
  const now = new Date();
  let current = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  // Generate 14 business days (skipping Saturday and Sunday)
  while (days.length < 14) {
    const dayOfWeek = current.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dateISO = current.toISOString().split('T')[0];
      const dayIndex = days.length;

      // Seed deterministic slots based on date
      // Day 3 (index 2) is seeded as "fully booked" to demonstrate empty state per PRD 14.4
      const isFullyBooked = dayIndex === 2;

      const baseTimes = [
        "09:30 AM",
        "10:15 AM",
        "11:00 AM",
        "01:30 PM",
        "02:15 PM",
        "03:00 PM",
        "04:15 PM",
      ];

      const slots: TimeSlot[] = isFullyBooked
        ? []
        : baseTimes.map((time, idx) => ({
            id: `${dateISO}-${idx}`,
            time,
            timestamp: `${dateISO}T${time.includes('PM') && !time.startsWith('12') ? parseInt(time) + 12 : time}:00`,
            available: true,
          }));

      days.push({
        date: new Date(current),
        dateISO,
        dayName: current.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: current.getDate(),
        monthName: current.toLocaleDateString('en-US', { month: 'short' }),
        isWeekend: false,
        isFullyBooked,
        slots,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return days;
}
