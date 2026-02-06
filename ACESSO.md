# Informacoes de Acesso - KanbanFlow Pro

> SEGURANCA: IPs e credenciais de servidor NAO devem ser commitados no repositorio.
> Configure-os via variaveis de ambiente, GitHub Secrets ou documentacao privada.

---

## URLs de Producao

| Servico | URL |
|---------|-----|
| Frontend (App) | https://kanbanflow.visiochat.cloud |
| Backend (API) | https://kanbanapi.visiochat.cloud |
| API Health Check | https://kanbanapi.visiochat.cloud/api/health |

### Acesso direto via IP (fallback)

| Servico | URL |
|---------|-----|
| Frontend | http://VPS_IP:8080 |
| Backend | http://VPS_IP:3001 |
| Health Check | http://VPS_IP:3001/api/health |

---

## VPS (Servidor)

| Item | Valor |
|------|-------|
| IP | Configurar via variavel de ambiente |
| SSH | ssh user@VPS_IP |
| Diretorio | /var/www/kanbanflow-pro/ |
| Docker | Instalado |
| Traefik | Rodando (proxy reverso, SSL) |

### Estrutura no servidor

/var/www/kanbanflow-pro/
  docker-compose.yml         - Configuracao dos containers
  temp/                      - Codigo fonte (clone do repo)
    src/                     - Frontend React
    server/                  - Backend Express
    Dockerfile.frontend
    Dockerfile.backend
    nginx.conf
    .env.production

---

## Docker

| Item | Valor |
|------|-------|
| Frontend Image | dockerhub-user/kanbanflow-frontend:latest |
| Backend Image | dockerhub-user/kanbanflow-backend:latest |
| Container Frontend | kanbanflow-frontend |
| Container Backend | kanbanflow-backend |
| Network | traefik_public |
| Volume | kanban_data -> /app/data |

### Comandos uteis (executar no VPS)

docker ps --filter name=kanbanflow
docker logs kanbanflow-frontend --tail 50
docker logs kanbanflow-backend --tail 50
cd /var/www/kanbanflow-pro && docker compose restart
docker compose down
docker compose up -d

---

## DNS

| Dominio | Tipo | Valor |
|---------|------|-------|
| kanbanflow.visiochat.cloud | A | VPS_IP |
| kanbanapi.visiochat.cloud | A | VPS_IP |

---

## SSL/HTTPS

- Provedor: Let's Encrypt (automatico via Traefik)
- Cert Resolver: le
- Renovacao: Automatica pelo Traefik

---

## API Endpoints

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | /api/health | Health check |
| GET | /api/columns | Listar colunas |
| POST | /api/columns | Criar coluna |
| PUT | /api/columns/:id | Atualizar coluna |
| DELETE | /api/columns/:id | Deletar coluna |
| GET | /api/tasks | Listar tarefas |
| POST | /api/tasks | Criar tarefa |
| PUT | /api/tasks/:id | Atualizar tarefa |
| DELETE | /api/tasks/:id | Deletar tarefa |

---

## Desenvolvimento Local

npm install
cp .env.example .env
npm run dev       -> http://localhost:5173
npm run server    -> http://localhost:3001

---

## Git

| Item | Valor |
|------|-------|
| Repositorio | github.com/jucivanfreitas/KanbanFlow-Pro |
| Branch producao | production |
| Branch estavel | main |
