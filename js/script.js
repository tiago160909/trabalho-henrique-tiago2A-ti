// Arquivo: js/script.js
// Objetivo: implementar Create + Read para lista de tarefas

// --- Estado da aplicação ---
const tarefas = []; // array para armazenar tarefas (obrigatório)

// --- Seletores do DOM ---
const form = document.querySelector('#form-tarefa');
const inputTarefa = document.querySelector('#input-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
const mensagemErro = document.querySelector('#mensagem-erro');

// --- Validação ---
// Recebe um texto, retorna true se válido, false caso contrário
function validarTarefa(texto) {
  const valor = texto.trim();
  if (valor === '') {
    mensagemErro.textContent = 'A tarefa não pode ficar vazia.'; // mostra erro no DOM
    return false;
  }
  mensagemErro.textContent = ''; // limpa mensagem de erro quando válido
  return true;
}

// --- Renderização ---
// Atualiza a interface com as tarefas atuais
function renderTarefas() {
  // Limpa a lista antes de renderizar
  listaTarefas.innerHTML = '';

  // Percorre o array e cria <li> para cada tarefa
  tarefas.forEach(function (tarefa, index) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'texto';
    span.textContent = tarefa;

    // Para futura evolução: poderia adicionar botões de editar/excluir aqui
    // const acoes = document.createElement('div');
    // acoes.innerHTML = '<button>Editar</button><button>Excluir</button>';

    li.appendChild(span);
    // li.appendChild(acoes);

    listaTarefas.appendChild(li);
  });
}

// --- Handlers ---
// Handler do submit do formulário
form.addEventListener('submit', function (event) {
  event.preventDefault(); // evita o reload da página

  const texto = inputTarefa.value;

  // Valida antes de adicionar
  if (!validarTarefa(texto)) {
    return; // não adiciona se inválido
  }

  // Adiciona no array (estado)
  tarefas.push(texto.trim());

  // Atualiza a interface
  renderTarefas();

  // Limpa o input para nova entrada
  inputTarefa.value = '';
  inputTarefa.focus();
});

// Render inicial (caso já haja tarefas no array)
renderTarefas();
