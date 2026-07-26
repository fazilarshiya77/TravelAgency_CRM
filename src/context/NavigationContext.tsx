import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type TabName =
  | 'Dashboard'
  | 'Leads'
  | 'Contacts'
  | 'Bookings'
  | 'Itineraries'
  | 'Calendar'
  | 'Reports'
  | 'Tasks'
  | 'Messages'
  | 'Quotation Builder'
  | 'Payments'
  | 'Car Service';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'danger';
}

interface NavigationContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentTab: TabName;
  setCurrentTab: (tab: TabName) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  aiAssistantOpen: boolean;
  setAiAssistantOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  triggerAICommand: (promptText: string) => void;
  aiPromptInput: string;
  setAiPromptInput: (input: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentTab, setCurrentTabState] = useState<TabName>('Dashboard');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState('');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'High-Value Lead Identified',
      description: 'AI detected a booking probability of 87% for luxury Safari Package.',
      time: '3m ago',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: 'Itinerary Conflict Detected',
      description: 'Flight check-in time overlaps with tour excursion in Florence.',
      time: '1h ago',
      read: false,
      type: 'warning',
    },
    {
      id: '3',
      title: 'Revenue Milestone Reached',
      description: 'Monthly agency sales target exceeded by 14%.',
      time: '4h ago',
      read: true,
      type: 'info',
    },
  ]);

  const setCurrentTab = (tab: TabName) => {
    setCurrentTabState(tab);
    // Close other overlays on navigation
    setCommandPaletteOpen(false);
    setNotificationsOpen(false);
  };

  const triggerAICommand = (promptText: string) => {
    setAiPromptInput(promptText);
    setAiAssistantOpen(true);
    setCommandPaletteOpen(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentTab,
        setCurrentTab,
        commandPaletteOpen,
        setCommandPaletteOpen,
        aiAssistantOpen,
        setAiAssistantOpen,
        searchQuery,
        setSearchQuery,
        notifications,
        setNotifications,
        notificationsOpen,
        setNotificationsOpen,
        triggerAICommand,
        aiPromptInput,
        setAiPromptInput,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
