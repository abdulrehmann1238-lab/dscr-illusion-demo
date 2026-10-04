import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ConsoleShell } from './components/console/ConsoleShell';
import { Skeleton } from './components/ui/Skeleton';

// Lazy loaded page components per PRD §19 & §23
const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage }))
);
const CaseDetailPage = lazy(() =>
  import('./pages/CaseDetailPage').then((m) => ({ default: m.CaseDetailPage }))
);
const ProcessPage = lazy(() =>
  import('./pages/ProcessPage').then((m) => ({ default: m.ProcessPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

// Console pages
const OverviewPage = lazy(() =>
  import('./pages/console/OverviewPage').then((m) => ({ default: m.OverviewPage }))
);
const ClientsPage = lazy(() =>
  import('./pages/console/ClientsPage').then((m) => ({ default: m.ClientsPage }))
);
const ClientDetailPage = lazy(() =>
  import('./pages/console/ClientDetailPage').then((m) => ({ default: m.ClientDetailPage }))
);
const DeployWizardPage = lazy(() =>
  import('./pages/console/DeployWizardPage').then((m) => ({ default: m.DeployWizardPage }))
);
const SnapshotsPage = lazy(() =>
  import('./pages/console/SnapshotsPage').then((m) => ({ default: m.SnapshotsPage }))
);
const WorkflowsPage = lazy(() =>
  import('./pages/console/WorkflowsPage').then((m) => ({ default: m.WorkflowsPage }))
);
const IntegrationsPage = lazy(() =>
  import('./pages/console/IntegrationsPage').then((m) => ({ default: m.IntegrationsPage }))
);
const MaintenancePage = lazy(() =>
  import('./pages/console/MaintenancePage').then((m) => ({ default: m.MaintenancePage }))
);
const GrowthPage = lazy(() =>
  import('./pages/console/GrowthPage').then((m) => ({ default: m.GrowthPage }))
);

// Sample site page
const SampleSitePage = lazy(() =>
  import('./pages/site/SampleSitePage').then((m) => ({ default: m.SampleSitePage }))
);

// Not found
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

const PageFallback: React.FC = () => (
  <div className="p-8 max-w-4xl mx-auto space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-96" />
    <Skeleton className="h-64 w-full" />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Studio Public Site */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<CaseDetailPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Sample Client Site (Ridgeline Plumbing) */}
        <Route path="/demo/site/ridgeline-plumbing" element={<SampleSitePage />} />
        <Route
          path="/demo/site/ridgeline-plumbing/*"
          element={<Navigate to="/demo/site/ridgeline-plumbing" replace />}
        />

        {/* Partner Console App Shell & Sub-Routes */}
        <Route path="/console" element={<ConsoleShell />}>
          <Route index element={<OverviewPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/:id" element={<ClientDetailPage />} />
          <Route path="deploy" element={<DeployWizardPage />} />
          <Route path="snapshots" element={<SnapshotsPage />} />
          <Route path="workflows" element={<WorkflowsPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="growth" element={<GrowthPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
