#  KanbanFlow Pro

> **Sistema profissional de gerenciamento de tarefas em Kanban com interface moderna e intuitiva**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-21.3.0-339933.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.21-646cff.svg)](https://vitejs.dev/)

**KanbanFlow Pro** é uma solução completa e gratuita para gerenciamento ágil de tarefas, oferecendo um quadro Kanban totalmente personalizável com recursos avançados de rastreamento e organização.

---

##  Características Principais

###  **Quadro Kanban Dinâmico**

- **Colunas Personalizáveis:** Crie, edite e delete colunas conforme seu fluxo de trabalho
- **Drag & Drop:** Arraste tarefas entre colunas de forma intuitiva
- **Fluxo Flexível:** Backlog, In Progress, Done e muito mais - você decide!

###  **Sistema de Datas Inteligente**

- **Data de Criação:** Registro automático quando a tarefa é criada
- **Data de Previsão:** Defina prazos para suas entregas
- **Data de Conclusão:** Marcação automática ao completar tarefas
- **Indicadores Visuais:** Cores que mudam baseadas no status:
  -  **Vermelho:** Tarefa atrasada
  -  **Laranja:** Vencimento próximo (2 dias)
  -  **Azul:** No prazo
  -  **Verde:** Concluída

###  **Detalhes Completos de Tarefas**

- Página dedicada para cada tarefa com editor completo
- Campos de título, descrição detalhada e datas
- Mova tarefas entre colunas diretamente da tela de detalhes
- Marcar como completa/reabrir com um clique
- Exclusão segura com confirmação

###  **Interface Moderna**

- Design responsivo para desktop e mobile
- Gradientes e efeitos visuais elegantes
- Experiência de usuário otimizada
- Navegação fluida com React Router

---

##  Tecnologias Utilizadas

| Camada           | Tecnologia           | Versão |
| ---------------- | -------------------- | ------ |
| **Frontend**     | React                | 19.2.0 |
| **Build Tool**   | Vite                 | 5.4.21 |
| **Roteamento**   | React Router DOM     | 7.x    |
| **Backend**      | Node.js + Express    | -      |
| **Persistência** | JSON File Storage    | -      |
| **API**          | RESTful Architecture | -      |

---

##  Requisitos do Sistema

Antes de instalar, certifique-se de ter:

- **Node.js:** versão 20.0.0 ou superior ([Download aqui](https://nodejs.org/))
- **npm:** versão 10.0.0 ou superior (incluído com Node.js)
- **Sistema Operacional:** Windows, macOS ou Linux
- **Navegador:** Chrome, Firefox, Edge ou Safari (versões atuais)

---

##  Instalação e Configuração

### 1 Clone o Repositório

```bash
git clone https://github.com/jucivanfreitas/KanbanFlow-Pro.git
cd KanbanFlow-Pro
```

### 2 Instale as Dependências

```bash
npm install
```

Este comando instalará todas as dependências necessárias tanto para o frontend quanto para o backend.

---

##  Como Executar a Aplicação

### Opção 1: Executar Backend e Frontend Separadamente

**Terminal 1 - Iniciar o Backend (API):**

```bash
npm run server
```

 Servidor rodando em: ```http://localhost:3001```

**Terminal 2 - Iniciar o Frontend:**

```bash
npm run dev
```

 Aplicação disponível em: ```http://localhost:5173```

### Opção 2: Executar em Modo Desenvolvimento Completo

Em sistemas Unix/Linux/Mac:

```bash
npm run server & npm run dev
```

Em Windows PowerShell:

```powershell
Start-Process npm -ArgumentList "run server" -NoNewWindow; npm run dev
```

---

##  Deploy em Produção

### **Backend (Servidor Node.js)**

1. Configure as variáveis de ambiente:

```bash
PORT=3001
NODE_ENV=production
```

2. Execute o servidor:

```bash
npm run server
```

**Recomendações para produção:**

- Use PM2 para gerenciamento de processos
- Configure CORS adequadamente
- Implemente HTTPS
- Configure backup automático do arquivo ```tasks.json```

### **Frontend (React + Vite)**

1. Build para produção:

```bash
npm run build
```

2. Os arquivos otimizados estarão em ```dist/```

3. Sirva os arquivos estáticos com:
   - **Nginx**
   - **Apache**
   - **Vercel** (recomendado)
   - **Netlify**

**Exemplo de configuração Nginx:**

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    root /caminho/para/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
    }
}
```

---

##  Documentação da API

### **Kanban Board**

| Método | Endpoint      | Descrição                          |
| ------ | ------------- | ---------------------------------- |
| ```GET```  | ```/api/kanban``` | Retorna todas as colunas e tarefas |

### **Tarefas**

| Método   | Endpoint         | Descrição                 |
| -------- | ---------------- | ------------------------- |
| ```GET```    | ```/api/tasks```     | Lista todas as tarefas    |
| ```POST```   | ```/api/tasks```     | Cria nova tarefa          |
| ```PUT```    | ```/api/tasks/:id``` | Atualiza tarefa existente |
| ```DELETE``` | ```/api/tasks/:id``` | Remove uma tarefa         |

### **Colunas**

| Método   | Endpoint           | Descrição                                 |
| -------- | ------------------ | ----------------------------------------- |
| ```POST```   | ```/api/columns```     | Cria nova coluna                          |
| ```PUT```    | ```/api/columns/:id``` | Atualiza nome da coluna                   |
| ```DELETE``` | ```/api/columns/:id``` | Remove coluna (move tarefas para Backlog) |

### **Exemplo de Payload - Criar Tarefa**

```json
{
  "title": "Implementar autenticação",
  "description": "Adicionar sistema de login com JWT",
  "columnId": 1,
  "dueDate": "2026-02-15T23:59:59.000Z"
}
```

---

##  Estrutura do Projeto

```
KanbanFlow-Pro/
 server/
    data/
       tasks.json              # Persistência de dados
    server.js                   # API Express
 src/
    Components/
       KanbanBoard.jsx         # Quadro Kanban principal
       KanbanBoard.css
       KanbanColumn.jsx        # Componente de coluna
       KanbanColumn.css
       TaskCard.jsx            # Card de tarefa
       TaskCard.css
       TaskDetails.jsx         # Página de detalhes
       TaskDetails.css
       AddTask.jsx             # Formulário de nova tarefa
       Header.tsx              # Cabeçalho
       Footer.tsx              # Rodapé
       ...
    App.jsx                     # Componente raiz + rotas
    main.jsx                    # Entry point
    index.css
 package.json
 vite.config.js
 README.md
```

---

##  Casos de Uso

- **Desenvolvimento de Software:** Gerencie sprints e backlog
- **Marketing:** Organize campanhas e conteúdos
- **Vendas:** Acompanhe pipeline de vendas
- **Projetos Pessoais:** Planeje seus objetivos
- **Estudos:** Organize materiais e cronogramas
- **Freelancers:** Gerencie múltiplos clientes

---

##  Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (```git checkout -b feature/MinhaFeature```)
3. Commit suas mudanças (```git commit -m 'Adiciona MinhaFeature'```)
4. Push para a branch (```git push origin feature/MinhaFeature```)
5. Abra um Pull Request

---

##  Licença

Este projeto está licenciado sob a **Licença MIT** - veja os detalhes abaixo:

###  Uso Gratuito e Livre

Você tem permissão para:

-  Usar comercialmente
-  Modificar o código
-  Distribuir
-  Uso privado

###  Condições

**É OBRIGATÓRIO manter os créditos do autor original:**

```
Copyright (c) 2026 Jucivan Freitas - Datavisio
Consultoria web e análise de dados
```

**Em todas as cópias ou partes substanciais do software, você deve:**

1. Incluir o aviso de copyright acima
2. Incluir a licença MIT completa
3. Dar créditos ao autor original na documentação

###  Licença MIT Completa

```
MIT License

Copyright (c) 2026 Jucivan Freitas - Datavisio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

##  Autor

**Jucivan Freitas**

-  Email: contato@datavisio.com.br
-  Website: [www.datavisio.com.br](https://www.datavisio.com.br)
-  LinkedIn: [linkedin.com/in/jucivan-freitas](https://linkedin.com/in/jucivan-freitas)
-  GitHub: [@jucivanfreitas](https://github.com/jucivanfreitas)

###  Datavisio

**Consultoria Web e Análise de Dados**

Transformando dados em decisões inteligentes desde 2026.

---

##  Mostre seu apoio

Se este projeto foi útil para você, considere:

-  Dar uma estrela no GitHub
-  Reportar bugs e sugerir melhorias
-  Compartilhar com sua rede
-  [Apoiar o desenvolvedor](https://www.buymeacoffee.com/jucivan)

---

##  Suporte

Encontrou um problema? Precisa de ajuda?

-  [Abra uma Issue](https://github.com/jucivanfreitas/KanbanFlow-Pro/issues)
-  [Discussões](https://github.com/jucivanfreitas/KanbanFlow-Pro/discussions)
-  Email: suporte@datavisio.com.br

---

<div align="center">

** KanbanFlow Pro** - Gerencie suas tarefas com elegância e eficiência

Feito com  por [Jucivan Freitas](https://github.com/jucivanfreitas) |  2026 Datavisio

</div>
