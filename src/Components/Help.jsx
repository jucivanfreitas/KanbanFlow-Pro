import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Help.css';

function Help() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inicio');
  const [searchTerm, setSearchTerm] = useState('');

  const sections = {
    inicio: {
      title: '🚀 Começando com o KanbanFlow Pro',
      icon: '🎯',
      content: [
        {
          question: 'O que é o KanbanFlow Pro?',
          answer: 'KanbanFlow Pro é uma ferramenta moderna de gerenciamento de tarefas baseada na metodologia Kanban. Organize suas atividades, acompanhe prazos e aumente sua produtividade com uma interface intuitiva e elegante.'
        },
        {
          question: 'Como criar minha primeira tarefa?',
          answer: 'É muito simples! Clique no botão "+ Nova Tarefa" no topo da página, preencha o título, descrição (opcional), selecione a coluna e defina um prazo. Pronto! Sua tarefa foi criada.'
        },
        {
          question: 'O que são as colunas coloridas?',
          answer: 'As colunas representam os estágios do seu fluxo de trabalho. Por padrão, temos: Backlog (ideias futuras), In Progress (em andamento) e Done (concluído). Você pode personalizar e criar suas próprias colunas!'
        }
      ]
    },
    quadro: {
      title: '📊 Gerenciando o Quadro Kanban',
      icon: '📋',
      content: [
        {
          question: 'Como mover tarefas entre colunas?',
          answer: 'Simples! Clique e arraste a tarefa para a coluna desejada. Ou abra os detalhes da tarefa e use o seletor de coluna para movê-la. O sistema salva automaticamente suas mudanças.'
        },
        {
          question: 'Como criar uma nova coluna?',
          answer: 'Clique no botão "+ Nova Coluna" à direita do quadro. Dê um nome descritivo (ex: "Em Revisão", "Aguardando") e pronto! Sua coluna personalizada está criada.'
        },
        {
          question: 'Posso renomear ou deletar colunas?',
          answer: 'Sim! Passe o mouse sobre o título da coluna para ver os botões de edição (✏️) e exclusão (🗑️). Ao deletar uma coluna, todas as tarefas são movidas automaticamente para o Backlog.'
        },
        {
          question: 'Como organizar as tarefas dentro de uma coluna?',
          answer: 'Você pode arrastar e soltar as tarefas para reordená-las dentro da mesma coluna. Coloque as mais urgentes no topo para facilitar a visualização!'
        }
      ]
    },
    tarefas: {
      title: '✅ Trabalhando com Tarefas',
      icon: '📝',
      content: [
        {
          question: 'Como ver os detalhes de uma tarefa?',
          answer: 'Clique em qualquer tarefa no quadro para abrir a página de detalhes. Lá você encontra todas as informações: título, descrição completa, datas, status e ações disponíveis.'
        },
        {
          question: 'O que significam as cores das tarefas?',
          answer: '🔴 Vermelho: Tarefa atrasada (prazo vencido)\n🟠 Laranja: Urgente (vence em até 2 dias)\n🔵 Azul: No prazo (mais de 2 dias até o vencimento)\n🟢 Verde: Tarefa concluída\n\nAs cores ajudam a identificar prioridades rapidamente!'
        },
        {
          question: 'Como editar uma tarefa?',
          answer: 'Abra os detalhes da tarefa, faça as alterações desejadas nos campos (título, descrição, prazo, coluna) e clique em "Salvar Alterações". Você será redirecionado ao quadro automaticamente.'
        },
        {
          question: 'Como marcar uma tarefa como concluída?',
          answer: 'Na página de detalhes da tarefa, clique no botão "✓ Marcar como Completa". A tarefa mudará para verde e receberá a data de conclusão automaticamente.'
        },
        {
          question: 'Posso reabrir uma tarefa concluída?',
          answer: 'Sim! Abra os detalhes da tarefa concluída e clique em "↻ Reabrir Tarefa". Ela voltará ao status ativo e você poderá continuar trabalhando nela.'
        },
        {
          question: 'Como deletar uma tarefa?',
          answer: 'Você pode deletar diretamente do card (botão 🗑️) ou na página de detalhes. O sistema sempre pedirá confirmação antes de excluir para evitar perdas acidentais.'
        }
      ]
    },
    datas: {
      title: '📅 Sistema de Datas e Prazos',
      icon: '⏰',
      content: [
        {
          question: 'Quais datas são registradas?',
          answer: 'Três datas importantes:\n• Data de Criação: Registrada automaticamente ao criar a tarefa\n• Data de Previsão: Prazo que você define\n• Data de Conclusão: Registrada automaticamente ao completar'
        },
        {
          question: 'É obrigatório definir um prazo?',
          answer: 'Não! O campo de prazo é opcional. Porém, recomendamos definir prazos para tarefas importantes - isso ativa o sistema de alertas visuais por cores.'
        },
        {
          question: 'Posso mudar o prazo depois?',
          answer: 'Sim! Abra os detalhes da tarefa, altere a data de previsão e salve. O sistema recalcula automaticamente o status e ajusta a cor da tarefa.'
        },
        {
          question: 'O que acontece quando o prazo vence?',
          answer: 'A tarefa fica vermelha (🔴) para chamar sua atenção. Isso não impede você de continuar trabalhando - é apenas um alerta visual para priorização.'
        }
      ]
    },
    dicas: {
      title: '💡 Dicas e Melhores Práticas',
      icon: '⭐',
      content: [
        {
          question: 'Como usar o Kanban de forma eficiente?',
          answer: '1. Mantenha o Backlog organizado com ideias futuras\n2. Limite tarefas "In Progress" (foque em poucas de cada vez)\n3. Mova para "Done" regularmente para sensação de progresso\n4. Use descrições claras e objetivas\n5. Defina prazos realistas'
        },
        {
          question: 'Sugestões de colunas personalizadas',
          answer: 'Para desenvolvimento: "Backlog → Em Desenvolvimento → Code Review → Testes → Deploy → Done"\n\nPara marketing: "Ideias → Planejamento → Criação → Revisão → Publicação → Análise"\n\nPara estudos: "A Estudar → Estudando → Praticando → Revisão → Dominado"'
        },
        {
          question: 'Atalhos e produtividade',
          answer: '• Use descrições detalhadas para não esquecer contexto\n• Tarefas urgentes: coloque prazo de 1-2 dias\n• Revise o quadro diariamente pela manhã\n• Celebre tarefas concluídas (motivação!)\n• Delete tarefas obsoletas regularmente'
        },
        {
          question: 'Organizando múltiplos projetos',
          answer: 'Use prefixos nos títulos das tarefas:\n• [SITE] Implementar login\n• [APP] Corrigir bug do menu\n• [ESTUDO] Revisar React Hooks\n\nOu crie colunas específicas por projeto!'
        }
      ]
    },
    faq: {
      title: '❓ Perguntas Frequentes',
      icon: '🤔',
      content: [
        {
          question: 'Meus dados são salvos?',
          answer: 'Sim! Todas as alterações são salvas automaticamente no servidor. Você pode fechar o navegador e voltar depois - tudo estará lá.'
        },
        {
          question: 'Posso usar em dispositivos móveis?',
          answer: 'Absolutamente! A interface é totalmente responsiva. Funciona perfeitamente em smartphones e tablets. Arraste e solte funciona em telas touch!'
        },
        {
          question: 'Quantas tarefas posso criar?',
          answer: 'Sem limites! Crie quantas tarefas e colunas precisar. Recomendamos manter o quadro limpo (arquive/delete tarefas antigas) para melhor performance.'
        },
        {
          question: 'Como reportar bugs ou sugerir melhorias?',
          answer: 'Entre em contato através do email: suporte@datavisio.com.br ou abra uma issue no GitHub. Adoramos feedback dos usuários!'
        },
        {
          question: 'O KanbanFlow Pro é gratuito?',
          answer: 'Sim! É 100% gratuito e open source sob licença MIT. Você pode usar, modificar e até contribuir com o projeto no GitHub.'
        }
      ]
    }
  };

  const filteredSections = () => {
    if (!searchTerm) return sections;
    
    const filtered = {};
    Object.keys(sections).forEach(key => {
      const section = sections[key];
      const matchingContent = section.content.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingContent.length > 0) {
        filtered[key] = {
          ...section,
          content: matchingContent
        };
      }
    });
    
    return filtered;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  return (
    <div className="help-container">
      <div className="help-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Voltar ao Quadro
        </button>
        <h1>📚 Central de Ajuda</h1>
        <p className="help-subtitle">
          Aprenda tudo sobre o KanbanFlow Pro e torne-se um mestre em produtividade!
        </p>
      </div>

      <div className="help-search">
        <input
          type="text"
          placeholder="🔍 Buscar ajuda... (ex: como criar tarefa, cores, prazos)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="btn-clear-search"
            onClick={() => setSearchTerm('')}
          >
            ✕
          </button>
        )}
      </div>

      <div className="help-content">
        {!searchTerm && (
          <div className="help-tabs">
            {Object.keys(sections).map(key => (
              <button
                key={key}
                className={`help-tab ${activeTab === key ? 'active' : ''}`}
                onClick={() => handleTabClick(key)}
              >
                <span className="tab-icon">{sections[key].icon}</span>
                <span className="tab-label">{sections[key].title.replace(/^[^\s]+ /, '')}</span>
              </button>
            ))}
          </div>
        )}

        <div className="help-sections">
          {Object.entries(filteredSections()).map(([key, section]) => (
            (!searchTerm && key === activeTab) || searchTerm ? (
              <div key={key} className="help-section">
                <h2 className="section-title">
                  <span className="section-icon">{section.icon}</span>
                  {section.title}
                </h2>
                
                <div className="faq-list">
                  {section.content.map((item, index) => (
                    <div key={index} className="faq-item">
                      <h3 className="faq-question">
                        <span className="question-icon">Q</span>
                        {item.question}
                      </h3>
                      <div className="faq-answer">
                        <span className="answer-icon">A</span>
                        <p>{item.answer.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < item.answer.split('\n').length - 1 && <br />}
                          </span>
                        ))}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          ))}

          {searchTerm && Object.keys(filteredSections()).length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <h3>Nenhum resultado encontrado</h3>
              <p>Tente buscar por outros termos como "tarefa", "coluna", "prazo" ou "cores"</p>
            </div>
          )}
        </div>
      </div>

      <div className="help-footer">
        <div className="help-cta">
          <h3>🚀 Pronto para começar?</h3>
          <p>Agora que você conhece o KanbanFlow Pro, está na hora de colocar em prática!</p>
          <button className="btn-start" onClick={() => navigate('/')}>
            Ir para o Quadro Kanban
          </button>
        </div>

        <div className="help-support">
          <h4>💬 Ainda tem dúvidas?</h4>
          <p>Entre em contato conosco:</p>
          <div className="support-links">
            <a href="mailto:suporte@datavisio.com.br">📧 suporte@datavisio.com.br</a>
            <a href="https://github.com/jucivanfreitas/KanbanFlow-Pro/issues" target="_blank" rel="noopener noreferrer">
              🐙 GitHub Issues
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
