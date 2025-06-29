
import React, { useState } from 'react';
import { CheckSquare, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import AddTaskDialog from '../components/AddTaskDialog';
import { useCalendar } from '../contexts/CalendarContext';

const Tasks = () => {
  const navigate = useNavigate();
  const [showAddTask, setShowAddTask] = useState(false);
  const { events, filters } = useCalendar();

  // Filtrar apenas as tarefas
  const tasks = events.filter(event => event.type === 'task' && filters.showTasks);

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
          <h1 className="text-xl font-semibold">Tarefas</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowAddTask(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Suas Tarefas ({tasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma tarefa adicionada ainda</p>
                <p className="text-sm mt-2">Toque no botão + para criar sua primeira tarefa</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{task.title}</h3>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            {new Date(task.date).toLocaleDateString('pt-BR')}
                          </span>
                          {task.time && <span>{task.time}</span>}
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

      {/* Add Task Dialog */}
      <AddTaskDialog
        open={showAddTask}
        onOpenChange={setShowAddTask}
      />
    </div>
  );
};

export default Tasks;
