import { useState, useEffect } from 'react';
import AddTask from './AddTask';
import './Tasks.css';

// componentes de tarefas
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (title) => {
    try {
      console.log('📤 Enviando tarefa para o servidor:', title);
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      console.log('📥 Resposta do servidor:', response.status);

      if (response.ok) {
        const newTask = await response.json();
        console.log('✅ Nova tarefa recebida:', newTask);
        setTasks([...tasks, newTask]);
        console.log('✅ Tarefa adicionada à lista local');
      } else {
        const errorText = await response.text();
        console.error('❌ Erro na resposta:', errorText);
        alert('Erro ao adicionar tarefa');
      }
    } catch (error) {
      console.error('❌ Erro ao adicionar tarefa:', error);
      alert('Erro ao conectar com o servidor. Certifique-se de que o servidor está rodando (npm run server)');
    }
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(task =>
          task.id === taskId ? updatedTask : task
        ));
        console.log('✅ Tarefa atualizada:', updatedTask);
      } else {
        alert('Erro ao atualizar tarefa');
      }
    } catch (error) {
      console.error('❌ Erro ao atualizar tarefa:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  const deleteTask = async (taskId) => {
    if (!confirm('Tem certeza que deseja apagar esta tarefa?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
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

  if (loading) {
    return <div className="loading-message">⏳ Carregando tarefas...</div>;
  }

  return (
    <div className="tasks-container">
      <h2 className="tasks-title">Lista de Tarefas</h2>

      <AddTask onAddTask={addTask} />

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p className="empty-state-text">Nenhuma tarefa ainda. Adicione uma acima!</p>
        </div>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id, task.completed)}
                className="task-checkbox"
              />
              <span className={`task-title ${task.completed ? 'task-title-completed' : ''}`}>
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
                title="Apagar tarefa"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
