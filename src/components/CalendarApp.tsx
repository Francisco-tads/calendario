
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Menu, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CalendarView from './CalendarView';
import EventList from './EventList';
import FilterPanel from './FilterPanel';
import AddEventDialog from './AddEventDialog';
import BottomNavigation from './BottomNavigation';
import { CalendarProvider } from '../contexts/CalendarContext';

const CalendarApp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <CalendarProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <FilterPanel />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold capitalize">
              {formatMonthYear(selectedDate)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedDate(new Date())}
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 space-y-4">
          {/* Calendar */}
          <Card>
            <CardContent className="p-4">
              <CalendarView 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </CardContent>
          </Card>

          {/* Events for Selected Date */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  day: 'numeric',
                  month: 'long',
                  weekday: 'long'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EventList selectedDate={selectedDate} />
              
              {/* Add Event Button */}
              <Button
                className="w-full mt-4"
                onClick={() => setShowAddEvent(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Clique para adicionar um evento
              </Button>
            </CardContent>
          </Card>
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />

        {/* Add Event Dialog */}
        <AddEventDialog
          open={showAddEvent}
          onOpenChange={setShowAddEvent}
        />
      </div>
    </CalendarProvider>
  );
};

export default CalendarApp;
