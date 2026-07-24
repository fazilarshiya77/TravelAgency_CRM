import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { Input, Select } from '../components/ui/Input';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  User,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  client: string;
  completed: boolean;
  category: 'inquiry' | 'booking' | 'document' | 'payment';
}

const initialSeedTasks: TaskItem[] = [
  {
    id: 'TSK-101',
    title: 'Submit Amit Sharma Schengen Visa application details',
    dueDate: '2026-07-24', // Today
    priority: 'high',
    assignee: 'Sophia Loren',
    client: 'Amit Sharma',
    completed: false,
    category: 'document',
  },
  {
    id: 'TSK-102',
    title: 'Verify Priya Patel Kyoto Tea Ceremony booking confirmation',
    dueDate: '2026-07-25', // Tomorrow
    priority: 'medium',
    assignee: 'Sophia Loren',
    client: 'Priya Patel',
    completed: false,
    category: 'booking',
  },
  {
    id: 'TSK-103',
    title: 'Issue Rajesh Iyer outbound flight ticket voucher',
    dueDate: '2026-07-27',
    priority: 'high',
    assignee: 'Liam Neeson',
    client: 'Rajesh Iyer',
    completed: false,
    category: 'booking',
  },
  {
    id: 'TSK-104',
    title: 'Assign local mountain guide for Vikram Malhotra Alps trek',
    dueDate: '2026-07-29',
    priority: 'low',
    assignee: 'Emma Watson',
    client: 'Vikram Malhotra',
    completed: true,
    category: 'booking',
  },
  {
    id: 'TSK-105',
    title: 'Dispatch Ananya Sen Catamaran balance payment link',
    dueDate: '2026-07-31',
    priority: 'medium',
    assignee: 'Emma Watson',
    client: 'Ananya Sen',
    completed: false,
    category: 'payment',
  },
];

