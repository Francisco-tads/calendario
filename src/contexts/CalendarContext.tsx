
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
  // Feriados brasileiros e datas comemorativas para 2025
  const [events, setEvents] = useState<CalendarEvent[]>([
    // Feriados nacionais 2025
    {
      id: 'feriado-1',
      title: 'Confraternização Universal',
      description: 'Feriado nacional',
      date: new Date(2025, 0, 1).toISOString(), // Janeiro 1
      type: 'holiday',
    },
    {
      id: 'feriado-2',
      title: 'Carnaval',
      description: 'Feriado nacional',
      date: new Date(2025, 2, 3).toISOString(), // Março 3
      type: 'holiday',
    },
    {
      id: 'feriado-3',
      title: 'Carnaval',
      description: 'Feriado nacional',
      date: new Date(2025, 2, 4).toISOString(), // Março 4
      type: 'holiday',
    },
    {
      id: 'feriado-4',
      title: 'Sexta-feira Santa',
      description: 'Feriado nacional',
      date: new Date(2025, 3, 18).toISOString(), // Abril 18
      type: 'holiday',
    },
    {
      id: 'feriado-5',
      title: 'Tiradentes',
      description: 'Feriado nacional',
      date: new Date(2025, 3, 21).toISOString(), // Abril 21
      type: 'holiday',
    },
    {
      id: 'feriado-6',
      title: 'Dia do Trabalhador',
      description: 'Feriado nacional',
      date: new Date(2025, 4, 1).toISOString(), // Maio 1
      type: 'holiday',
    },
    {
      id: 'feriado-7',
      title: 'Corpus Christi',
      description: 'Feriado nacional',
      date: new Date(2025, 5, 19).toISOString(), // Junho 19
      type: 'holiday',
    },
    {
      id: 'feriado-8',
      title: 'Independência do Brasil',
      description: 'Feriado nacional',
      date: new Date(2025, 8, 7).toISOString(), // Setembro 7
      type: 'holiday',
    },
    {
      id: 'feriado-9',
      title: 'Nossa Senhora Aparecida',
      description: 'Feriado nacional',
      date: new Date(2025, 9, 12).toISOString(), // Outubro 12
      type: 'holiday',
    },
    {
      id: 'feriado-10',
      title: 'Finados',
      description: 'Feriado nacional',
      date: new Date(2025, 10, 2).toISOString(), // Novembro 2
      type: 'holiday',
    },
    {
      id: 'feriado-11',
      title: 'Proclamação da República',
      description: 'Feriado nacional',
      date: new Date(2025, 10, 15).toISOString(), // Novembro 15
      type: 'holiday',
    },
    {
      id: 'feriado-12',
      title: 'Natal',
      description: 'Feriado nacional',
      date: new Date(2025, 11, 25).toISOString(), // Dezembro 25
      type: 'holiday',
    },
    // Datas comemorativas
    {
      id: 'comemorativa-1',
      title: 'Dia dos Namorados',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 12).toISOString(), // Junho 12
      type: 'commemorative',
    },
    {
      id: 'comemorativa-2',
      title: 'Início do Inverno',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 21).toISOString(), // Junho 21
      type: 'commemorative',
    },
    {
      id: 'comemorativa-3',
      title: 'Dia de São João',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 24).toISOString(), // Junho 24
      type: 'commemorative',
    },
    {
      id: 'comemorativa-4',
      title: 'Dia das Mães',
      description: 'Data comemorativa',
      date: new Date(2025, 4, 11).toISOString(), // Maio 11 (segundo domingo)
      type: 'commemorative',
    },
    {
      id: 'comemorativa-5',
      title: 'Dia dos Pais',
      description: 'Data comemorativa',
      date: new Date(2025, 7, 10).toISOString(), // Agosto 10 (segundo domingo)
      type: 'commemorative',
    },
    {
      id: 'comemorativa-6',
      title: 'Dia das Crianças',
      description: 'Data comemorativa',
      date: new Date(2025, 9, 12).toISOString(), // Outubro 12
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
