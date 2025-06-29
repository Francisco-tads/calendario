
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCalendar } from '../contexts/CalendarContext';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, onDateSelect }) => {
  const { events, filters } = useCalendar();
  
  const today = new Date();
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const daysInMonth = lastDayOfMonth.getDate();
  
  const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth + (direction === 'next' ? 1 : -1));
    onDateSelect(newDate);
  };
  
  const getDaysToShow = () => {
    const days = [];
    
    // Previous month days
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(currentYear, currentMonth, day),
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const totalCells = Math.ceil(days.length / 7) * 7;
    const remainingCells = totalCells - days.length;
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, day),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return events.filter(event => {
      const eventDate = new Date(event.date).toDateString();
      return eventDate === dateStr;
    });
  };
  
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {selectedDate.toLocaleDateString('pt-BR', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateMonth('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
        {weekDays.map(day => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="calendar-grid">
        {getDaysToShow().map((dayInfo, index) => {
          const dayEvents = getEventsForDate(dayInfo.date);
          const visibleEvents = dayEvents.filter(event => {
            if (event.type === 'holiday') return filters.showHolidays;
            if (event.type === 'commemorative') return filters.showCommemorativeDates;
            if (event.type === 'event') return filters.showEvents;
            if (event.type === 'task') return filters.showTasks;
            return true;
          });
          
          return (
            <div
              key={index}
              className={`calendar-day cursor-pointer transition-colors hover:bg-accent/50 ${
                isToday(dayInfo.date) ? 'today' : ''
              } ${
                isSelected(dayInfo.date) ? 'selected' : ''
              } ${
                !dayInfo.isCurrentMonth ? 'opacity-40' : ''
              }`}
              onClick={() => onDateSelect(dayInfo.date)}
            >
              <span className="calendar-day-number">
                {dayInfo.date.getDate()}
              </span>
              
              {/* Event dots */}
              <div className="absolute bottom-1 left-1 flex gap-1">
                {visibleEvents.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`event-dot ${event.type}`}
                  />
                ))}
                {visibleEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{visibleEvents.length - 3}
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

export default CalendarView;