export const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newAssignee, setNewAssignee] = useState('Sophia Loren');
  const [newClient, setNewClient] = useState('');
  const [newCategory, setNewCategory] = useState<TaskItem['category']>('booking');

  useEffect(() => {
    const fetchTasks = async () => {
      if (!supabase) {
        console.warn('Supabase not configured. Running in mock local state mode.');
        setTasks(initialSeedTasks);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('due_date', { ascending: true });

        if (error) {
          console.error('Error fetching tasks from Supabase:', error);
        } else if (data && data.length > 0) {
          setTasks(data.map(item => ({
            id: item.id,
            title: item.title,
            dueDate: item.due_date,
            priority: item.priority,
            assignee: item.assignee,
            client: item.client,
            completed: item.completed,
            category: item.category,
          })));
        } else {
          // If remote db has no records, seed it with the default list
          const { error: seedError } = await supabase
            .from('tasks')
            .insert(
              initialSeedTasks.map(t => ({
                id: t.id,
                title: t.title,
                due_date: t.dueDate,
                priority: t.priority,
                assignee: t.assignee,
                client: t.client,
                completed: t.completed,
                category: t.category,
              }))
            );
          if (!seedError) {
            setTasks(initialSeedTasks);
          }
        }
      } catch (err) {
        console.error('Fetch task execution exception:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleComplete = async (taskId: string) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );

    if (!supabase) return;

    const { error } = await supabase
      .from('tasks')
      .update({ completed: !taskToUpdate.completed })
      .eq('id', taskId);

    if (error) {
      console.error('Error toggling task completion in Supabase:', error);
      // Revert if error
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed: taskToUpdate.completed } : t))
      );
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const originalTasks = [...tasks];
      setTasks((prev) => prev.filter((t) => t.id !== taskId));

      if (!supabase) return;

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        console.error('Error deleting task from Supabase:', error);
        setTasks(originalTasks);
      }
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const generatedId = `TSK-${100 + Date.now().toString().substring(10)}`;
    const newTask: TaskItem = {
      id: generatedId,
      title: newTitle,
      dueDate: newDueDate || new Date().toISOString().substring(0, 10),
      priority: newPriority,
      assignee: newAssignee,
      client: newClient || 'General',
      completed: false,
      category: newCategory,
    };

    // Optimistic UI updates
    setTasks((prev) => [newTask, ...prev]);
    setIsAddOpen(false);
    setNewTitle('');
    setNewDueDate('');
    setNewPriority('medium');
    setNewClient('');

    if (!supabase) return;

    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          id: generatedId,
          title: newTitle,
          due_date: newDueDate || new Date().toISOString().substring(0, 10),
          priority: newPriority,
          assignee: newAssignee,
          client: newClient || 'General',
          completed: false,
          category: newCategory,
        },
      ]);

    if (error) {
      console.error('Error adding task to Supabase:', error);
      // Revert
      setTasks((prev) => prev.filter((t) => t.id !== generatedId));
      alert('Failed to save task to Supabase: ' + error.message);
    }
  };

  const getPriorityColor = (prio: TaskItem['priority']): 'danger' | 'peach' | 'mint' => {
    switch (prio) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'peach';
      case 'low':
      default:
        return 'mint';
    }
  };

  // Grouped tasks calculation
  const todayStr = '2026-07-24';
  
  const getTaskStatus = (task: TaskItem) => {
    if (task.completed) return 'completed';
    if (task.dueDate < todayStr) return 'overdue';
    if (task.dueDate === todayStr) return 'today';
    return 'upcoming';
  };

  const overdueTasks = tasks.filter((t) => getTaskStatus(t) === 'overdue');
  const todayTasks = tasks.filter((t) => getTaskStatus(t) === 'today');
  const upcomingTasks = tasks.filter((t) => getTaskStatus(t) === 'upcoming');
  const completedTasks = tasks.filter((t) => getTaskStatus(t) === 'completed');

  const totalPending = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <style>{`
          @keyframes custom-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-light)', borderTopColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'custom-spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Syncing with Supabase Live Database...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Upcoming Tasks Hub</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Monitor, assign, and execute core operations tasks for pending and confirmed itineraries.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddOpen(true)}>
          Add Task
        </Button>
      </div>

      {/* Task Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Total Tasks</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {tasks.length}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>All checklist nodes tracked</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Awaiting Completion</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-peach-dark)', marginTop: '4px' }}>
            {totalPending} Tasks
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Pending agent updates</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Completed Tasks</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px' }}>
            {completedCount} Tasks
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Successfully checked off</span>
        </div>
      </div>

      {/* Task Layout columns */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Overdue Section */}
        {overdueTasks.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--color-danger)' }}>
              <AlertCircle className="w-5 h-5" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Overdue Tasks ({overdueTasks.length})</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {overdueTasks.map((t) => (
                <TaskCard key={t.id} task={t} onToggle={handleToggleComplete} onDelete={handleDeleteTask} prioColor={getPriorityColor(t.priority)} />
              ))}
            </div>
          </div>
        )}

        {/* Today Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--color-secondary)' }}>
            <Calendar className="w-5 h-5" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Today ({todayTasks.length})</h3>
          </div>
          {todayTasks.length === 0 ? (
            <Card style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No tasks scheduled for today. Great job!
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {todayTasks.map((t) => (
                <TaskCard key={t.id} task={t} onToggle={handleToggleComplete} onDelete={handleDeleteTask} prioColor={getPriorityColor(t.priority)} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            <TrendingUp className="w-5 h-5" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Upcoming ({upcomingTasks.length})</h3>
          </div>
          {upcomingTasks.length === 0 ? (
            <Card style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No upcoming tasks listed.
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {upcomingTasks.map((t) => (
                <TaskCard key={t.id} task={t} onToggle={handleToggleComplete} onDelete={handleDeleteTask} prioColor={getPriorityColor(t.priority)} />
              ))}
            </div>
          )}
        </div>

        {/* Completed Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--color-success)' }}>
            <CheckCircle2 className="w-5 h-5" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Completed ({completedTasks.length})</h3>
          </div>
          {completedTasks.length === 0 ? (
            <Card style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No completed tasks found in current archive.
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: 0.7 }}>
              {completedTasks.map((t) => (
                <TaskCard key={t.id} task={t} onToggle={handleToggleComplete} onDelete={handleDeleteTask} prioColor={getPriorityColor(t.priority)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QUICK ADD MODAL */}
      {isAddOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.3)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <Card style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'page-enter 0.25s ease-out forwards' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Add New Operations Task</h3>
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Task Action Details</label>
                <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Schedule airport pickups for client" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Due Date</label>
                  <Input type="date" value={newDueDate} onChange={(e) => setNewDueDate(e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Priority</label>
                  <Select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    options={[
                      { value: 'high', label: 'High Priority' },
                      { value: 'medium', label: 'Medium Priority' },
                      { value: 'low', label: 'Low Priority' },
                    ]}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Client Profile</label>
                  <Input value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="e.g. Amit Sharma" />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Assignee Agent</label>
                  <Select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    options={[
                      { value: 'Sophia Loren', label: 'Sophia Loren' },
                      { value: 'Liam Neeson', label: 'Liam Neeson' },
                      { value: 'Emma Watson', label: 'Emma Watson' },
                      { value: 'Fazil Arshiya', label: 'Fazil Arshiya' },
                    ]}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</label>
                <Select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  options={[
                    { value: 'booking', label: 'Reservation/Booking' },
                    { value: 'document', label: 'Documentation/Visa' },
                    { value: 'payment', label: 'Invoices/Payments' },
                    { value: 'inquiry', label: 'Initial Inquiry' },
                  ]}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Create Task</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

interface TaskCardProps {
  task: TaskItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  prioColor: 'danger' | 'peach' | 'mint';
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete, prioColor }) => {
  return (
    <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', gap: '1rem', borderLeft: `4px solid var(--color-${prioColor})` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        <button onClick={() => onToggle(task.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', color: task.completed ? 'var(--color-success)' : 'var(--text-tertiary)' }}>
          {task.completed ? <CheckSquare className="w-5 h-5 text-emerald-500" /> : <Square className="w-5 h-5" />}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {task.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User className="w-3.5 h-3.5 text-slate-400" />
              Agent: {task.assignee}
            </span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>•</span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Client: {task.client}</span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>•</span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Due: {task.dueDate}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Tag colorway={prioColor}>{task.priority.toUpperCase()}</Tag>
        <Tag colorway="soft-blue">{task.category.toUpperCase()}</Tag>
        <button onClick={() => onDelete(task.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px', color: 'var(--text-tertiary)' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-danger)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};
