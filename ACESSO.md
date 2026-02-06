# 🔑 Informações de Acesso - KanbanFlow Pro# 🚀 KanbanFlow Pro - Acesso à Aplicação

## 🌐 URLs de Produção## ✅ Deploy Concluído!

| Serviço | URL |A aplicação está rodando no VPS **72.60.143.197**

|---------|-----|

| **Frontend (App)** | https://kanbanflow.visiochat.cloud |### 🌐 URLs de Acesso

| **Backend (API)** | https://kanbanapi.visiochat.cloud |

| **API Health Check** | https://kanbanapi.visiochat.cloud/api/health |#### Acesso Direto por IP (HTTP):

### Acesso direto via IP (fallback)- **Frontend**: http://72.60.143.197:8080

- **Backend API**: http://72.60.143.197:3001

| Serviço | URL |- **Health Check**: http://72.60.143.197:3001/api/health

|---------|-----|

| **Frontend** | http://72.60.143.197:8080 |#### Acesso via Domínio (se Traefik estiver configurado):

| **Backend** | http://72.60.143.197:3001 |

| **Health Check** | http://72.60.143.197:3001/api/health |- **Frontend**: https://kanbanflow.visiochat.cloud

- **Backend API**: https://kanbamapi.visiochat.cloud

---

---

## 🖥️ VPS (Servidor)

## 📊 Status dos Serviços

| Item | Valor |

|------|-------|Para verificar se os containers estão rodando:

| **IP** | 72.60.143.197 |

| **SSH** | `ssh root@72.60.143.197` |```bash

| **OS** | Ubuntu |ssh root@72.60.143.197 "docker ps --filter name=kanbanflow"

| **Docker** | ✅ Instalado |```

| **Traefik** | ✅ Rodando (proxy reverso, SSL) |

### Ver logs:

### Diretórios no servidor

````bash

```# Frontend

/var/www/kanbanflow-pro/ssh root@72.60.143.197 "docker logs kanbanflow-frontend"

├── docker-compose.yml         # Configuração dos containers

└── temp/                      # Código fonte (clone do repo)# Backend

    ├── src/                   # Frontend Reactssh root@72.60.143.197 "docker logs kanbanflow-backend"

    ├── server/                # Backend Express```

    ├── Dockerfile.frontend

    ├── Dockerfile.backend---

    ├── nginx.conf

    └── .env.production## 🔄 Comandos Úteis

````

### Parar aplicação:

---

```bash

## 🐳 Dockerssh root@72.60.143.197 "cd /var/www/kanbanflow-pro && docker compose down"

```

| Item | Valor |

|------|-------|### Iniciar aplicação:

| **Docker Hub User** | jucivanfsantos |

| **Frontend Image** | jucivanfsantos/kanbanflow-frontend:latest |```bash

| **Backend Image** | jucivanfsantos/kanbanflow-backend:latest |ssh root@72.60.143.197 "cd /var/www/kanbanflow-pro && docker compose up -d"

| **Container Frontend** | kanbanflow-frontend |```

| **Container Backend** | kanbanflow-backend |

| **Network** | traefik_public |### Reiniciar aplicação:

| **Volume** | kanban_data → /app/data |

```bash

### Comandos úteisssh root@72.60.143.197 "cd /var/www/kanbanflow-pro && docker compose restart"

```

````bash

# Status dos containers### Atualizar para nova versão:

docker ps --filter name=kanbanflow

```bash

# Logs# 1. Fazer push das novas imagens

docker logs kanbanflow-frontend --tail 50docker build -f Dockerfile.frontend -t jucivanfsantos/kanbanflow-frontend:latest .

docker logs kanbanflow-backend --tail 50docker push jucivanfsantos/kanbanflow-frontend:latest



# Reiniciardocker build -f Dockerfile.backend -t jucivanfsantos/kanbanflow-backend:latest .

cd /var/www/kanbanflow-prodocker push jucivanfsantos/kanbanflow-backend:latest

docker compose restart

# 2. No VPS, fazer pull e reiniciar

# Parar e removerssh root@72.60.143.197 "cd /var/www/kanbanflow-pro && docker compose pull && docker compose up -d"

docker compose down```



# Recriar---

docker compose up -d

```## 📦 Estrutura no VPS



---```

/var/www/kanbanflow-pro/

## 🔗 DNS├── docker-compose.yml

└── temp/  (repositório git clonado)

| Domínio | Tipo | Valor |```

|---------|------|-------|

| *.visiochat.cloud | A | 72.60.143.197 |---

| kanbanflow.visiochat.cloud | A (wildcard) | 72.60.143.197 |

| kanbanapi.visiochat.cloud | A (wildcard) | 72.60.143.197 |## 🎯 Próximos Passos (Opcional)



---Se quiser usar HTTPS com os domínios:



## 🔒 SSL/HTTPS1. Verificar se o Traefik está detectando os containers

2. Aguardar geração dos certificados Let's Encrypt (2-5 minutos)

- **Provedor:** Let's Encrypt (automático via Traefik)3. Acessar via https://kanbanflow.visiochat.cloud

- **Cert Resolver:** `le`

- **Renovação:** Automática pelo Traefik---

- **Traefik Dashboard:** http://72.60.143.197:8082

**Aplicação funcionando! 🎉**

---

## 📡 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/columns` | Listar colunas |
| POST | `/api/columns` | Criar coluna |
| PUT | `/api/columns/:id` | Atualizar coluna |
| DELETE | `/api/columns/:id` | Deletar coluna |
| GET | `/api/tasks` | Listar tarefas |
| POST | `/api/tasks` | Criar tarefa |
| PUT | `/api/tasks/:id` | Atualizar tarefa |
| DELETE | `/api/tasks/:id` | Deletar tarefa |

---

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar frontend (Vite dev server)
npm run dev
# Acessa: http://localhost:5173

# Rodar backend
node server/server.js
# Acessa: http://localhost:3001

# Variáveis de ambiente
# .env.production → VITE_API_URL=https://kanbanapi.visiochat.cloud
# Local usa fallback: http://localhost:3001
````

---

## 📦 Git

| Item                | Valor                                                 |
| ------------------- | ----------------------------------------------------- |
| **Repositório**     | github.com/jucivanfreitas/KanbanFlow-Pro              |
| **Branch produção** | `production`                                          |
| **Branch estável**  | `main`                                                |
| **Workflow**        | Push na `production` → deploy manual (CI/CD pendente) |
