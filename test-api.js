// Script de teste para verificar se a API está gravando corretamente

async function testAPI() {
  const baseURL = 'http://localhost:3001/api/tasks';

  try {
    console.log('🧪 Testando API...\n');

    // 1. Listar tarefas atuais
    console.log('1️⃣ Listando tarefas atuais...');
    let response = await fetch(baseURL);
    let tasks = await response.json();
    console.log('Tarefas:', tasks);
    console.log('');

    // 2. Adicionar uma nova tarefa
    console.log('2️⃣ Adicionando nova tarefa...');
    response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: 'Teste de gravação - ' + new Date().toLocaleTimeString() }),
    });

    if (response.ok) {
      const newTask = await response.json();
      console.log('✅ Tarefa adicionada:', newTask);
    } else {
      console.log('❌ Erro ao adicionar tarefa:', await response.text());
    }
    console.log('');

    // 3. Listar tarefas novamente
    console.log('3️⃣ Listando tarefas após adição...');
    response = await fetch(baseURL);
    tasks = await response.json();
    console.log('Tarefas:', tasks);
    console.log('');

    console.log('✅ Teste concluído! Verifique o arquivo server/data/tasks.json');

  } catch (error) {
    console.error('❌ Erro ao testar API:', error);
    console.log('\n⚠️ Certifique-se de que o servidor está rodando (npm run server)');
  }
}

testAPI();
