# 🚀 Guia de Deploy - KanbanFlow Pro

## 📋 Pré-requisitos

- VPS com Docker instalado
- Traefik rodando como proxy reverso na rede `traefik_public`
- Domínios DNS apontando para o IP do VPS:
  - `kanbanflow.visiochat.cloud` → `<VPS_IP>`
  - `kanbanapi.visiochat.cloud` → `<VPS_IP>`
- Conta Docker Hub (ex: `<dockerhub-user>`)

> ⚠️ **Segurança:** Nunca commite IPs, senhas ou chaves SSH no repositório.
> Configure informações sensíveis via variáveis de ambiente ou GitHub Secrets.

---

## 🏗️ Arquitetura de Deploy

```
Internet
  │
  ├── https://kanbanflow.visiochat.cloud
  │       ↓
  │   [Traefik :443] ──→ [kanbanflow-frontend :80 (Nginx)]
  │
  ├── https://kanbanapi.visiochat.cloud
  │       ↓
  │   [Traefik :443] ──→ [kanbanflow-backend :3001 (Express)]
  │
  └── Rede: traefik_public (overlay)
```

**Importante:** O Traefik roda em modo Docker (não Swarm), portanto os serviços são iniciados via `docker compose` com **labels no nível do container** (não dentro de `deploy`).

---

## 📦 Primeiro Deploy (Manual)

### 1. Conectar no VPS

```bash
ssh <user>@<VPS_IP>
```

### 2. Preparar diretórios

```bash
mkdir -p /var/www/kanbanflow-pro
cd /var/www/kanbanflow-pro

# Clonar repositório
git clone https://github.com/jucivanfreitas/KanbanFlow-Pro.git temp
cd temp
git checkout production
```

### 3. Build das imagens

```bash
cd /var/www/kanbanflow-pro/temp

# Build frontend (multi-stage: node build + nginx)
docker build -f Dockerfile.frontend -t <dockerhub-user>/kanbanflow-frontend:latest .

# Build backend
docker build -f Dockerfile.backend -t <dockerhub-user>/kanbanflow-backend:latest .
```

### 4. Copiar docker-compose e iniciar

```bash
cp docker-compose.yml /var/www/kanbanflow-pro/
cd /var/www/kanbanflow-pro

# Iniciar containers
docker compose up -d

# Verificar status
docker ps --filter name=kanbanflow
```

### 5. Verificar funcionamento

```bash
# Health check do backend
curl -s https://kanbanapi.visiochat.cloud/api/health

# Frontend
curl -Ik https://kanbanflow.visiochat.cloud
```

---

## 🔄 Atualizar Deploy

Quando fizer alterações no código e quiser atualizar a produção:

### Via SSH direto

```bash
ssh <user>@<VPS_IP>

# Atualizar código
cd /var/www/kanbanflow-pro/temp
git pull origin production

# Rebuild das imagens
docker build -f Dockerfile.frontend -t <dockerhub-user>/kanbanflow-frontend:latest --no-cache .
docker build -f Dockerfile.backend -t <dockerhub-user>/kanbanflow-backend:latest --no-cache .

# Recriar containers
cd /var/www/kanbanflow-pro
docker rm -f kanbanflow-frontend kanbanflow-backend
docker compose up -d
```

### Via computador local (scp)

```bash
# Enviar arquivos alterados
scp docker-compose.yml <user>@<VPS_IP>:/var/www/kanbanflow-pro/
scp -r src/ server/ Dockerfile.* nginx.conf .env.production <user>@<VPS_IP>:/var/www/kanbanflow-pro/temp/

# Rebuild no VPS
ssh <user>@<VPS_IP> "cd /var/www/kanbanflow-pro/temp && \
  docker build -f Dockerfile.frontend -t <dockerhub-user>/kanbanflow-frontend:latest --no-cache . && \
  docker build -f Dockerfile.backend -t <dockerhub-user>/kanbanflow-backend:latest --no-cache . && \
  cd .. && docker rm -f kanbanflow-frontend kanbanflow-backend && docker compose up -d"
```

---

## 🐛 Troubleshooting

### Container não inicia / unhealthy

```bash
# Ver logs
docker logs kanbanflow-frontend --tail 50
docker logs kanbanflow-backend --tail 50

# Verificar health
docker ps --format 'table {{.Names}}\t{{.Status}}'
```

### Traefik retorna 404

O Traefik roda em modo Docker (não Swarm). As labels devem estar no **nível do container** (não em `deploy.labels`):

```yaml
# ✅ CORRETO - labels no container
services:
  frontend:
    labels:
      - "traefik.enable=true"

# ❌ ERRADO - labels em deploy (só funciona em Swarm mode)
services:
  frontend:
    deploy:
      labels:
        - "traefik.enable=true"
```

O container também precisa estar **healthy** — Traefik ignora containers unhealthy.

### Erro CORS no navegador

Verificar se `FRONTEND_URL` no backend corresponde à URL real do frontend:

```bash
docker inspect kanbanflow-backend | grep FRONTEND_URL
# Deve mostrar: https://kanbanflow.visiochat.cloud
```

### Frontend chama localhost:3001

O frontend é um build estático (SPA). A variável `VITE_API_URL` precisa estar definida **no momento do build**, não em runtime:

```bash
# Verificar .env.production antes do build
cat .env.production
# Deve conter: VITE_API_URL=https://kanbanapi.visiochat.cloud

# Rebuild necessário após alterar .env.production
docker build -f Dockerfile.frontend -t <dockerhub-user>/kanbanflow-frontend:latest --no-cache .
```

### Dados não persistem

O volume `kanban_data` persiste em `/app/data/tasks.json`:

```bash
# Verificar volume
docker volume inspect kanbanflow-pro_kanban_data

# Ver dados atuais
docker exec kanbanflow-backend cat /app/data/tasks.json
```

---

## 📊 Monitoramento

```bash
# Status dos containers
docker ps --filter name=kanbanflow

# Logs em tempo real
docker logs -f kanbanflow-frontend
docker logs -f kanbanflow-backend

# Uso de recursos
docker stats kanbanflow-frontend kanbanflow-backend
```

---

## 🗑️ Remover Deploy

```bash
cd /var/www/kanbanflow-pro
docker compose down

# Remover dados (CUIDADO!)
docker volume rm kanbanflow-pro_kanban_data
```

---

## ✅ Checklist de Deploy

- [ ] VPS acessível via SSH
- [ ] Docker instalado e rodando
- [ ] Traefik configurado na rede `traefik_public`
- [ ] DNS: `kanbanflow.visiochat.cloud` → IP do VPS
- [ ] DNS: `kanbanapi.visiochat.cloud` → IP do VPS
- [ ] Imagens Docker construídas
- [ ] Containers rodando e healthy
- [ ] HTTPS/SSL funcionando via Let's Encrypt
- [ ] CORS configurado (FRONTEND_URL)
- [ ] API respondendo em /api/health
- [ ] Dados persistindo em volume Docker
