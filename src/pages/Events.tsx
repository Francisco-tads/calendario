
import React, { useState } from 'react';
import { CalendarDays, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import AddEventDialog from '../components/AddEventDialog';
import { useCalendar } from '../contexts/CalendarContext';

const Events = () => {
  const navigate = useNavigate();
  const [showAddEvent, setShowAddEvent] = useState(false);
  const { events, filters } = useCalendar();

  // Filtrar apenas os eventos personalizados
  const customEvents = events.filter(event => event.type === 'event' && filters.showEvents);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Eventos</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowAddEvent(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Seus Eventos ({customEvents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {customEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum evento personalizado adicionado ainda</p>
                <p className="text-sm mt-2">Toque no botão + para criar seu primeiro evento</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customEvents.map((event) => (
                  <div key={event.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {event.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            {new Date(event.date).toLocaleDateString('pt-BR')}
                          </span>
                          {event.time && <span>{event.time}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
  );
};

export default Events;
