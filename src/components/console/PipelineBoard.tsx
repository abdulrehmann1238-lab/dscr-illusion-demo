import React, { useState } from 'react';
import { Lead } from '../../data/leads';
import { useAppStore } from '../../store';
import { formatCAD } from '../../lib/format';
import { useToast } from '../ui/Toast';
import { cn } from '../../lib/utils';
import { Phone, Mail, MapPin, MoreVertical, ArrowRight, CheckCircle2 } from 'lucide-react';

const stages: Lead['stage'][] = [
  'New Lead',
  'Contacted',
  'Quote Sent',
  'Booked',
  'Completed',
];

export const PipelineBoard: React.FC = () => {
  const { leads, moveLeadStage } = useAppStore();
  const { toast, success } = useToast();
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedLeadId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: Lead['stage']) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedLeadId;
    if (id) {
      moveLead(id, targetStage);
    }
    setDraggedLeadId(null);
  };

  const moveLead = (id: string, targetStage: Lead['stage']) => {
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.stage === targetStage) return;

    moveLeadStage(id, targetStage);

    if (targetStage === 'Booked') {
      toast({
        type: 'success',
        title: 'Booking Workflow Triggered',
        message: `Automated calendar invite & 24h SMS reminder dispatched to ${lead.name}.`,
      });
    } else if (targetStage === 'Completed') {
      toast({
        type: 'info',
        title: 'Job Completed',
        message: `Google Review request workflow scheduled in 3 days for ${lead.name}.`,
      });
    } else {
      success('Deal Stage Updated', `${lead.name} moved to ${targetStage}.`);
    }
    setActiveMenuId(null);
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-[1000px] text-left">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          const totalValue = stageLeads.reduce((acc, l) => acc + l.valueCAD, 0);

          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              className="flex-1 bg-surface border border-border rounded-lg p-3 flex flex-col min-w-[200px] max-w-[250px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/70">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-text">{stage}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-secondary-soft text-primary font-bold">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium text-text-muted">
                  {formatCAD(totalValue)}
                </span>
              </div>

              {/* Cards List */}
              <div className="flex flex-col gap-2.5 flex-1 min-h-[350px]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className={cn(
                      'bg-elevated border rounded-md p-3 shadow-sh-1 hover:shadow-sh-2 transition-all duration-fast cursor-grab active:cursor-grabbing select-none relative group',
                      lead.urgent ? 'border-l-4 border-l-accent border-border' : 'border-border'
                    )}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-text leading-tight">
                          {lead.name}
                        </span>
                        <span className="text-[10px] text-text-muted mt-0.5">{lead.city}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-primary shrink-0">
                        {formatCAD(lead.valueCAD)}
                      </span>
                    </div>

                    {/* Job Details */}
                    <p className="text-[11px] font-medium text-text-2 mb-2 line-clamp-2">
                      {lead.service}: {lead.details}
                    </p>

                    {/* Footer / Meta */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[10px] text-text-muted">
                      <span className="px-1.5 py-0.2 rounded bg-bg border border-border truncate max-w-[110px]">
                        {lead.source}
                      </span>

                      {/* Keyboard alternative stage move dropdown */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveMenuId(activeMenuId === lead.id ? null : lead.id)
                          }
                          className="p-1 hover:bg-surface rounded text-text-muted hover:text-text cursor-pointer"
                          aria-label="Move lead stage"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>

                        {activeMenuId === lead.id && (
                          <div className="absolute right-0 bottom-full mb-1 z-30 w-36 bg-elevated border border-border shadow-sh-3 rounded-md p-1 text-[11px]">
                            <div className="px-2 py-1 text-[9px] font-mono text-text-muted uppercase">
                              Move to stage:
                            </div>
                            {stages.map((stg) => (
                              <button
                                key={stg}
                                onClick={() => moveLead(lead.id, stg)}
                                className={cn(
                                  'w-full text-left px-2 py-1 rounded hover:bg-surface flex items-center justify-between cursor-pointer',
                                  lead.stage === stg && 'font-bold text-primary'
                                )}
                              >
                                <span>{stg}</span>
                                {lead.stage === stg && (
                                  <CheckCircle2 className="w-3 h-3 text-primary" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="h-28 border border-dashed border-border/60 rounded-md flex items-center justify-center text-[11px] text-text-muted/60">
                    Drop lead here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
