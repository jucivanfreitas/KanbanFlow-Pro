import { useState } from 'react';
import './AddTask.css';

function AddTask({ onAddTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      alert('Por favor, digite um título para a tarefa');
      return;
    }

    onAddTask(newTaskTitle, dueDate || null);
    setNewTaskTitle('');
    setDueDate('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="add-task-container">
      <div className="add-task-inputs">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite o título da tarefa..."
          className="add-task-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="add-task-date"
          title="Data de previsão (opcional)"
        />
      </div>
      <button
        onClick={handleAddTask}
        className="add-task-button"
      >
        Adicionar Tarefa
      </button>
    </div>
  );
}

export default AddTask;
