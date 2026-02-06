# 🚀 Próximos Passos - Deploy KanbanFlow Pro

## ✅ Arquivos Criados

1. **Dockerfile.frontend** - Build otimizado do React
2. **Dockerfile.backend** - Container Node.js/Express
3. **nginx.conf** - Configuração Nginx para SPA
4. **docker-compose.yml** - Stack Docker Swarm com Traefik
5. **.env.production** - Variáveis de ambiente
6. **.dockerignore** - Otimização de build
7. **.github/workflows/deploy.yml** - CI/CD automático
8. **DEPLOY_GUIDE.md** - Documentação completa
9. **server/server.js** - Atualizado com health check e CORS

---

## 🎯 O QUE FAZER AGORA

### 1️⃣ Configurar Secrets no GitHub (URGENTE!)

Acesse: https://github.com/jucivanfreitas/KanbanFlow-Pro/settings/secrets/actions

Adicione estes 4 secrets:

```
Nome: DOCKER_USERNAME
Valor: jucivanfsantos

Nome: DOCKER_TOKEN
Valor: (obtenha em https://hub.docker.com/settings/security)

Nome: VPS_HOST
Valor: 67.205.156.248

Nome: VPS_SSH_KEY
Valor: (cole a chave privada SSH completa)
```

**Como obter a chave SSH:**

```powershell
# No PowerShell
cat ~\.ssh\id_rsa
# Copie TUDO (incluindo BEGIN e END PRIVATE KEY)
```

---

### 2️⃣ Commit e Push dos Arquivos

```powershell
# No seu projeto local
git add .
git commit -m "feat: Configuração completa de deploy com Docker Swarm + Traefik"
git push origin main

# Criar branch de produção
git checkout -b production
git push origin production
```

---

### 3️⃣ Conectar no VPS e Preparar

```powershell
ssh root@67.205.156.248
```

**No VPS, execute:**

```bash
# Criar diretório
mkdir -p /var/www/kanbanflow-pro
cd /var/www/kanbanflow-pro

# Login no Docker Hub
docker login -u jucivanfsantos
# Cole o token quando solicitado

# Verificar se Swarm está ativo
docker info | grep Swarm
# Deve mostrar: "Swarm: active"

# Verificar rede Traefik
docker network ls | grep traefik_public
# Deve aparecer a rede
```

---

### 4️⃣ Fazer Primeiro Deploy Manual

**No seu computador:**

```powershell
# Upload do docker-compose
scp docker-compose.yml root@67.205.156.248:/var/www/kanbanflow-pro/
```

**No VPS:**

```bash
cd /var/www/kanbanflow-pro

# Deploy da stack
docker stack deploy -c docker-compose.yml kanbanflow --with-registry-auth

# Aguardar 30 segundos e verificar
docker stack services kanbanflow
docker stack ps kanbanflow
```

---

### 5️⃣ Verificar Funcionamento

**Testar endpoints:**

```bash
# No VPS ou no seu computador
curl https://kanbanflow.visiochat.shop
curl https://kanbamapi.visiochat.shop/api/health
```

**No navegador:**

- Frontend: https://kanbanflow.visiochat.shop
- Backend: https://kanbamapi.visiochat.shop/api/health

---

## ⚠️ ATENÇÃO - Possíveis Problemas

### Problema 1: Domínios não resolvem

**Verificar DNS:**

```powershell
nslookup kanbanflow.visiochat.shop
nslookup kanbamapi.visiochat.shop
```

**Solução:** Aguardar propagação DNS (até 24h) ou configurar wildcard:

```
Tipo: A
Nome: *
Valor: 67.205.156.248
TTL: 14400
```

### Problema 2: Traefik não roteia

**Verificar labels do Traefik:**

```bash
docker service inspect kanbanflow_frontend | grep traefik
```

**Solução:** Ver logs do Traefik:

```bash
docker service logs traefik_traefik -f | grep kanbanflow
```

### Problema 3: Certificado SSL não gera

**Verificar certificado:**

```bash
docker exec $(docker ps -q -f name=traefik) cat /acme.json
```

**Solução:** Aguardar 2-5 minutos. Let's Encrypt demora um pouco.

---

## 📊 Comandos de Monitoramento

```bash
# Status dos serviços
docker stack services kanbanflow

# Logs em tempo real
docker service logs kanbanflow_frontend -f
docker service logs kanbanflow_backend -f

# Verificar health
docker service ps kanbanflow --filter "desired-state=running"
```

---

## 🔄 Deploy Automático Futuro

Após configurar os secrets, todo push na branch `production` fará deploy automático:

```powershell
git checkout production
git merge main
git push origin production
```

GitHub Actions fará:

1. ✅ Build e testes
2. ✅ Build das imagens Docker
3. ✅ Push para Docker Hub
4. ✅ Deploy no VPS
5. ✅ Health check

---

## 📝 Checklist Final

- [ ] Secrets configurados no GitHub
- [ ] Arquivos commitados e pushed
- [ ] Branch `production` criada
- [ ] Conectado no VPS via SSH
- [ ] Docker login realizado no VPS
- [ ] docker-compose.yml enviado para VPS
- [ ] Stack deployed com `docker stack deploy`
- [ ] Serviços rodando (verificado com `docker stack services`)
- [ ] Frontend acessível via HTTPS
- [ ] Backend respondendo no health check
- [ ] Dados persistindo (criar uma tarefa de teste)

---

## 🆘 Se Algo Der Errado

1. **Ver logs:**

   ```bash
   docker service logs kanbanflow_frontend --tail 100
   docker service logs kanbanflow_backend --tail 100
   ```

2. **Remover e redeployar:**

   ```bash
   docker stack rm kanbanflow
   # Aguardar 30 segundos
   docker stack deploy -c docker-compose.yml kanbanflow --with-registry-auth
   ```

3. **Me envie:**
   - Logs dos serviços
   - Output de `docker stack ps kanbanflow --no-trunc`
   - Output de `docker stack services kanbanflow`

---

## 🎉 Sucesso!

Se tudo funcionou, você terá:

✅ Frontend React rodando em: https://kanbanflow.visiochat.shop
✅ Backend API rodando em: https://kanbamapi.visiochat.shop
✅ SSL automático via Let's Encrypt
✅ Deploy automático via GitHub Actions
✅ Dados persistentes em volume Docker
✅ Health checks configurados
✅ CORS configurado corretamente

---

**Está pronto para começar?** 🚀

Siga os passos de 1 a 5 nesta ordem e me avise se tiver algum problema!
