import { useState } from 'react';
import TaskCard from './TaskCard';
import './KanbanColumn.css';

function KanbanColumn({ column, tasks, onMoveTask, onDeleteTask, onUpdateTitle, onDeleteColumn }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    onMoveTask(taskId, column.id);
  };

  const handleTitleSave = () => {
    if (editedTitle.trim() && editedTitle !== column.title) {
      onUpdateTitle(column.id, editedTitle.trim());
    } else {
      setEditedTitle(column.title);
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(column.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div
      className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyDown={handleTitleKeyPress}
            className="column-title-input"
            autoFocus
          />
        ) : (
          <h3
            className="column-title"
            onClick={() => setIsEditingTitle(true)}
            title="Clique para editar"
          >
            {column.title}
          </h3>
        )}
        <div className="column-actions">
          <span className="task-count">{tasks.length}</span>
          <button
            onClick={() => onDeleteColumn(column.id)}
            className="delete-column-btn"
            title="Deletar coluna"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="column-tasks">
        {tasks.length === 0 ? (
          <div className="empty-column">
            <p>Arraste tarefas aqui</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
