const tarefas = []

const form = document.querySelector('#form-tarefa')
const inputTarefa = document.querySelector('#input-tarefa')
const listaTarefas = document.querySelector('#lista-tarefas')
const mensagemErro = document.querySelector('#mensagem-erro')

function validarTarefa(texto) {
  const valor = texto.trim()
  if (valor === '') {
    mensagemErro.textContent = 'A tarefa não pode ficar vazia.'
    return false
  }
  mensagemErro.textContent = ''
  return true
}

function renderTarefas() {
  listaTarefas.innerHTML = ''
  tarefas.forEach(function (tarefaObj, index) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.className = 'texto'
    span.textContent = tarefaObj.text
    if (tarefaObj.done) {
      li.classList.add('concluida')
    }
    const acoes = document.createElement('div')
    acoes.className = 'acoes'
    const btnConcluir = document.createElement('button')
    btnConcluir.className = 'btn-concluir'
    btnConcluir.type = 'button'
    btnConcluir.textContent = tarefaObj.done ? 'Desfazer' : 'Concluir'
    btnConcluir.setAttribute('aria-label', `Concluir tarefa: ${tarefaObj.text}`)
    btnConcluir.addEventListener('click', function () {
      tarefas[index].done = !tarefas[index].done
      renderTarefas()
    })
    const btnRemover = document.createElement('button')
    btnRemover.className = 'btn-remover'
    btnRemover.type = 'button'
    btnRemover.textContent = 'Remover'
    btnRemover.setAttribute('aria-label', `Remover tarefa: ${tarefaObj.text}`)
    btnRemover.addEventListener('click', function () {
      tarefas.splice(index, 1)
      renderTarefas()
    })
    acoes.appendChild(btnConcluir)
    acoes.appendChild(btnRemover)
    li.appendChild(span)
    li.appendChild(acoes)
    listaTarefas.appendChild(li)
  })
  updateProgresso()
}

function updateProgresso() {
  const total = tarefas.length
  const concluidas = tarefas.filter(t => t.done).length
  const texto = document.getElementById('texto-progresso')
  const barra = document.getElementById('barra-progresso-fill')
  const progresso = total === 0 ? 0 : Math.round((concluidas / total) * 100)
  texto.textContent = `${concluidas} de ${total} tarefas concluídas`
  barra.style.width = `${progresso}%`
  const barraContainer = document.querySelector('.barra-progresso')
  if (barraContainer) {
    barraContainer.setAttribute('aria-valuenow', String(progresso))
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const texto = inputTarefa.value
  if (!validarTarefa(texto)) {
    return
  }
  tarefas.push({ text: texto.trim(), done: false })
  renderTarefas()
  inputTarefa.value = ''
  inputTarefa.focus()
})

renderTarefas()
