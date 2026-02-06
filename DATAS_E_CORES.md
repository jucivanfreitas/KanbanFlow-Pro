# 📅 Sistema de Datas e Cores - Kanban

## ✨ Novas Funcionalidades Implementadas

### 1. **Datas nas Tarefas**

Cada tarefa agora possui três campos de data:

- **📅 Data de Criação (`createdAt`)**: Gerada automaticamente ao criar a tarefa
- **⏰ Data de Previsão (`dueDate`)**: Definida pelo usuário (opcional)
- **✅ Data de Conclusão (`completedAt`)**: Registrada automaticamente quando concluída

### 2. **Sistema de Cores Inteligente**

As tarefas mudam de cor automaticamente baseado no status:

#### 🔴 **Vermelho - Atrasado**

- **Quando**: Data de previsão já passou e tarefa não está concluída
- **Cor da borda**: `#ef4444` (vermelho)
- **Fundo**: `#fef2f2` (vermelho claro)
- **Badge**: "⚠️ Atrasado"

#### 🟠 **Laranja - Próximo do Prazo**

- **Quando**: Faltam 2 dias ou menos para o prazo
- **Cor da borda**: `#f59e0b` (laranja)
- **Fundo**: `#fffbeb` (laranja claro)
- **Badge**: "⏳ Próximo do prazo"

#### 🔵 **Azul - No Prazo**

- **Quando**: Tarefa tem mais de 2 dias até o prazo
- **Cor da borda**: `#3b82f6` (azul)
- **Fundo**: Branco

#### 🟢 **Verde - Concluído**

- **Quando**: Tarefa foi concluída
- **Cor da borda**: `#22c55e` (verde)
- **Fundo**: `#f0fdf4` (verde claro)
- **Badge**: "✓ Concluído"

#### ⚪ **Cinza - Sem Data**

- **Quando**: Tarefa não tem data de previsão definida
- **Cor da borda**: `#6b7280` (cinza)
- **Fundo**: Branco

## 🎯 Como Usar

### Adicionar Tarefa com Data

1. Digite o título da tarefa
2. **Selecione a data de previsão** no campo de data (opcional)
3. Clique em "Adicionar Tarefa"

### Visualizar Informações no Card

Cada card exibe:

- **Título** da tarefa (negrito)
- **📅 Criado**: Data e hora de criação
- **⏰ Prazo**: Data de previsão (se definida)
- **✅ Concluído**: Data e hora de conclusão (se concluída)
- **Badge de Status**: Indicador visual do status atual

### Marcar como Concluído

Ao mover uma tarefa para a coluna "Done", a data de conclusão é registrada automaticamente.

## 🎨 Padrões de Cores

### Legenda Visual

```
🔴 ATRASADO      → Prioridade máxima! Precisa de atenção imediata
🟠 URGENTE       → Prazo está próximo, ação necessária em breve
🔵 NO PRAZO      → Tarefa sob controle, tempo disponível
🟢 CONCLUÍDO     → Tarefa finalizada com sucesso
⚪ SEM PRAZO     → Sem data definida
```

## 📊 Exemplos de Uso

### Exemplo 1: Tarefa Atrasada

```
Título: Finalizar relatório
📅 Criado: 01/02 10:00
⏰ Prazo: 04/02
Status: ⚠️ Atrasado (hoje é 05/02)
Cor: Vermelho
```

### Exemplo 2: Tarefa Urgente

```
Título: Revisar código
📅 Criado: 05/02 09:00
⏰ Prazo: 07/02
Status: ⏳ Próximo do prazo (hoje é 05/02)
Cor: Laranja
```

### Exemplo 3: Tarefa Concluída

```
Título: Configurar ambiente
📅 Criado: 01/02 08:00
⏰ Prazo: 10/02
✅ Concluído: 05/02 14:30
Status: ✓ Concluído
Cor: Verde
```

## 🔧 Estrutura de Dados

### Tarefa Completa (JSON)

```json
{
  "id": 1,
  "title": "Título da tarefa",
  "columnId": "col-1",
  "createdAt": "2026-02-05T10:00:00.000Z",
  "dueDate": "2026-02-10T23:59:59.000Z",
  "completedAt": null
}
```

### Formato de Datas

- **ISO 8601**: `YYYY-MM-DDTHH:mm:ss.sssZ`
- **Exibição BR**: `DD/MM/YYYY HH:mm`

## 🚀 Melhorias Implementadas

- ✅ Datas automáticas (criação e conclusão)
- ✅ Data de previsão opcional
- ✅ Sistema de cores dinâmico
- ✅ Badges visuais de status
- ✅ Cálculo automático de prazos
- ✅ Formatação de datas em PT-BR
- ✅ Feedback visual imediato
- ✅ Persistência no servidor

## 📱 Responsividade

O layout se adapta automaticamente:

- **Desktop**: Campos de data e título lado a lado
- **Mobile**: Campos empilhados verticalmente

---

**🎉 Sistema completo de gestão de prazos e status visual!**

Agora você pode gerenciar suas tarefas com controle total de datas e feedback visual intuitivo baseado em cores!
