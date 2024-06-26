

document.addEventListener('DOMContentLoaded', () => {
    const trilho = document.getElementById('trilho');
    const body = document.body;
    const html = document.documentElement;
  
    // Função para alternar o modo escuro
    const toggleDarkMode = () => {
      body.classList.toggle('dark');
      html.classList.toggle('dark');
  
      // Alternar classes de modo escuro nos elementos necessários
      document.querySelectorAll('button, .bloco-principal, .modo-escuro-claro, .entrada-tarefa input, .botao-adicionar, .botao-excluir, .botao-excluir, .filtros, span, .caixa-de-tarefas, .tarefas, .nome-tarefa, .controles, .botao-limpar, .conteudo-modal, h2, #tarefa-nome, #tarefa-status-editar, #tarefa-status, input').forEach(el => {
        el.classList.toggle('dark');
      });

      trilho.classList.toggle('dark');
    };
  
    // Event listener para alternar o modo escuro
    trilho.addEventListener('click', toggleDarkMode);
});


// let body = document.querySelector('body');
// let html = document.querySelector('html');
// let header = document.querySelector('header');
// let trilho = document.getElementById('trilho');
// let indicador = document.querySelector('.indicador');
// let blocoPrincipal = document.querySelector('.bloco-principal');
// let botaoAdicionar = document.querySelector('.botao-adicionar');
// let taskInput = document.querySelector('.entrada-tarefa');
// let controles = document.querySelector('.controles');
// let botaoLimpar = document.querySelector('.botao-limpar');
// let filtros = document.querySelector('.filtros');
// let caixaTarefas = document.querySelector('.caixa-de-tarefas');
// let span = document.querySelector('span');
// let h1 = document.querySelector('h1');
// let input = document.querySelector('input');

// trilho.addEventListener('click', ()=>{
//     body.classList.toggle('dark');
//     html.classList.toggle('dark');
//     header.classList.toggle('dark');
//     trilho.classList.toggle('dark');
//     indicador.classList.toggle('dark');
//     blocoPrincipal.classList.toggle('dark');
//     h1.classList.toggle('dark');
//     botaoAdicionar.classList.toggle('dark');
//     taskInput.classList.toggle('dark');
//     controles.classList.toggle('dark');
//     input.classList.toggle('dark');
//     filtros.classList.toggle('dark');
//     span.classList.toggle('dark');
//     botaoLimpar.classList.toggle('dark');
//     caixaTarefas.classList.toggle('dark');
// })