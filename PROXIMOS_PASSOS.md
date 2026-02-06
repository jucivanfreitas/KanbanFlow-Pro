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
- [x] Sanitização de segurança (IPs e credenciais removidos dos docs)
- [x] Branches organizados (production + main)

### CI/CD

- [x] GitHub Actions workflow com 4 jobs (build, docker, deploy, health check)
- [x] Deploy automático a cada push no branch `production`
- [x] Secrets configurados (VPS_HOST, VPS_USER, VPS_SSH_KEY, DOCKER_USERNAME, DOCKER_TOKEN)
- [x] Health check com retry automático pós-deploy

---

## 🔜 Próximos Passos Prioritários

### 1. 🔄 CI/CD - Deploy Automático via Git ✅

O workflow de CI/CD já está configurado em `.github/workflows/deploy.yml` e é disparado automaticamente a cada push no branch `production` (ou via `workflow_dispatch` manual).

**Pipeline (4 Jobs):**

1. **Build and Test** — Instala dependências, roda linter, builda o frontend com Vite e verifica se a pasta `dist` foi gerada
2. **Build Docker Images** — Login no Docker Hub, build das imagens frontend/backend com tags `latest` e `SHA`, push para o registry
3. **Deploy to VPS** — Conecta via SSH, envia `docker-compose.yml`, remove containers antigos, sobe novos com `docker compose up -d`
4. **Health Check** — Aguarda estabilização e testa URLs de produção com retry (3 tentativas)

**Triggers:**

- Push no branch `production`
- Dispatch manual (botão "Run workflow" no GitHub)

**Secrets necessários no GitHub:**

- `VPS_HOST`: IP do servidor VPS
- `VPS_USER`: Usuário SSH (ex: root)
- `VPS_SSH_KEY`: Chave SSH privada para acesso ao VPS
- `DOCKER_USERNAME`: Usuário do Docker Hub
- `DOCKER_TOKEN`: Token de acesso do Docker Hub

> Arquivo completo: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

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

| Fase       | Item                         | Prioridade   |
| ---------- | ---------------------------- | ------------ |
| **Fase 1** | ~~CI/CD com GitHub Actions~~ | ✅ Concluído |
| **Fase 1** | Backup automático de dados   | 🔴 Alta      |
| **Fase 2** | Migração para PostgreSQL     | 🟡 Média     |
| **Fase 2** | Autenticação JWT             | 🟡 Média     |
| **Fase 3** | Múltiplos boards             | 🟢 Normal    |
| **Fase 3** | Responsividade mobile        | 🟢 Normal    |
| **Fase 4** | Websockets (tempo real)      | 🔵 Baixa     |
| **Fase 4** | Testes automatizados         | 🔵 Baixa     |

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
