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
      date: new Date(2025, 0, 1).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-2',
      title: 'Carnaval',
      description: 'Feriado nacional',
      date: new Date(2025, 2, 3).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-3',
      title: 'Carnaval',
      description: 'Feriado nacional',
      date: new Date(2025, 2, 4).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-4',
      title: 'Sexta-feira Santa',
      description: 'Feriado nacional',
      date: new Date(2025, 3, 18).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-5',
      title: 'Tiradentes',
      description: 'Feriado nacional',
      date: new Date(2025, 3, 21).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-6',
      title: 'Dia do Trabalhador',
      description: 'Feriado nacional',
      date: new Date(2025, 4, 1).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-7',
      title: 'Corpus Christi',
      description: 'Feriado nacional',
      date: new Date(2025, 5, 19).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-8',
      title: 'Revolução Constitucionalista',
      description: 'Feriado estadual - São Paulo',
      date: new Date(2025, 6, 9).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-9',
      title: 'Independência do Brasil',
      description: 'Feriado nacional',
      date: new Date(2025, 8, 7).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-10',
      title: 'Nossa Senhora Aparecida',
      description: 'Feriado nacional',
      date: new Date(2025, 9, 12).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-11',
      title: 'Finados',
      description: 'Feriado nacional',
      date: new Date(2025, 10, 2).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-12',
      title: 'Proclamação da República',
      description: 'Feriado nacional',
      date: new Date(2025, 10, 15).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-13',
      title: 'Consciência Negra',
      description: 'Feriado nacional',
      date: new Date(2025, 10, 20).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-14',
      title: 'Natal',
      description: 'Feriado nacional',
      date: new Date(2025, 11, 25).toISOString(),
      type: 'holiday',
    },
    // Feriados específicos do Piauí
    {
      id: 'feriado-piaui-1',
      title: 'Dia da Batalha do Jenipapo',
      description: 'Feriado estadual - Piauí',
      date: new Date(2025, 2, 13).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-piaui-2',
      title: 'Dia de Nossa Senhora das Mercês',
      description: 'Feriado estadual - Piauí',
      date: new Date(2025, 8, 24).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-piaui-3',
      title: 'Dia da Criação do Estado do Piauí',
      description: 'Feriado estadual - Piauí',
      date: new Date(2025, 9, 19).toISOString(),
      type: 'holiday',
    },
    // Feriados estaduais adicionais
    {
      id: 'feriado-15',
      title: 'Morte de Zumbi dos Palmares',
      description: 'Feriado estadual - Alagoas',
      date: new Date(2025, 10, 29).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-16',
      title: 'São Jorge',
      description: 'Feriado estadual - Rio de Janeiro',
      date: new Date(2025, 3, 23).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-17',
      title: 'Dia de São João',
      description: 'Feriado em alguns estados do Nordeste',
      date: new Date(2025, 5, 24).toISOString(),
      type: 'holiday',
    },
    {
      id: 'feriado-18',
      title: 'São Pedro',
      description: 'Feriado em alguns estados do Nordeste',
      date: new Date(2025, 5, 29).toISOString(),
      type: 'holiday',
    },
    // Datas comemorativas
    {
      id: 'comemorativa-1',
      title: 'Dia dos Namorados',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 12).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-2',
      title: 'Início do Inverno',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 21).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-3',
      title: 'Dia das Mães',
      description: 'Data comemorativa',
      date: new Date(2025, 4, 11).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-4',
      title: 'Dia dos Pais',
      description: 'Data comemorativa',
      date: new Date(2025, 7, 10).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-5',
      title: 'Dia das Crianças',
      description: 'Data comemorativa',
      date: new Date(2025, 9, 12).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-6',
      title: 'Festa Junina',
      description: 'Data comemorativa',
      date: new Date(2025, 5, 23).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-7',
      title: 'Dia da Independência dos EUA',
      description: 'Data comemorativa internacional',
      date: new Date(2025, 6, 4).toISOString(),
      type: 'commemorative',
    },
    {
      id: 'comemorativa-8',
      title: 'Halloween',
      description: 'Data comemorativa internacional',
      date: new Date(2025, 9, 31).toISOString(),
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
