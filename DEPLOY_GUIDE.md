# 🚀 Guia de Deploy - KanbanFlow Pro

## 📋 Pré-requisitos

- ✅ VPS com Docker Swarm configurado
- ✅ Traefik rodando na rede `traefik_public`
- ✅ Domínios apontados para o VPS:
  - `kanbanflow.visiochat.shop` → 67.205.156.248
  - `kanbamapi.visiochat.shop` → 67.205.156.248
- ✅ Conta no Docker Hub: `jucivanfsantos`

---

## 🔐 Configurar Secrets no GitHub

1. Acesse: **Settings → Secrets and variables → Actions → New repository secret**

2. Adicione os seguintes secrets:

```
DOCKER_USERNAME: jucivanfsantos
DOCKER_TOKEN: (seu token do Docker Hub)
VPS_HOST: 67.205.156.248
VPS_SSH_KEY: (conteúdo da chave privada SSH)
```

### Como obter o Docker Token:

1. Acesse: https://hub.docker.com/settings/security
2. Clique em "New Access Token"
3. Nome: `GitHub Actions`
4. Copie o token gerado

### Como obter a chave SSH:

```bash
# No seu computador local
cat ~/.ssh/id_rsa
# Copie TODO o conteúdo (incluindo BEGIN e END)
```

---

## 🏗️ Primeiro Deploy (Manual)

### 1. Conectar no VPS via SSH

```bash
ssh root@67.205.156.248
```

### 2. Verificar Docker Swarm e Traefik

```bash
# Verificar se Swarm está ativo
docker info | grep Swarm

# Verificar rede Traefik
docker network ls | grep traefik_public

# Verificar serviços Traefik
docker service ls | grep traefik
```

### 3. Criar estrutura de diretórios

```bash
mkdir -p /var/www/kanbanflow-pro
cd /var/www/kanbanflow-pro
```

### 4. Fazer login no Docker Hub

```bash
docker login -u jucivanfsantos
# Digite o token quando solicitado
```

### 5. Upload do docker-compose.yml

**No seu computador local:**

```bash
scp docker-compose.yml root@67.205.156.248:/var/www/kanbanflow-pro/
```

### 6. Build e Deploy

**No VPS:**

```bash
cd /var/www/kanbanflow-pro

# Deploy da stack
docker stack deploy -c docker-compose.yml kanbanflow --with-registry-auth
```

### 7. Verificar Deploy

```bash
# Ver serviços
docker stack services kanbanflow

# Ver tarefas (containers)
docker stack ps kanbanflow

# Ver logs do frontend
docker service logs kanbanflow_frontend -f

# Ver logs do backend
docker service logs kanbanflow_backend -f
```

---

## 🔄 Deploy Automático (GitHub Actions)

### Criar branch de produção

```bash
# No seu projeto local
git checkout -b production
git push origin production
```

### Trigger automático

Toda vez que fizer push na branch `production`, o deploy será automático:

```bash
git checkout production
git merge main
git push origin production
```

### Deploy manual via GitHub

1. Acesse: **Actions → Deploy to Production → Run workflow**
2. Selecione branch: `production`
3. Clique em "Run workflow"

---

## 🔍 Verificar Aplicação

### Testar endpoints

```bash
# Frontend
curl -I https://kanbanflow.visiochat.shop

# Backend Health
curl https://kanbamapi.visiochat.shop/api/health

# Backend API
curl https://kanbamapi.visiochat.shop/api/kanban
```

### Acessar no navegador

- **Frontend:** https://kanbanflow.visiochat.shop
- **Backend API:** https://kanbamapi.visiochat.shop/api/health

---

## 📊 Monitoramento

### Ver status dos serviços

```bash
docker stack services kanbanflow
```

### Ver logs em tempo real

```bash
# Frontend
docker service logs kanbanflow_frontend -f --tail 100

# Backend
docker service logs kanbanflow_backend -f --tail 100
```

### Ver estatísticas de recursos

```bash
docker stats
```

---

## 🔧 Comandos Úteis

