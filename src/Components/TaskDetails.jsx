import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskDetails.css';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Campos editáveis
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [columnId, setColumnId] = useState('');

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchTaskAndColumns();
  }, [id]);

  const fetchTaskAndColumns = async () => {
    try {
      // Buscar dados do kanban
      const response = await fetch('http://localhost:3001/api/kanban');
      const data = await response.json();

      // Encontrar a tarefa específica
      const foundTask = data.tasks.find(t => t.id === parseInt(id));

      if (!foundTask) {
        alert('Tarefa não encontrada');
        navigate('/');
        return;
      }

      setTask(foundTask);
      setColumns(data.columns);

      // Preencher formulário
      setTitle(foundTask.title);
      setDescription(foundTask.description || '');
      setDueDate(foundTask.dueDate ? foundTask.dueDate.split('T')[0] : '');
      setColumnId(foundTask.columnId);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar tarefa:', error);
      alert('Erro ao carregar tarefa');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert('O título é obrigatório');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          columnId,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTask(updatedTask);
        alert('✅ Tarefa atualizada com sucesso!');
        navigate('/');
      } else {
        alert('Erro ao atualizar tarefa');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao conectar com o servidor');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('✅ Tarefa deletada com sucesso!');
        navigate('/');
      } else {
        alert('Erro ao deletar tarefa');
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  const handleMarkComplete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completedAt,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTask(updatedTask);
        alert(updatedTask.completedAt ? '✅ Tarefa marcada como concluída!' : '🔄 Tarefa reaberta!');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = () => {
    if (task.completedAt) return 'completed';
    if (!task.dueDate) return 'no-date';

    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'overdue';
    if (diffDays <= 2) return 'due-soon';
    return 'on-track';
  };

  if (loading) {
    return <div className="loading-screen">⏳ Carregando...</div>;
  }

  if (!task) {
    return <div className="error-screen">Tarefa não encontrada</div>;
  }

  const statusColor = getStatusColor();

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Voltar ao Kanban
        </button>
        <h1 className="task-details-title">Detalhes da Tarefa</h1>
      </div>

      <div className={`task-details-card status-${statusColor}`}>
        {/* Informações de Status */}
        <div className="task-status-section">
          <div className="status-badges">
            {task.completedAt && (
              <span className="badge badge-completed">✓ Concluída</span>
            )}
            {!task.completedAt && statusColor === 'overdue' && (
              <span className="badge badge-overdue">⚠️ Atrasada</span>
            )}
            {!task.completedAt && statusColor === 'due-soon' && (
              <span className="badge badge-due-soon">⏳ Urgente</span>
            )}
          </div>

          <div className="task-meta">
            <div className="meta-item">
              <span className="meta-label">ID:</span>
              <span className="meta-value">#{task.id}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">📅 Criado em:</span>
              <span className="meta-value">{formatDateTime(task.createdAt)}</span>
            </div>
            {task.completedAt && (
              <div className="meta-item">
                <span className="meta-label">✅ Concluído em:</span>
                <span className="meta-value">{formatDateTime(task.completedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Formulário de Edição */}
        <div className="task-form">
          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="Digite o título da tarefa..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="Adicione detalhes sobre a tarefa..."
              rows="6"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate">⏰ Data de Previsão</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="column">Coluna / Status</label>
              <select
                id="column"
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
                className="form-select"
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="task-actions">
          <button
            onClick={handleSave}
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? '💾 Salvando...' : '💾 Salvar Alterações'}
          </button>

          <button
            onClick={handleMarkComplete}
            className={`btn ${task.completedAt ? 'btn-reopen' : 'btn-complete'}`}
          >
            {task.completedAt ? '🔄 Reabrir Tarefa' : '✅ Marcar como Concluída'}
          </button>

          <button
            onClick={handleDelete}
            className="btn btn-danger"
          >
            🗑️ Deletar Tarefa
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
