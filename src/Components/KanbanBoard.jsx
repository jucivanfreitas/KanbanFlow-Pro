import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanColumn from './KanbanColumn';
import AddTask from './AddTask';
import './KanbanBoard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function KanbanBoard() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showAddColumn, setShowAddColumn] = useState(false);

  // Carregar dados ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/kanban`);
        const data = await response.json();
        setColumns(data.columns || []);
        setTasks(data.tasks || []);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addTask = async (title, dueDate) => {
    try {
      const firstColumnId = columns[0]?.id;
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          columnId: firstColumnId,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null
        }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
        console.log('✅ Tarefa adicionada:', newTask);
      } else {
        alert('Erro ao adicionar tarefa');
      }
    } catch (error) {
      console.error('❌ Erro ao adicionar tarefa:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  const moveTask = async (taskId, newColumnId) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ columnId: newColumnId }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(task =>
          task.id === taskId ? updatedTask : task
        ));
        console.log('✅ Tarefa movida:', updatedTask);
      }
    } catch (error) {
      console.error('❌ Erro ao mover tarefa:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!confirm('Tem certeza que deseja apagar esta tarefa?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        console.log('✅ Tarefa deletada');
      } else {
        alert('Erro ao deletar tarefa');
      }
    } catch (error) {
      console.error('❌ Erro ao deletar tarefa:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  const updateColumnTitle = async (columnId, newTitle) => {
    try {
      const response = await fetch(`${API_URL}/api/columns/${columnId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        const updatedColumn = await response.json();
        setColumns(columns.map(col =>
          col.id === columnId ? updatedColumn : col
        ));
        console.log('✅ Coluna atualizada:', updatedColumn);
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar coluna:', error);
    }
  };

  const addColumn = async () => {
    if (!newColumnTitle.trim()) {
      alert('Digite um nome para a coluna');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/columns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newColumnTitle }),
      });

      if (response.ok) {
        const newColumn = await response.json();
        setColumns([...columns, newColumn]);
        setNewColumnTitle('');
        setShowAddColumn(false);
        console.log('✅ Coluna adicionada:', newColumn);
      } else {
        alert('Erro ao adicionar coluna');
      }
    } catch (error) {
      console.error('❌ Erro ao adicionar coluna:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  const deleteColumn = async (columnId) => {
    if (!confirm('Tem certeza? As tarefas desta coluna serão movidas para a primeira coluna.')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/columns/${columnId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Recarregar dados para atualizar tarefas movidas
        const reloadResponse = await fetch(`${API_URL}/api/kanban`);
        const data = await reloadResponse.json();
        setColumns(data.columns || []);
        setTasks(data.tasks || []);
        console.log('✅ Coluna deletada');
      } else {
        alert('Erro ao deletar coluna');
      }
    } catch (error) {
      console.error('❌ Erro ao deletar coluna:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  if (loading) {
    return <div className="loading-message">⏳ Carregando Kanban...</div>;
  }

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h2 className="kanban-title">Kanban Board</h2>
        <div className="header-actions">
          <button
            onClick={() => navigate('/help')}
            className="btn-help"
            title="Central de Ajuda"
          >
            ❓ Ajuda
          </button>
          <AddTask onAddTask={addTask} />
        </div>
      </div>

      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter(task => task.columnId === column.id)}
            onMoveTask={moveTask}
            onDeleteTask={deleteTask}
            onUpdateTitle={updateColumnTitle}
            onDeleteColumn={deleteColumn}
          />
        ))}

        {/* Adicionar nova coluna */}
        <div className="add-column-container">
          {showAddColumn ? (
            <div className="add-column-form">
              <input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addColumn()}
                placeholder="Nome da coluna..."
                className="add-column-input"
                autoFocus
              />
              <div className="add-column-buttons">
                <button onClick={addColumn} className="add-column-btn confirm">
                  ✓
                </button>
                <button
                  onClick={() => {
                    setShowAddColumn(false);
                    setNewColumnTitle('');
                  }}
                  className="add-column-btn cancel"
                >
                  ✕
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddColumn(true)}
              className="add-column-trigger"
            >
              + Adicionar Coluna
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;
