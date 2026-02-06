# 🔍 Guia de Teste e Verificação

## Passos para testar se está gravando no arquivo:

### 1. Verificar se o servidor está rodando

Abra um terminal e execute:

```bash
npm run server
```

Você deve ver:

```
🚀 Servidor rodando na porta 3001
📝 API disponível em http://localhost:3001/api/tasks
```

### 2. Iniciar o frontend

Abra OUTRO terminal e execute:

```bash
npm run dev
```

### 3. Abrir o navegador

Acesse: `http://localhost:5173`

### 4. Abrir o Console do Navegador

- Pressione `F12` ou `Ctrl+Shift+I`
- Vá na aba "Console"

### 5. Adicionar uma tarefa

- Digite uma tarefa no campo de input
- Clique em "Adicionar Tarefa"

### 6. Verificar os logs

**No Console do Navegador**, você verá:

```
📤 Enviando tarefa para o servidor: [título da tarefa]
📥 Resposta do servidor: 201
✅ Nova tarefa recebida: {id: X, title: "...", completed: false}
✅ Tarefa adicionada à lista local
```

**No Terminal do Servidor**, você verá:

```
📥 Recebendo requisição POST: { title: '...' }
📋 Tarefas atuais: [...]
➕ Nova tarefa: { id: X, title: '...', completed: false }
📝 Salvando tarefas: [...]
📁 Caminho do arquivo: C:\Users\...\server\data\tasks.json
✅ Tarefas salvas com sucesso!
✅ Tarefa adicionada com sucesso!
```

### 7. Verificar o arquivo tasks.json

Abra o arquivo `server/data/tasks.json` no VS Code e verifique se a nova tarefa foi adicionada.

## ⚠️ Problemas Comuns:

### Erro: "Erro ao conectar com o servidor"

- **Causa**: Servidor não está rodando
- **Solução**: Execute `npm run server` em um terminal

### Erro: "CORS"

- **Causa**: Problema de permissão entre frontend e backend
- **Solução**: Já está configurado com `cors()` no servidor

### Arquivo não atualiza

- **Causa**: Pode estar vendo um cache antigo
- **Solução**: Feche e reabra o arquivo tasks.json no VS Code

### Permissão negada

- **Causa**: Arquivo pode estar bloqueado pelo OneDrive
- **Solução**: Verifique se o OneDrive não está sincronizando o arquivo neste momento

## 🧪 Teste Manual da API

Execute em um novo terminal:

```bash
node test-api.js
```

Isso testará a API independentemente do frontend.