### Restart de serviços

```bash
# Restart frontend
docker service update --force kanbanflow_frontend

# Restart backend
docker service update --force kanbanflow_backend

# Restart tudo
docker stack deploy -c docker-compose.yml kanbanflow --with-registry-auth
```

### Escalar serviços

```bash
# Aumentar replicas do frontend
docker service scale kanbanflow_frontend=2

# Voltar para 1 replica
docker service scale kanbanflow_frontend=1
```

### Ver informações detalhadas

```bash
# Inspecionar serviço
docker service inspect kanbanflow_frontend

# Ver tarefas com filtro
docker stack ps kanbanflow --no-trunc --filter "desired-state=running"
```

---

## 🗑️ Remover Deploy

### Remover stack completo

```bash
docker stack rm kanbanflow
```

### Remover volume de dados (CUIDADO!)

```bash
# Listar volumes
docker volume ls | grep kanbanflow

# Remover volume
docker volume rm kanbanflow_kanban_data
```

---

## 🔄 Fazer Rollback

### Via imagem anterior

```bash
# Listar imagens
docker images | grep kanbanflow

# Atualizar para imagem específica
docker service update --image jucivanfsantos/kanbanflow-frontend:SHA kanbanflow_frontend
```

### Via redeploy

```bash
# Voltar código no Git
git checkout <commit-anterior>
git push origin production --force
```

---

## 🐛 Troubleshooting

### Serviço não inicia

```bash
# Ver logs de erro
docker service ps kanbanflow_frontend --no-trunc

# Ver eventos
docker events --filter service=kanbanflow_frontend
```

### Problemas de rede

```bash
# Verificar se container está na rede Traefik
docker service inspect kanbanflow_frontend | grep Networks

# Reconectar na rede
docker network connect traefik_public $(docker ps -q -f name=kanbanflow_frontend)
```

### SSL não funciona

```bash
# Ver logs do Traefik
docker service logs traefik_traefik -f | grep kanbanflow

# Verificar certificados
docker exec $(docker ps -q -f name=traefik) ls -la /acme.json
```

### CORS Error

```bash
# Verificar variável de ambiente do backend
docker service inspect kanbanflow_backend | grep FRONTEND_URL

# Atualizar variável
docker service update --env-add FRONTEND_URL=https://kanbanflow.visiochat.shop kanbanflow_backend
```

### Dados não persistem

```bash
# Verificar volume
docker volume inspect kanbanflow_kanban_data

# Ver onde está montado
docker service inspect kanbanflow_backend | grep Mounts -A 10
```

---

## 📦 Backup e Restore

### Fazer backup dos dados

```bash
# Criar backup
docker run --rm -v kanbanflow_kanban_data:/data -v $(pwd):/backup alpine tar czf /backup/kanbanflow-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### Restaurar backup

```bash
# Restaurar
docker run --rm -v kanbanflow_kanban_data:/data -v $(pwd):/backup alpine tar xzf /backup/kanbanflow-backup-YYYYMMDD.tar.gz -C /data
```

---

## 🎯 Checklist de Deploy

- [ ] Secrets configurados no GitHub
- [ ] Domínios apontados para o VPS
- [ ] Docker Swarm ativo no VPS
- [ ] Traefik rodando com rede `traefik_public`
- [ ] Login no Docker Hub realizado no VPS
- [ ] Branch `production` criada
- [ ] Push para `production` realizado
- [ ] Frontend acessível via HTTPS
- [ ] Backend API respondendo
- [ ] Health checks funcionando
- [ ] CORS configurado corretamente
- [ ] Dados persistindo no volume

---

## 📞 Suporte

**E-mail:** devdatavisio@gmail.com

**Logs importantes para debug:**

```bash
docker service logs kanbanflow_frontend --tail 100
docker service logs kanbanflow_backend --tail 100
docker service ps kanbanflow_frontend --no-trunc
docker service ps kanbanflow_backend --no-trunc
```

---

✅ **Deploy completo! Sua aplicação está rodando em produção!** 🚀
