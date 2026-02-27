import { updateTask, deleteTask } from '../api';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {

  const handleToggle = async () => {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      onTaskUpdated(updated.data);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onTaskDeleted(task._id);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        style={{ marginRight: '0.5rem' }}
      />
      <div style={{ flexGrow: 1 }}>
        <strong>{task.title}</strong> {task.description && `- ${task.description}`}
      </div>
      <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>Delete</button>
    </div>
  );
}