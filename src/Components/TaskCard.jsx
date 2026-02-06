import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskCard.css';

function TaskCard({ task, onDeleteTask }) {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id.toString());
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCardClick = () => {
    navigate(`/task/${task.id}`);
  };

  // Calcular status da tarefa baseado nas datas
  const getTaskStatus = () => {
    if (task.completedAt) {
      return 'completed';
    }

    if (!task.dueDate) {
      return 'no-date';
    }

    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'overdue'; // Atrasado
    } else if (diffDays <= 2) {
      return 'due-soon'; // Próximo do prazo
    } else {
      return 'on-track'; // No prazo
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const status = getTaskStatus();

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''} task-status-${status}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="task-card-header">
        <p className="task-card-title">{task.title}</p>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita abrir detalhes ao clicar em deletar
            onDeleteTask(task.id);
          }}
          className="task-card-delete"
          title="Apagar tarefa"
        >
          🗑️
        </button>
      </div>

      <div className="task-card-dates">
        {task.createdAt && (
          <div className="task-date">
            <span className="date-label">📅 Criado:</span>
            <span className="date-value">{formatDateTime(task.createdAt)}</span>
          </div>
        )}

        {task.dueDate && (
          <div className="task-date">
            <span className="date-label">⏰ Prazo:</span>
            <span className="date-value">{formatDate(task.dueDate)}</span>
          </div>
        )}

        {task.completedAt && (
          <div className="task-date">
            <span className="date-label">✅ Concluído:</span>
            <span className="date-value">{formatDateTime(task.completedAt)}</span>
          </div>
        )}
      </div>

      {status === 'overdue' && !task.completedAt && (
        <div className="task-status-badge overdue">⚠️ Atrasado</div>
      )}
      {status === 'due-soon' && !task.completedAt && (
        <div className="task-status-badge due-soon">⏳ Próximo do prazo</div>
      )}
      {status === 'completed' && (
        <div className="task-status-badge completed">✓ Concluído</div>
      )}
    </div>
  );
}

export default TaskCard;
