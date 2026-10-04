import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface SlotPickerProps {
  onSlotSelected: (slot: string) => void;
  onCancel?: () => void;
}

export const SlotPicker: React.FC<SlotPickerProps> = ({ onSlotSelected, onCancel }) => {
  const [selectedDay, setSelectedDay] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const days = [
    { label: 'Today (Emergency)', sub: '2 slots left' },
    { label: 'Tomorrow', sub: '4 slots left' },
    { label: 'Thursday', sub: '6 slots left' },
  ];

  const timeSlots = [
    '8:00 AM – 11:00 AM (Morning Dispatch)',
    '11:00 AM – 2:00 PM (Midday Window)',
    '2:00 PM – 5:00 PM (Afternoon Window)',
    '5:00 PM – 8:00 PM (Evening On-Call)',
  ];

  return (
    <div className="bg-white p-5 rounded-lg border border-border shadow-sh-2 text-left">
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border">
        <Calendar className="w-5 h-5 text-[#1E3A5F]" />
        <div>
          <h4 className="text-sm font-semibold text-[#1E3A5F]">Select Priority Arrival Window</h4>
          <p className="text-xs text-text-muted">A Ridgeline master technician will be assigned directly.</p>
        </div>
      </div>

      {/* Day Selector */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {days.map((d) => (
          <button
            key={d.label}
            onClick={() => setSelectedDay(d.label)}
            className={`p-2.5 rounded-md border text-left transition-colors cursor-pointer ${
              selectedDay === d.label
                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                : 'bg-surface border-border text-text hover:border-text-2'
            }`}
          >
            <div className="text-xs font-semibold">{d.label}</div>
            <div className={`text-[10px] ${selectedDay === d.label ? 'text-white/80' : 'text-text-muted'}`}>
              {d.sub}
            </div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="flex flex-col gap-2 mb-5">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedTime(slot)}
            className={`p-3 rounded-md border text-xs flex items-center justify-between transition-colors cursor-pointer ${
              selectedTime === slot
                ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                : 'bg-surface/50 border-border text-text hover:bg-surface'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              <span>{slot}</span>
            </div>
            {selectedTime === slot && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </button>
        ))}
      </div>

      {/* Footer Confirm */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
        {onCancel && (
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          size="md"
          disabled={!selectedTime}
          onClick={() => selectedTime && onSlotSelected(`${selectedDay} · ${selectedTime}`)}
          className="bg-[#E0742B] hover:bg-[#C9621E] border-[#E0742B] text-white"
        >
          Confirm Arrival Window
        </Button>
      </div>
    </div>
  );
};
