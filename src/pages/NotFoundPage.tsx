import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { brand } from '../config/brand';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-sm bg-primary text-white flex items-center justify-center font-display font-medium text-xl mb-4">
        N
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent mb-2">
        Error 404 · Route Not Found
      </span>

      <h1 className="font-display text-3xl sm:text-4xl font-medium text-text mb-3">
        Page Not in Snapshot
      </h1>

      <p className="text-sm text-text-2 max-w-sm leading-relaxed mb-8">
        The route you requested isn&apos;t mapped in this interactive demo. You can return to the agency studio landing or explore the Partner Console.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/">
          <Button variant="primary" size="md" icon={<Home className="w-4 h-4" />}>
            Return Home
          </Button>
        </Link>
        <Link to="/console">
          <Button variant="secondary" size="md" icon={<Compass className="w-4 h-4" />}>
            Open Partner Console
          </Button>
        </Link>
      </div>
    </div>
  );
};
