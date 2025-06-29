
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string;
  time?: string;
  type: 'holiday' | 'commemorative' | 'event' | 'task';
}

interface CalendarFilters {
  showHolidays: boolean;
  showCommemorativeDates: boolean;
  showEvents: boolean;
  showTasks: boolean;
}

interface CalendarContextType {
  events: CalendarEvent[];
  filters: CalendarFilters;
  addEvent: (event: CalendarEvent) => void;
  updateFilters: (newFilters: Partial<CalendarFilters>) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
  // Sample events data - in a real app, this would come from an API
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Dia dos Namorados',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 12).toISOString(), // June 12, 2025
      type: 'commemorative',
    },
    {
      id: '2',
      title: 'Corpus Christi',
      description: 'Feriado nacional',
      date: new Date(2025, 5, 19).toISOString(), // June 19, 2025
      type: 'holiday',
    },
    {
      id: '3',
      title: 'Início do Inverno',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 21).toISOString(), // June 21, 2025
      type: 'commemorative',
    },
    {
      id: '4',
      title: 'Dia de São João',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 24).toISOString(), // June 24, 2025
      type: 'commemorative',
    },
  ]);
  
  const [filters, setFilters] = useState<CalendarFilters>({
    showHolidays: true,
    showCommemorativeDates: true,
    showEvents: true,
    showTasks: true,
  });
  
  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  };
  
  const updateFilters = (newFilters: Partial<CalendarFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  return (
    <CalendarContext.Provider
      value={{
        events,
        filters,
        addEvent,
        updateFilters,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
