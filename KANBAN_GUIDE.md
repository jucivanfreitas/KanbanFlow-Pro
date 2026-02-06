# 🎯 Sistema Kanban - Guia de Uso

## 📋 O que foi implementado

Transformei a aplicação de lista de tarefas em um **sistema Kanban completo** com colunas editáveis e cards arrastáveis!

## ✨ Funcionalidades

### 1. **Colunas Kanban**

- ✅ Colunas padrão: Backlog, In Progress, Done
- ✅ Nomes **editáveis** (clique no título da coluna)
- ✅ Adicionar **novas colunas** dinamicamente
- ✅ Deletar colunas (tarefas são movidas para a primeira coluna)
- ✅ Contador de tarefas em cada coluna

### 2. **Cards de Tarefas**

- ✅ **Arrastar e soltar** entre colunas (Drag & Drop)
- ✅ Adicionar novas tarefas
- ✅ Deletar tarefas com confirmação
- ✅ Feedback visual ao arrastar

### 3. **Backend Atualizado**

- ✅ Nova estrutura de dados em `tasks.json`
- ✅ API REST completa:
  - `GET /api/kanban` - Obter todas as colunas e tarefas
  - `POST/PUT/DELETE /api/tasks/:id` - Gerenciar tarefas
  - `POST/PUT/DELETE /api/columns/:id` - Gerenciar colunas

## 🚀 Como Usar

### 1. Iniciar os Servidores

```bash
# Terminal 1 - Backend (porta 3001)
npm run server

# Terminal 2 - Frontend (porta 5174)
npm run dev
```

### 2. Adicionar Tarefas

- Digite o nome da tarefa no campo de input
- Pressione Enter ou clique em "Adicionar"
- A tarefa será criada na primeira coluna (Backlog)

### 3. Mover Tarefas (Drag & Drop)

1. Clique e **segure** o card da tarefa
2. **Arraste** para a coluna desejada
3. **Solte** o card na coluna
4. A tarefa será atualizada automaticamente no servidor

### 4. Editar Nome da Coluna

1. Clique no **título da coluna**
2. Digite o novo nome
3. Pressione **Enter** ou clique fora para salvar
4. Pressione **Esc** para cancelar

### 5. Adicionar Nova Coluna

1. Clique em **"+ Adicionar Coluna"** (lado direito)
2. Digite o nome da nova coluna
3. Clique em **✓** para confirmar ou **✕** para cancelar

### 6. Deletar Coluna

1. Clique no ícone **🗑️** na coluna
2. Confirme a ação
3. As tarefas serão movidas para a primeira coluna

### 7. Deletar Tarefa

1. Passe o mouse sobre o card da tarefa
2. Clique no ícone **🗑️** que aparece
3. Confirme a exclusão

## 🎨 Feedback Visual

- **Arraste**: Card fica translúcido e rotaciona levemente
- **Hover na coluna**: Coluna muda de cor para azul claro
- **Hover no card**: Card se eleva com sombra
- **Botão deletar**: Aparece ao passar o mouse

## 📁 Estrutura de Dados

### tasks.json

```json
{
  "columns": [
    {
      "id": "col-1",
      "title": "Backlog",
      "order": 0
    }
  ],
  "tasks": [
    {
      "id": 1,
      "title": "Nome da tarefa",
      "columnId": "col-1"
    }
  ]
}
```

## 🔧 Componentes Criados

1. **KanbanBoard.jsx** - Container principal do Kanban
2. **KanbanColumn.jsx** - Cada coluna com nome editável
3. **TaskCard.jsx** - Card arrastável da tarefa
4. **KanbanBoard.css** - Estilos do board
5. **KanbanColumn.css** - Estilos das colunas
6. **TaskCard.css** - Estilos dos cards

## 🎯 Boas Práticas Implementadas

- ✅ **HTML5 Drag and Drop API** nativo
- ✅ **Estado sincronizado** com backend
- ✅ **Feedback visual** em todas as interações
- ✅ **Confirmações** antes de deletar
- ✅ **Responsivo** com scroll horizontal
- ✅ **Acessível** com teclas Enter/Esc
- ✅ **Persistência** automática no servidor

## 🌟 Melhorias Futuras (Opcionais)

- [ ] Editar título das tarefas
- [ ] Reordenar colunas por drag & drop
- [ ] Reordenar tarefas dentro da mesma coluna
- [ ] Adicionar descrição nas tarefas
- [ ] Cores personalizadas para colunas
- [ ] Filtros e busca
- [ ] Data de criação/conclusão
- [ ] Tags/labels nas tarefas

---

**Pronto para usar! 🎉**
Execute os dois servidores e comece a gerenciar suas tarefas no estilo Kanban!
