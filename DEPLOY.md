# 🚀 Guia de Deploy em Produção - KanbanFlow Pro

Este guia aborda diferentes cenários de deploy para produção.

---

## 📋 Checklist Pré-Deploy

- [ ] Executar testes localmente
- [ ] Build de produção funcionando
- [ ] Variáveis de ambiente configuradas
- [ ] Backup do código no Git
- [ ] Domínio configurado (se aplicável)
- [ ] SSL/HTTPS configurado

---

## 🔐 Variáveis de Ambiente

### Backend (Server)

Crie um arquivo `.env` na raiz do projeto:

```env
# Servidor
NODE_ENV=production
PORT=3001

# CORS
FRONTEND_URL=https://seu-dominio.com

# Dados
DATA_FILE_PATH=/var/www/kanbanflow-pro/server/data/tasks.json
```

### Frontend (React + Vite)

Crie um arquivo `.env.production`:

```env
VITE_API_URL=https://api.seu-dominio.com
```

---

## 🌐 Opção 1: Deploy em VPS (DigitalOcean, AWS, etc)

### 1. Preparar o Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx
```

### 2. Clonar e Configurar o Projeto

```bash
# Clonar repositório
cd /var/www
sudo git clone https://github.com/jucivanfreitas/KanbanFlow-Pro.git
cd KanbanFlow-Pro

# Instalar dependências
sudo npm install

# Criar arquivo .env
sudo nano .env
# (Cole as variáveis de ambiente)

# Build do frontend
sudo npm run build
```

### 3. Configurar PM2

```bash
# Iniciar servidor com PM2
pm2 start ecosystem.config.js --env production

# Salvar configuração
pm2 save

# Configurar PM2 para iniciar no boot
pm2 startup
```

### 4. Configurar Nginx

Crie: `/etc/nginx/sites-available/kanbanflow-pro`

```nginx
# Backend API
server {
    listen 80;
    server_name api.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Frontend
server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    root /var/www/KanbanFlow-Pro/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# Ativar configuração
sudo ln -s /etc/nginx/sites-available/kanbanflow-pro /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### 5. Configurar SSL com Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com -d api.seu-dominio.com

# Auto-renovação (já configurado automaticamente)
```

---

## ☁️ Opção 2: Deploy no Vercel (Frontend)

### 1. Configurar Projeto

No arquivo `vercel.json` na raiz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "env": {
    "VITE_API_URL": "https://api.seu-dominio.com"
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Deploy

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Configurar Variáveis de Ambiente

No dashboard da Vercel:

- Settings → Environment Variables
- Adicione: `VITE_API_URL=https://api.seu-dominio.com`

---

## 🐳 Opção 3: Deploy com Docker

### 1. Criar Dockerfile

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código
COPY . .

# Build do frontend
RUN npm run build

# Expor portas
EXPOSE 3001

# Comando de inicialização
CMD ["node", "server/server.js"]
```

### 2. Criar docker-compose.yml

```yaml
version: "3.8"

services:
  kanbanflow-pro:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - FRONTEND_URL=https://seu-dominio.com
      - DATA_FILE_PATH=/app/server/data/tasks.json
    volumes:
      - ./server/data:/app/server/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./dist:/usr/share/nginx/html
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - kanbanflow-pro
    restart: unless-stopped
```

### 3. Deploy

```bash
# Build e iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 🌍 Opção 4: Deploy Backend no Railway/Render

### Railway

1. Conecte seu repositório GitHub
2. Configure variáveis de ambiente:
   - `NODE_ENV=production`
   - `PORT=3001`
   - `FRONTEND_URL=https://seu-frontend.vercel.app`
3. Railway detecta automaticamente Node.js e faz deploy

### Render

1. Crie novo Web Service
2. Conecte repositório
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node server/server.js`
4. Adicione variáveis de ambiente

---

## 📊 Monitoramento e Manutenção

### PM2 - Comandos Úteis

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs kanbanflow-pro-api

# Reiniciar
pm2 restart kanbanflow-pro-api

# Parar
pm2 stop kanbanflow-pro-api

# Monitoramento
pm2 monit
```

### Backup Automático dos Dados

Crie um cron job:

```bash
# Editar crontab
crontab -e

# Adicionar (backup diário às 3h da manhã)
0 3 * * * cp /var/www/KanbanFlow-Pro/server/data/tasks.json /var/backups/tasks_$(date +\%Y\%m\%d).json
```

### Logs

```bash
# Ver logs do PM2
pm2 logs --lines 100

# Ver logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 🔒 Segurança

### 1. Firewall

```bash
# UFW
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 2. Atualizações Automáticas

```bash
# Instalar unattended-upgrades
sudo apt install unattended-upgrades

# Configurar
sudo dpkg-reconfigure -plow unattended-upgrades
```

### 3. Rate Limiting no Nginx

Adicione ao nginx.conf:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    server {
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://localhost:3001;
        }
    }
}
```

---

## ⚡ Performance

### 1. Compressão Gzip no Nginx

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

### 2. Cache do Frontend

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

## 🆘 Troubleshooting

### Servidor não inicia

```bash
# Verificar logs
pm2 logs

# Verificar porta em uso
sudo lsof -i :3001

# Verificar permissões
sudo chown -R $USER:$USER /var/www/KanbanFlow-Pro
```

### CORS Error

Verifique no `.env`:

```env
FRONTEND_URL=https://seu-dominio-exato.com
```

### Build falha

```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

---

## 📞 Suporte

- 📧 Email: suporte@datavisio.com.br
- 🐙 GitHub Issues: [https://github.com/jucivanfreitas/KanbanFlow-Pro/issues](https://github.com/jucivanfreitas/KanbanFlow-Pro/issues)

---

**✅ Pronto! Seu KanbanFlow Pro está em produção!** 🚀
