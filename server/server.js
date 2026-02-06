import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const TASKS_FILE = process.env.DATA_FILE_PATH || path.join(__dirname, 'data', 'tasks.json');

// CORS configurado para produção
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Função para ler dados do arquivo
async function readData() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler dados:', error);
    return { columns: [], tasks: [] };
  }
}

// Função para salvar dados no arquivo
async function saveData(data) {
  try {
    console.log('📝 Salvando dados:', data);
    console.log('📁 Caminho do arquivo:', TASKS_FILE);

    await fs.writeFile(TASKS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ Dados salvos com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar dados:', error);
    console.error('❌ Stack:', error.stack);
    return false;
  }
}

// GET - Obter todas as colunas e tarefas
app.get('/api/kanban', async (req, res) => {
  const data = await readData();
  res.json(data);
});

// GET - Obter todas as tarefas (compatibilidade)
app.get('/api/tasks', async (req, res) => {
  const data = await readData();
  res.json(data.tasks || []);
});

// POST - Adicionar uma nova tarefa
app.post('/api/tasks', async (req, res) => {
  console.log('📥 Recebendo requisição POST:', req.body);
  const { title, columnId, dueDate, description } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'O título da tarefa é obrigatório' });
  }

  const data = await readData();
  console.log('📋 Dados atuais:', data);

  const newTask = {
    id: data.tasks.length > 0 ? Math.max(...data.tasks.map(t => t.id)) + 1 : 1,
    title: title.trim(),
    description: description || '',
    columnId: columnId || (data.columns[0]?.id || 'col-1'),
    createdAt: new Date().toISOString(),
    dueDate: dueDate || null,
    completedAt: null,
  };

  console.log('➕ Nova tarefa:', newTask);
  data.tasks.push(newTask);
  const saved = await saveData(data);

  if (saved) {
    console.log('✅ Tarefa adicionada com sucesso!');
    res.status(201).json(newTask);
  } else {
    console.log('❌ Falha ao salvar tarefa');
    res.status(500).json({ error: 'Erro ao salvar a tarefa' });
  }
});

// PUT - Atualizar uma tarefa (mover entre colunas ou editar)
app.put('/api/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, columnId, completed, description, dueDate } = req.body;

  const data = await readData();
  const taskIndex = data.tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  if (title !== undefined) data.tasks[taskIndex].title = title;
  if (description !== undefined) data.tasks[taskIndex].description = description;
  if (dueDate !== undefined) data.tasks[taskIndex].dueDate = dueDate;
  if (columnId !== undefined) data.tasks[taskIndex].columnId = columnId;

  // Atualizar completedAt quando mover para coluna "Done" ou marcar como completo
  if (completed !== undefined && completed === true && !data.tasks[taskIndex].completedAt) {
    data.tasks[taskIndex].completedAt = new Date().toISOString();
  } else if (completed !== undefined && completed === false) {
    data.tasks[taskIndex].completedAt = null;
  }

  const saved = await saveData(data);

  if (saved) {
    res.json(data.tasks[taskIndex]);
  } else {
    res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
  }
});// DELETE - Deletar uma tarefa
app.delete('/api/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  const data = await readData();
  const filteredTasks = data.tasks.filter(t => t.id !== id);

  if (data.tasks.length === filteredTasks.length) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  data.tasks = filteredTasks;
  const saved = await saveData(data);

  if (saved) {
    res.json({ message: 'Tarefa deletada com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao deletar a tarefa' });
  }
});

// POST - Adicionar uma nova coluna
app.post('/api/columns', async (req, res) => {
  console.log('📥 Recebendo requisição POST /api/columns:', req.body);
  const { title } = req.body;

  if (!title || title.trim() === '') {
    console.log('❌ Título vazio ou inválido');
    return res.status(400).json({ error: 'O título da coluna é obrigatório' });
  }

  const data = await readData();
  console.log('📋 Dados atuais:', data);

  const newColumn = {
    id: `col-${Date.now()}`,
    title: title.trim(),
    order: data.columns.length,
  };

  console.log('➕ Nova coluna:', newColumn);
  data.columns.push(newColumn);
  const saved = await saveData(data);

  if (saved) {
    console.log('✅ Coluna adicionada com sucesso!');
    res.status(201).json(newColumn);
  } else {
    console.log('❌ Falha ao salvar coluna');
    res.status(500).json({ error: 'Erro ao salvar a coluna' });
  }
});

// PUT - Atualizar uma coluna (editar nome)
app.put('/api/columns/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const data = await readData();
  const columnIndex = data.columns.findIndex(c => c.id === id);

  if (columnIndex === -1) {
    return res.status(404).json({ error: 'Coluna não encontrada' });
  }

  if (title !== undefined) data.columns[columnIndex].title = title;

  const saved = await saveData(data);

  if (saved) {
    res.json(data.columns[columnIndex]);
  } else {
    res.status(500).json({ error: 'Erro ao atualizar a coluna' });
  }
});

// DELETE - Deletar uma coluna
app.delete('/api/columns/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readData();
  const filteredColumns = data.columns.filter(c => c.id !== id);

  if (data.columns.length === filteredColumns.length) {
    return res.status(404).json({ error: 'Coluna não encontrada' });
  }

  // Mover tarefas da coluna deletada para a primeira coluna
  if (filteredColumns.length > 0) {
    data.tasks = data.tasks.map(task =>
      task.columnId === id ? { ...task, columnId: filteredColumns[0].id } : task
    );
  }

  data.columns = filteredColumns;
  const saved = await saveData(data);

  if (saved) {
    res.json({ message: 'Coluna deletada com sucesso' });
  } else {
    res.status(500).json({ error: 'Erro ao deletar a coluna' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API disponível em http://localhost:${PORT}/api/tasks`);
  console.log(`🏥 Health check em http://localhost:${PORT}/api/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📁 Arquivo de dados: ${TASKS_FILE}`);
});
