import React, { Suspense, lazy } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { FloatingBackground } from './components/FloatingBackground';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { CommandPalette } from './components/CommandPalette';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';

// Lazy load views to optimize bundle sizes and speed up dashboard paints
const DashboardView = lazy(() =>
  import('./pages/DashboardView').then((m) => ({ default: m.DashboardView }))
);
const LeadsView = lazy(() =>
  import('./pages/LeadsView').then((m) => ({ default: m.LeadsView }))
);
const ContactsView = lazy(() =>
  import('./pages/ContactsView').then((m) => ({ default: m.ContactsView }))
);
const BookingsView = lazy(() =>
  import('./pages/BookingsView').then((m) => ({ default: m.BookingsView }))
);
const ItinerariesView = lazy(() =>
  import('./pages/ItinerariesView').then((m) => ({ default: m.ItinerariesView }))
);
const ReportsView = lazy(() =>
  import('./pages/ReportsView').then((m) => ({ default: m.ReportsView }))
);
const PlaceholderView = lazy(() =>
  import('./pages/PlaceholderView').then((m) => ({ default: m.PlaceholderView }))
);
const MessagesView = lazy(() =>
  import('./pages/MessagesView').then((m) => ({ default: m.MessagesView }))
);
const CalendarView = lazy(() =>
  import('./components/ui/Calendar').then((m) => ({ default: m.Calendar }))
);
const TasksView = lazy(() =>
  import('./pages/TasksView').then((m) => ({ default: m.TasksView }))
);
const QuotationBuilderView = lazy(() =>
  import('./pages/QuotationBuilderView').then((m) => ({ default: m.QuotationBuilderView }))
);
const PaymentsView = lazy(() =>
  import('./pages/PaymentsView').then((m) => ({ default: m.PaymentsView }))
);
const CarServiceView = lazy(() =>
  import('./pages/CarServiceView').then((m) => ({ default: m.CarServiceView }))
);

// High-fidelity skeletal fallback matching our dashboard structure
const DashboardSkeleton: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="skeleton-box" style={{ width: '30%', height: '1.75rem' }} />
      <div className="skeleton-box" style={{ width: '150px', height: '2rem' }} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton-box" style={{ height: '110px', borderRadius: 'var(--radius-lg)' }} />
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
      <div className="skeleton-box" style={{ height: '240px', borderRadius: 'var(--radius-lg)' }} />
      <div className="skeleton-box" style={{ height: '240px', borderRadius: 'var(--radius-lg)' }} />
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { currentTab } = useNavigation();

  // Dynamic route navigator mapping tab switches to lazy chunks
  const renderActiveView = () => {
    switch (currentTab) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Leads':
        return <LeadsView />;
      case 'Contacts':
        return <ContactsView />;
      case 'Bookings':
        return <BookingsView />;
      case 'Itineraries':
        return <ItinerariesView />;
      case 'Reports':
        return <ReportsView />;
      case 'Calendar':
        // Reuse built calendar component as page layout for structural completeness
        return (
          <div style={{ animation: 'page-enter 0.4s ease-out forwards' }}>
            <h2 className="h1-title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Calendar</h2>
            <CalendarView />
          </div>
        );
      case 'Messages':
        return <MessagesView />;
      case 'Tasks':
        return <TasksView />;
      case 'Quotation Builder':
        return <QuotationBuilderView />;
      case 'Payments':
        return <PaymentsView />;
      case 'Car Service':
        return <CarServiceView />;
      default:
        return <PlaceholderView title={currentTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Floating Travel Vectors Background layer */}
      <FloatingBackground />

      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main shell contents */}
      <div className="main-wrapper">
        <Topbar />
        <main className="content-container">
          <Suspense fallback={<DashboardSkeleton />}>
            {renderActiveView()}
          </Suspense>
        </main>
      </div>

      {/* CMD/Ctrl + K Palette */}
      <CommandPalette />

      {/* HubSpot Assistant Slider Drawer */}
      <AIAssistantDrawer />
    </div>
  );
};

export function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
