import React, { useState } from 'react';
import { MaintenanceRequest } from '../../data/requests';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { BeforeAfter } from './BeforeAfter';
import { Badge } from '../ui/Badge';
import { CheckCircle2, MessageSquare, ShieldCheck, User, Paperclip } from 'lucide-react';
import { useAppStore } from '../../store';
import { useToast } from '../ui/Toast';

export interface RequestDrawerProps {
  request: MaintenanceRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RequestDrawer: React.FC<RequestDrawerProps> = ({
  request,
  isOpen,
  onClose,
}) => {
  const { approveRequest, updateRequest } = useAppStore();
  const { success, info } = useToast();
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<string[]>([
    'Initial QA regression completed. Mobile viewport verified at 375px & 412px.',
  ]);

  if (!request) return null;

  const handleApprove = () => {
    approveRequest(request.id);
    success(
      'Changes Approved & Deployed',
      `${request.title} for ${request.clientName} has been approved and moved to Done.`
    );
    onClose();
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, commentText]);
    setCommentText('');
    info('Note Added', 'Feedback appended to maintenance ticket audit trail.');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={request.title}
      description={`Client: ${request.clientName} · Monogram: ${request.clientMonogram}`}
      width="lg"
    >
      <div className="flex flex-col gap-6 text-left">
        {/* Status / Priority Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-md bg-surface border border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-text-2">Stage:</span>
            <Badge variant="info">{request.stage}</Badge>
            <Badge variant="neutral">{request.type}</Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <User className="w-3.5 h-3.5" />
            <span>Assignee: {request.assignee}</span>
          </div>
        </div>

        {/* Description Box */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1.5">
            Ticket Scope & Request
          </h4>
          <p className="text-sm text-text-2 leading-relaxed bg-surface/50 p-3.5 rounded-md border border-border">
            {request.description}
          </p>
        </div>

        {/* Before / After Visual Diff Slider (PRD §14.8 & §25) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Before / After Visual QA Comparison
            </h4>
            <span className="text-[11px] font-mono text-emerald-700 font-medium">
              Interactive Slider Handle
            </span>
          </div>
          <BeforeAfter
            beforeTitle={request.beforePreview?.title}
            beforeSubtitle={request.beforePreview?.subtitle}
            beforeTag={request.beforePreview?.tag}
            afterTitle={request.afterPreview?.title}
            afterSubtitle={request.afterPreview?.subtitle}
            afterTag={request.afterPreview?.tag}
          />
        </div>

        {/* QA Checklist */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Quality Assurance Checklist
          </h4>
          <div className="flex flex-col gap-2">
            {request.qaChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-2 rounded bg-surface border border-border text-xs"
              >
                <CheckCircle2
                  className={item.completed ? 'w-4 h-4 text-success' : 'w-4 h-4 text-border-strong'}
                />
                <span className={item.completed ? 'text-text font-medium' : 'text-text-muted'}>
                  {item.item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Changelog Entries */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Development Changelog
          </h4>
          <div className="p-3 bg-elevated rounded-md border border-border font-mono text-xs text-text-2 space-y-1">
            {request.changelog.map((c, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Discussion / Notes */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Ticket Thread ({comments.length})
          </h4>
          <div className="space-y-2 mb-3">
            {comments.map((cmt, i) => (
              <div key={i} className="p-2.5 bg-surface rounded border border-border text-xs text-text-2">
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-1">
                  <span>Alex (Dev Partner)</span>
                  <span>Verified</span>
                </div>
                {cmt}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add feedback or revision request..."
              className="flex-1 bg-surface border border-border rounded px-3 py-1.5 text-xs text-text outline-none focus:border-primary"
            />
            <Button type="submit" variant="secondary" size="sm">
              Add Note
            </Button>
          </form>
        </div>

        {/* Bottom Approval Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-3 sticky bottom-0 bg-elevated pb-2">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
          >
            Close
          </Button>

          {request.stage !== 'Done' ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleApprove}
              icon={<ShieldCheck className="w-4 h-4" />}
            >
              Approve Changes & Mark Done
            </Button>
          ) : (
            <span className="text-xs font-semibold text-success flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Production Deployed</span>
            </span>
          )}
        </div>
      </div>
    </Drawer>
  );
};
