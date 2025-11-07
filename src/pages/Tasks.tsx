import { Plus, Clock, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  timeBlock: string;
  completed: boolean;
  category: "work" | "personal" | "wellness";
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Morning meditation", timeBlock: "08:00 - 08:30", completed: true, category: "wellness" },
    { id: 2, title: "Project review", timeBlock: "09:00 - 11:00", completed: true, category: "work" },
    { id: 3, title: "Lunch break (no phone)", timeBlock: "12:00 - 13:00", completed: false, category: "wellness" },
    { id: 4, title: "Deep work session", timeBlock: "14:00 - 16:00", completed: false, category: "work" },
    { id: 5, title: "Exercise", timeBlock: "18:00 - 19:00", completed: false, category: "wellness" },
    { id: 6, title: "Family time", timeBlock: "19:30 - 21:00", completed: false, category: "personal" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const categoryColors = {
    work: "bg-primary/10 text-primary",
    personal: "bg-accent/10 text-accent",
    wellness: "bg-secondary/10 text-secondary"
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Task Schedule
        </h1>
        <p className="text-muted-foreground">
          Time-block your day to reduce digital distractions
        </p>
      </div>

      {/* Progress Card */}
      <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Today's Progress</p>
            <p className="text-3xl font-bold text-foreground">
              {completedCount}/{tasks.length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">tasks completed</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-primary">
              {Math.round((completedCount / tasks.length) * 100)}%
            </div>
          </div>
        </div>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <Card
            key={task.id}
            className={cn(
              "p-4 transition-all hover:shadow-md cursor-pointer",
              task.completed && "opacity-60"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex items-start gap-3">
              <div className="pt-1">
                {task.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-primary fill-current" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-semibold text-foreground mb-1",
                  task.completed && "line-through"
                )}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{task.timeBlock}</span>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    categoryColors[task.category]
                  )}>
                    {task.category}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Task Button */}

      <Button
        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
        onClick={() => {
          const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
          setTasks([
            ...tasks,
            {
              id: newId,
              title: "New Task",
              timeBlock: "00:00 - 00:00",
              completed: false,
              category: "personal"
            }
          ]);
        }}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Task
      </Button>


      {/* Info Card */}
      <Card className="p-5 bg-muted/50">
        <h3 className="font-semibold text-foreground mb-2">📅 Time Blocking Benefits</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Reduces decision fatigue</li>
          <li>• Prevents mindless phone usage</li>
          <li>• Increases productivity by 40%</li>
          <li>• Creates healthy digital boundaries</li>
        </ul>
      </Card>
    </div>
  );
};

export default Tasks;
