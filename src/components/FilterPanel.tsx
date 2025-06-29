
import React from 'react';
import { Calendar, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useCalendar } from '../contexts/CalendarContext';

const FilterPanel = () => {
  const { filters, updateFilters } = useCalendar();
  
  return (
    <div className="space-y-6 pt-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Agenda</h2>
        
        <div className="space-y-2">
          <Button variant="default" className="w-full justify-start">
            <Calendar className="h-4 w-4 mr-3" />
            Calendário Mensal
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <List className="h-4 w-4 mr-3" />
            Agenda
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Grid3X3 className="h-4 w-4 mr-3" />
            Calendário Anual
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-base font-medium mb-4">Mostrar no calendário</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="holidays"
              checked={filters.showHolidays}
              onCheckedChange={(checked) => 
                updateFilters({ showHolidays: !!checked })
              }
            />
            <label
              htmlFor="holidays"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Feriados nacionais
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="commemorative"
              checked={filters.showCommemorativeDates}
              onCheckedChange={(checked) => 
                updateFilters({ showCommemorativeDates: !!checked })
              }
            />
            <label
              htmlFor="commemorative"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Datas comemorativas
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="events"
              checked={filters.showEvents}
              onCheckedChange={(checked) => 
                updateFilters({ showEvents: !!checked })
              }
            />
            <label
              htmlFor="events"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eventos
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <Checkbox
              id="tasks"
              checked={filters.showTasks}
              onCheckedChange={(checked) => 
                updateFilters({ showTasks: !!checked })
              }
            />
            <label
              htmlFor="tasks"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Tarefas
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
