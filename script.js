// Seleciona os elementos do DOM
const inputNovaTarefa = document.querySelector('.entrada-tarefa input');
const botaoAdicionar = document.querySelector('.botao-adicionar');
const caixaDeTarefas = document.querySelector('.caixa-de-tarefas');
const botaoLimpar = document.querySelector('.botao-limpar');
const filtros = document.querySelectorAll('.filtros span');
const modal = document.getElementById('editar-tarefa-modal');
const nomeTarefaInput = document.getElementById('tarefa-nome');
const nomeTarefaInputEditar = document.getElementById('tarefa-nome-editar');
const statusTarefaSelect = document.getElementById('tarefa-status');
const statusTarefaSelectEditar = document.getElementById('tarefa-status-editar');
const botaoExcluirModal = document.getElementById('excluir-tarefa');
const botaoSalvar = document.getElementById('salvar-alteracoes');
const botaoFecharModal = document.querySelector('.close');
const editarButtons = document.querySelectorAll('.botao-editar');

let tarefas = [];
let tarefaAtual = null;

// Função para adicionar uma nova tarefa
const adicionarTarefa = () => {
  const nomeTarefa = inputNovaTarefa.value.trim();
  if (nomeTarefa) {
    const novaTarefa = {
      id: Date.now(),
      nome: nomeTarefa,
      status: 'a-fazer'
    };
    tarefas.push(novaTarefa);
    renderTarefas();
    inputNovaTarefa.value = '';
  }
};

// Função para renderizar as tarefas
const renderTarefas = (filtro = 'todos') => {
  caixaDeTarefas.innerHTML = '';

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === 'todos') return true;
    if (filtro === 'afazer') return tarefa.status === 'a-fazer';
    if (filtro === 'concluido') return tarefa.status === 'feito';
  });

  tarefasFiltradas.forEach(tarefa => {
    const tarefaElement = document.createElement('div');
    tarefaElement.className = 'tarefas';

    tarefaElement.style.display = 'flex';

    tarefaElement.classList.toggle('dark', document.body.classList.contains('dark'));

    tarefaElement.innerHTML = `
      <span class="nome-tarefa">${tarefa.nome}</span>
      <span class="status-tarefa" id="${tarefa.status}">${tarefa.status.replace('-', ' ').substr(0, 1).toUpperCase() + tarefa.status.replace('-', ' ').substr(1)}</span>
      <div class="acoes">
        <button class="botao-editar"><i class="fa-solid fa-pen"></i></button>
        <button class="botao-excluir"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    caixaDeTarefas.appendChild(tarefaElement);

    const botaoEditar = tarefaElement.querySelector('.botao-editar');
    const botaoExcluir = tarefaElement.querySelector('.botao-excluir');

    botaoEditar.addEventListener('click', () => abrirModalEditar(tarefa));
    botaoExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
  });
};

// Função para abrir o modal de edição
const abrirModalEditar = (tarefas) => {
  tarefaAtual = tarefas;
  nomeTarefaInputEditar.value = tarefas.nome;
  statusTarefaSelectEditar.value = tarefas.status;
  modal.style.display = 'block';
};

const fecharModal = () => {
  modal.style.display = 'none';
  tarefaAtual = null;
};


editarButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const taskData = {
      nome: button.parentNode.querySelector('.nome-tarefa-editar').textContent,
      status: button.parentNode.querySelector('.status-tarefa-editar').id
    };
    abrirModalEditar(taskData);
  });
});

// Função para salvar as alterações da tarefa
const salvarAlteracoes = () => {
  event.preventDefault();
  if (tarefaAtual) {
    tarefaAtual.nome = nomeTarefaInputEditar.value;
    tarefaAtual.status = statusTarefaSelectEditar.value;
    renderTarefas();
    fecharModal();
  }
};

// Função para excluir uma tarefa
const excluirTarefa = (id) => {
  event.preventDefault();
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  renderTarefas();
};

// Função para limpar todas as tarefas
const limparTarefas = (id) => {
  tarefas = [];
  renderTarefas();
};

// Função para filtrar as tarefas
const filtrarTarefas = (event) => {
  filtros.forEach(filtro => filtro.classList.remove('ativo'));
  event.target.classList.add('ativo');
  renderTarefas(event.target.id);
};

// Event listeners
botaoAdicionar.addEventListener('click', adicionarTarefa);
botaoLimpar.addEventListener('click', limparTarefas);
filtros.forEach(filtro => filtro.addEventListener('click', filtrarTarefas));
botaoSalvar.addEventListener('click', salvarAlteracoes);
botaoExcluirModal.addEventListener('click', () => {
  excluirTarefa(tarefaAtual.id);
  fecharModal();
});
botaoFecharModal.addEventListener('click', fecharModal);
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

// Fechar modal ao clicar no botão "Salvar Alterações" ou "Excluir Tarefa"
document.querySelector('.close').addEventListener('click', fecharModal);
