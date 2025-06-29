
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useCalendar } from '../contexts/CalendarContext';

interface EventListProps {
  selectedDate: Date;
}

const EventList: React.FC<EventListProps> = ({ selectedDate }) => {
  const { events, filters } = useCalendar();
  
  const getEventsForDate = () => {
    const dateStr = selectedDate.toDateString();
    return events.filter(event => {
      const eventDate = new Date(event.date).toDateString();
      const matchesDate = eventDate === dateStr;
      
      if (!matchesDate) return false;
      
      // Apply filters
      if (event.type === 'holiday') return filters.showHolidays;
      if (event.type === 'commemorative') return filters.showCommemorativeDates;
      if (event.type === 'event') return filters.showEvents;
      if (event.type === 'task') return filters.showTasks;
      
      return true;
    });
  };
  
  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'holiday': return 'Feriado nacional';
      case 'commemorative': return 'Data comemorativa';
      case 'event': return 'Evento';
      case 'task': return 'Tarefa';
      default: return '';
    }
  };
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'holiday': return 'destructive';
      case 'commemorative': return 'default';
      case 'event': return 'default';
      case 'task': return 'secondary';
      default: return 'default';
    }
  };
  
  const dayEvents = getEventsForDate();
  
  if (dayEvents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum evento para este dia
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {dayEvents.map((event, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors cursor-pointer"
        >
          <div 
            className={`w-1 h-12 rounded-full ${
              event.type === 'holiday' ? 'bg-red-500' : 
              event.type === 'commemorative' ? 'bg-green-500' : 
              'bg-blue-500'
            }`}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {event.description || getEventTypeLabel(event.type)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant={getEventTypeColor(event.type) as any}
                className="text-xs"
              >
                {getEventTypeLabel(event.type)}
              </Badge>
              {event.time && (
                <span className="text-xs text-muted-foreground">
                  {event.time}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
