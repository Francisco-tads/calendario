
import React from 'react';
import { CheckSquare, Calendar, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        <Button
          variant="ghost"
          className="flex-1 flex flex-col items-center gap-1 py-3 h-auto"
        >
          <CheckSquare className="h-5 w-5" />
          <span className="text-xs">Tarefas</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex-1 flex flex-col items-center gap-1 py-3 h-auto bg-primary/10 text-primary"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs">Calendário</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex-1 flex flex-col items-center gap-1 py-3 h-auto"
        >
          <CalendarDays className="h-5 w-5" />
          <span className="text-xs">Eventos</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
