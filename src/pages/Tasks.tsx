import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Calendar, Clock, AlertCircle } from 'lucide-react';
import { api, Task } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { format, formatDistanceToNow, isPast } from 'date-fns';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    
    // Refresh tasks every minute to update overdue status
    const interval = setInterval(fetchTasks, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskDeadline) return;

    const deadlineDate = new Date(newTaskDeadline);
    const now = new Date();

    if (deadlineDate <= now) {
      toast({
        title: 'Invalid deadline',
        description: 'Deadline must be in the future.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const task = await api.createTask(newTaskTitle, deadlineDate.toISOString());
      setTasks([...tasks, task]);
      setNewTaskTitle('');
      setNewTaskDeadline('');

      toast({
        title: 'Task added',
        description: `"${task.title}" is due ${formatDistanceToNow(deadlineDate, { addSuffix: true })}`
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updated = await api.updateTask(task._id!, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === updated._id ? updated : t));
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleDeleteTask = async (id: string, title: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      toast({
        title: 'Task deleted',
        description: `"${title}" has been removed.`
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const completedTasks = tasks.filter(t => t.completed);
  const overdueTasks = tasks.filter(t => !t.completed && t.isOverdue);
  const upcomingTasks = tasks.filter(t => !t.completed && !t.isOverdue);

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

  const getDeadlineStatus = (task: Task) => {
    if (task.completed) return 'completed';
    if (task.isOverdue) return 'overdue';
    
    const deadline = new Date(task.deadline);
    const now = new Date();
    const hoursUntil = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (hoursUntil < 24) return 'urgent';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'overdue': return 'text-red-600';
      case 'urgent': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <p className="text-muted-foreground">Track tasks with deadlines</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTask} className="space-y-3">
            <Input
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              required
            />
            <div className="flex gap-3">
              <Input
                type="datetime-local"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
                min={getMinDateTime()}
                required
                className="flex-1"
              />
              <Button type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{upcomingTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{overdueTasks.length}</div>
          </CardContent>
        </Card>
      </div>

      {overdueTasks.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Overdue Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTask}
                  status={getDeadlineStatus(task)}
                  statusColor={getStatusColor(getDeadlineStatus(task))}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No tasks yet. Add one above!</p>
          ) : (
            <div className="space-y-3">
              {tasks
                .sort((a, b) => {
                  if (a.completed !== b.completed) return a.completed ? 1 : -1;
                  return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                })
                .map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    status={getDeadlineStatus(task)}
                    statusColor={getStatusColor(getDeadlineStatus(task))}
                  />
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string, title: string) => void;
  status: string;
  statusColor: string;
}

const TaskItem = ({ task, onToggle, onDelete, status, statusColor }: TaskItemProps) => {
  const deadline = new Date(task.deadline);
  const isPastDeadline = isPast(deadline) && !task.completed;

  return (
    <div
      className={`flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors ${
        isPastDeadline ? 'border-red-300 bg-red-50/50' : ''
      }`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task)}
        className="mt-1"
      />
      <div className="flex-1 min-w-0">
        <p className={task.completed ? 'line-through text-muted-foreground' : 'font-medium'}>
          {task.title}
        </p>
        <div className="flex items-center gap-3 mt-1 text-sm flex-wrap">
          <span className={`flex items-center gap-1 ${statusColor}`}>
            <Calendar className="w-3 h-3" />
            {format(deadline, 'MMM dd, yyyy')}
          </span>
          <span className={`flex items-center gap-1 ${statusColor}`}>
            <Clock className="w-3 h-3" />
            {format(deadline, 'hh:mm a')}
          </span>
          {!task.completed && (
            <span className={`text-xs ${statusColor} font-medium`}>
              {isPastDeadline
                ? `Overdue by ${formatDistanceToNow(deadline)}`
                : formatDistanceToNow(deadline, { addSuffix: true })}
            </span>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task._id!, task.title)}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  );
};

export default Tasks;
