# 📋 Próximos Passos - KanbanFlow Pro

## ✅ Concluído

### Deploy & Infraestrutura

- [x] Deploy em produção com Docker Compose + Traefik
- [x] HTTPS/SSL via Let's Encrypt (certresolver "le")
- [x] Frontend: https://kanbanflow.visiochat.cloud
- [x] Backend: https://kanbanapi.visiochat.cloud
- [x] Health checks configurados (curl frontend, node backend)
- [x] Volume Docker para persistência de dados (`kanban_data`)
- [x] CORS configurado entre frontend e backend
- [x] Nginx otimizado (gzip, cache, security headers, SPA routing)

### Código

- [x] Variáveis de ambiente (`VITE_API_URL`) substituindo URLs hardcoded
- [x] Backend cria automaticamente diretório e arquivo de dados
- [x] Tratamento de campos ausentes no `readData()`
- [x] Dockerfiles otimizados (multi-stage, health checks)

### Documentação

- [x] README.md atualizado
- [x] DEPLOY_GUIDE.md com guia completo de deploy
- [x] ACESSO.md com informações de acesso
- [x] Branches organizados (production + main)

---

## 🔜 Próximos Passos Prioritários

### 1. 🔄 CI/CD - Deploy Automático via Git

Configurar GitHub Actions para deploy automático quando o branch `production` for atualizado:

```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS
on:
  push:
    branches: [production]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: 72.60.143.197
          username: root
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/kanbanflow-pro/temp
            git pull origin production
            docker build -f Dockerfile.frontend -t jucivanfsantos/kanbanflow-frontend:latest --no-cache .
            docker build -f Dockerfile.backend -t jucivanfsantos/kanbanflow-backend:latest --no-cache .
            cd /var/www/kanbanflow-pro
            docker rm -f kanbanflow-frontend kanbanflow-backend
            docker compose up -d
```

**Secrets necessários no GitHub:**

- `VPS_SSH_KEY`: Chave SSH privada para acesso ao VPS

### 2. 🗄️ Migrar para Banco de Dados

Substituir `tasks.json` por um banco de dados real:

- **Opção 1:** SQLite (mais simples, arquivo local)
- **Opção 2:** PostgreSQL (mais robusto, adicionar container)
- **Opção 3:** MongoDB (flexível, schema-less)

### 3. 🔐 Autenticação de Usuários

- Login/Registro com JWT
- Boards privados por usuário
- Roles: admin, membro, visualizador
- OAuth (Google, GitHub)

### 4. 📱 Melhorias de UI/UX

- [ ] Layout responsivo para mobile
- [ ] Dark mode / Light mode
- [ ] Animações de drag & drop mais suaves
- [ ] Notificações toast para ações
- [ ] Atalhos de teclado
- [ ] Filtros e busca de tarefas

### 5. 📊 Funcionalidades Avançadas

- [ ] Múltiplos boards (workspaces)
- [ ] Etiquetas/labels coloridos nas tarefas
- [ ] Datas de vencimento e lembretes
- [ ] Anexos de arquivos
- [ ] Comentários nas tarefas
- [ ] Histórico de atividades (audit log)
- [ ] Exportar board (PDF, CSV)

### 6. ⚡ Performance & Qualidade

- [ ] Testes unitários (Vitest / Jest)
- [ ] Testes E2E (Playwright / Cypress)
- [ ] Linting e formatação (ESLint + Prettier)
- [ ] Cache de API (React Query / SWR)
- [ ] Websockets para atualizações em tempo real
- [ ] Otimização de imagens Docker (layers caching)

### 7. 🔒 Segurança

- [ ] Rate limiting na API
- [ ] Validação de inputs (express-validator)
- [ ] Helmet.js para headers HTTP
- [ ] Backup automático dos dados
- [ ] Monitoramento com Uptime Kuma ou similar

---

## 🗓️ Roadmap Sugerido

| Fase       | Item                       | Prioridade |
| ---------- | -------------------------- | ---------- |
| **Fase 1** | CI/CD com GitHub Actions   | 🔴 Alta    |
| **Fase 1** | Backup automático de dados | 🔴 Alta    |
| **Fase 2** | Migração para PostgreSQL   | 🟡 Média   |
| **Fase 2** | Autenticação JWT           | 🟡 Média   |
| **Fase 3** | Múltiplos boards           | 🟢 Normal  |
| **Fase 3** | Responsividade mobile      | 🟢 Normal  |
| **Fase 4** | Websockets (tempo real)    | 🔵 Baixa   |
| **Fase 4** | Testes automatizados       | 🔵 Baixa   |

---

## 📝 Workflow de Desenvolvimento

```
main (estável)
  └── production (deploy automático)
        └── feature/* (desenvolvimento)
```

1. Criar branch de feature a partir de `production`
2. Desenvolver e testar localmente
3. Merge na `production` → deploy automático via CI/CD
4. Após validação em produção, merge na `main`
