import { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) => prev.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const handleTaskDeleted = (id) => {
    setTasks((prev) => prev.filter(t => t._id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Task Manager</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ))
      )}
    </div>
  );
}